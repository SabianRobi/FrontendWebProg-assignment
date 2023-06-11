import { Link } from "react-router-dom";

const isLoggedIn = true;

export function Menubar() {
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
              to="/new-survey">
              New survey
            </Link>
            <Link
              className="bg-blue-800 hover:bg-blue-600 hover:text-white rounded p-2 m-2"
              to="/my-surveys">
              My surveys
            </Link>
            <Link
              className="bg-blue-800 hover:bg-blue-600 hover:text-white rounded p-2 m-2"
              to="/answers">
              Answers
            </Link>
            <Link
              className="bg-blue-800 hover:bg-blue-600 hover:text-white rounded p-2 m-2"
              to="/profile">
              Profile
            </Link>
            <Link
              className="bg-red-800 hover:bg-red-600 hover:text-white rounded p-2 m-2"
              to="/logout">
              Logout
            </Link>
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
