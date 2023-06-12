import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectSurveyCount, logout } from "../store/SurveySlice";

export function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const surveyCount = useSelector(selectSurveyCount);

  const handleLogut = () => {
    dispatch(logout());
  };

  return (
    <div>
      <h1>Profile</h1>

      <table className="mx-auto mb-4">
        <tbody>
          <tr>
            <td className="text-left">Full name</td>
            <td>{user.fullname}</td>
          </tr>
          <tr>
            <td className="text-left">Email</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td className="text-left">Number of surveys</td>
            <td>{surveyCount}</td>
          </tr>
        </tbody>
      </table>

      <div className="flex flex-row justify-center">
        <p
          className="bg-red-800 hover:bg-red-600 hover:text-white hover:cursor-pointer rounded p-2 m-2"
          onClick={handleLogut}>
          Logout
        </p>
      </div>
    </div>
  );
}
