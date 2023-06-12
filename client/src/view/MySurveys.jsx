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

export function MySurveys() {
  const [doRefreshSurveys] = useLazyGetUserSurveysQuery();
  const [doDeleteSurvey] = useDeleteSurveyMutation();
  const user = useSelector(selectUser);
  let { data: surveys, isLoading } = useGetUserSurveysQuery(user.id);

  const handleDelete = async (id) => {
    await doDeleteSurvey(id);
    surveys = await doRefreshSurveys(user.id);
  };

  return (
    <div>
      <h1>My surveys</h1>
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
            {surveys.map((survey) => {
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
                    />
                    <FontAwesomeIcon
                      icon={faPencil}
                      style={{ color: "#f5aa3b" }}
                      className="p-1 m-1 hover:cursor-pointer"
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
