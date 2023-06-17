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

  // Handle deleting
  const handleDelete = async (id) => {
    // Sending request to DB
    await doDeleteSurvey(id);
    surveys = await doRefreshSurveys(user.id);

    // Giving feedback
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

  // Copying link to clipboatd
  const handleCopyToClipboard = (hash) => {
    // Copying to clipboard and giving feedback
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

  // Handle editing
  const handleEdit = (survey) => {
    // Sending request to DB
    dispatch(setEditedSurvey(survey));

    // Redirecting user
    console.log("Redirecting...");
    navigate(`/new-survey`, { replace: true });
  };

  // Handle answer checking
  const handleSeeAnswers = (id) => {
    // Sending request to DB
    dispatch(setSurveyId(id));

    // Redirecting user
    console.log("Redirecting to answers...");
    navigate(`/answers`, { replace: true });
  };

  const handleFillSurvey = (hash) => {
    // Redirecting user
    navigate(`/survey/${hash}`, { replace: true });
  };

  return (
    <div>
      <h1>My surveys</h1>
      {/* Feedback */}
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
        // Table of surveys
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
                  {/* Survey name */}
                  <td
                    className="hover:cursor-pointer"
                    title="Fill survey"
                    onClick={() => handleFillSurvey(survey.hash)}>
                    {survey.name}
                  </td>

                  {/* Created at */}
                  <td>
                    {new Date(survey.createdAt)
                      .toISOString()
                      .split("T")
                      .join(" ")
                      .substring(0, 19)}
                  </td>

                  {/* Actions */}
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
