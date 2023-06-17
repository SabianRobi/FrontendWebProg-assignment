import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsLoggedIn } from "../store/SurveySlice";

export function Menubar() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleLogut = () => {
    dispatch(logout());
  };

  return (
    <>
      <nav className="flex flex-row justify-center">
        <Link
          className="text-gray-100 hover:text-white hover:bg-gray-600 rounded p-2 m-1 font-bold text-2xl"
          to="/">
          Surveys
        </Link>
        {isLoggedIn ? (
          <>
            <Link
              className="bg-blue-800 hover:bg-blue-600 hover:text-white rounded p-2 m-2"
              to="/new-survey"
              title="Create new survey">
              New survey
            </Link>
            <Link
              className="bg-blue-800 hover:bg-blue-600 hover:text-white rounded p-2 m-2"
              to="/my-surveys"
              title="Show your surveys">
              My surveys
            </Link>
            {/* <Link
              className="bg-blue-800 hover:bg-blue-600 hover:text-white rounded p-2 m-2"
              to="/answers">
              Answers
            </Link> */}
            <Link
              className="bg-blue-800 hover:bg-blue-600 hover:text-white rounded p-2 m-2"
              to="/profile"
              title="Show profile info">
              Profile
            </Link>
            <div
              className="bg-red-800 hover:bg-red-600 hover:text-white rounded p-2 m-2 hover:cursor-pointer"
              to="/logout"
              title="Log out"
              onClick={handleLogut}>
              Logout
            </div>
          </>
        ) : (
          <>
            <Link
              className="bg-blue-800 hover:bg-blue-600 hover:text-white rounded p-2 m-2"
              to="/login">
              Login
            </Link>
            <Link
              className="bg-blue-800 hover:bg-blue-600 hover:text-white rounded p-2 m-2"
              to="/register">
              Register
            </Link>
          </>
        )}
      </nav>
      <hr />
    </>
  );
}
