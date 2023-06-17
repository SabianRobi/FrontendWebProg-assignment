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
import { useDispatch, useSelector } from "react-redux";
import {
  selectMessage,
  selectUser,
  setEditedSurvey,
  setMessage,
  setSurveyId,
} from "../store/SurveySlice";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export function MySurveys() {
  const message = useSelector(selectMessage);
  const [doRefreshSurveys] = useLazyGetUserSurveysQuery();
  const [doDeleteSurvey] = useDeleteSurveyMutation();
  const user = useSelector(selectUser);
  let { data: surveys, isLoading } = useGetUserSurveysQuery(user.id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    await doDeleteSurvey(id);
    surveys = await doRefreshSurveys(user.id);

    dispatch(
      setMessage({
        type: "success",
        text: "Successfully deleted survey!",
      })
    );
    setTimeout(() => {
      dispatch(setMessage(false));
    }, 2500);
  };

  const handleCopyToClipboard = (hash) => {
    navigator.clipboard.writeText(location.origin + "/survey/" + hash).then(
      () => {
        console.log("Successfully copied to clipboard");
        dispatch(
          setMessage({
            type: "success",
            text: "Successfully copied to clipboard!",
          })
        );
      },
      () => {
        console.error("Failed to copy to clipboard!");
        dispatch(
          setMessage({ type: "error", text: "Failed to copy to clipboard!" })
        );
      }
    );
    setTimeout(() => {
      dispatch(setMessage(false));
    }, 2500);
  };

  const handleEdit = (survey) => {
    dispatch(setEditedSurvey(survey));

    console.log("Redirecting...");
    navigate(`/new-survey`, { replace: true });
  };

  const handleSeeAnswers = (id) => {
    dispatch(setSurveyId(id));

    console.log("Redirecting to answers...");
    navigate(`/answers`, { replace: true });
  };

  const handleFillSurvey = (hash) => {
    navigate(`/survey/${hash}`, { replace: true });
  };

  return (
    <div>
      <h1>My surveys</h1>
      {message ? (
        message.type === "success" ? (
          <p className="mt-2 text-sm font-medium text-end text-green-500">
            {message.text}!
          </p>
        ) : (
          <p className="mt-2 text-sm font-medium text-end text-red-500">
            {message.text}!
          </p>
        )
      ) : (
        <></>
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
                  <td
                    className="hover:cursor-pointer"
                    title="Fill survey"
                    onClick={() => handleFillSurvey(survey.hash)}>
                    {survey.name}
                  </td>
                  <td>
                    {new Date(survey.createdAt)
                      .toISOString()
                      .split("T")
                      .join(" ")
                      .substring(0, 19)}
                  </td>
                  <td className="flex flex-row justify-end">
                    <FontAwesomeIcon
                      icon={faComment}
                      style={{ color: "#ffffff" }}
                      className="p-1 m-1 hover:cursor-pointer"
                      onClick={() => handleSeeAnswers(survey.id)}
                      title="Check answers"
                    />
                    <FontAwesomeIcon
                      icon={faLink}
                      style={{ color: "#2ab5d1" }}
                      className="p-1 m-1 hover:cursor-pointer"
                      onClick={() => handleCopyToClipboard(survey.hash)}
                      title="Copy link to clipboard"
                    />
                    <FontAwesomeIcon
                      icon={faPencil}
                      style={{ color: "#f5aa3b" }}
                      className="p-1 m-1 hover:cursor-pointer"
                      onClick={() => handleEdit(survey)}
                      title="Edit survey"
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ color: "#bd0000" }}
                      className="p-1 m-1 hover:cursor-pointer"
                      onClick={() => handleDelete(survey.id)}
                      title="Delete survey"
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
