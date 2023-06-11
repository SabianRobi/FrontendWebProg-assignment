import { Link } from "react-router-dom";

export function Profile() {
  return (
    <div>
      <h1>Profile</h1>

      <table className="mx-auto mb-4">
        <tr>
          <td className="text-left">Full name</td>
          <td>MyFavouriteUser</td>
        </tr>
        <tr>
          <td className="text-left">Email</td>
          <td>favUser@surveys.com</td>
        </tr>
        <tr>
          <td className="text-left">Number of surveys</td>
          <td>420</td>
        </tr>
      </table>

      <div className="flex flex-row justify-center">
        <Link
          className="bg-red-800 hover:bg-red-600 hover:text-white rounded p-2 m-2"
          to="/logout"
        >
          Logout
        </Link>
      </div>
    </div>
  );
}
