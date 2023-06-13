import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLink,
  faComment,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  useDeleteSurveyMutation,
  useGetUserSurveysQuery,
  useLazyGetUserSurveysQuery,
} from "../store/SurveyApiSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../store/SurveySlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export function MySurveys({ setEditedSurvey }) {
  const [message, setMessage] = useState({ success: true, message: "" });
  const [doRefreshSurveys] = useLazyGetUserSurveysQuery();
  const [doDeleteSurvey] = useDeleteSurveyMutation();
  const user = useSelector(selectUser);
  let { data: surveys, isLoading } = useGetUserSurveysQuery(user.id);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    await doDeleteSurvey(id);
    surveys = await doRefreshSurveys(user.id);
  };

  const handleCopyToClipboard = (hash) => {
    navigator.clipboard.writeText(location.origin + "/survey/" + hash).then(
      () => {
        console.log("Successfully copied to clipboard");
        setMessage({
          success: true,
          message: "Successfully copied to clipboard!",
        });
      },
      () => {
        console.error("Failed to copy to clipboard!");
        setMessage({ success: false, message: "Failed to copy to clipboard!" });
      }
    );
    setTimeout(() => {
      setMessage({ success: true, message: "" });
    }, 1500);
  };

  const handleEdit = (survey) => {
    setEditedSurvey(survey);

    console.log("Redirecting...");
    navigate(`/new-survey`, { replace: true });
  };

  return (
    <div>
      <h1>My surveys</h1>
      {message.message === "" ? (
        ""
      ) : message.success ? (
        <p className="text-end text-green-600">{message.message}</p>
      ) : (
        <p className="text-end text-red-600">{message.message}</p>
      )}
      {isLoading ? (
        <p className="text-center">Surveys loading...</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Created at</th>
              <th className="text-end pr-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {surveys.data.map((survey) => {
              return (
                <tr key={survey.id}>
                  <td>{survey.name}</td>
                  <td>
                    {new Date(survey.createdAt)
                      .toISOString()
                      .split("T")
                      .join(" ")}
                  </td>
                  <td className="flex flex-row justify-end">
                    <FontAwesomeIcon
                      icon={faComment}
                      style={{ color: "#ffffff" }}
                      className="p-1 m-1 hover:cursor-pointer"
                    />
                    <FontAwesomeIcon
                      icon={faLink}
                      style={{ color: "#2ab5d1" }}
                      className="p-1 m-1 hover:cursor-pointer"
                      onClick={() => handleCopyToClipboard(survey.hash)}
                    />
                    <FontAwesomeIcon
                      icon={faPencil}
                      style={{ color: "#f5aa3b" }}
                      className="p-1 m-1 hover:cursor-pointer"
                      onClick={() => handleEdit(survey)}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ color: "#bd0000" }}
                      className="p-1 m-1 hover:cursor-pointer"
                      onClick={() => handleDelete(survey.id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
