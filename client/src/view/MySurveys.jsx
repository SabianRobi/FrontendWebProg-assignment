import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLink,
  faComment,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export function MySurveys() {
  return (
    <div>
      <h1>My surveys</h1>
      <table className="w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>My Survey 1</td>
            <td className="flex flex-row justify-end">
              <FontAwesomeIcon icon={faComment} style={{ color: "#ffffff" }} className="p-1 m-1 hover:cursor-pointer" />
              <FontAwesomeIcon icon={faLink} style={{ color: "#2ab5d1" }} className="p-1 m-1 hover:cursor-pointer"  />
              <FontAwesomeIcon icon={faPencil} style={{ color: "#f5aa3b" }} className="p-1 m-1 hover:cursor-pointer"  />
              <FontAwesomeIcon icon={faTrash} style={{ color: "#bd0000" }} className="p-1 m-1 hover:cursor-pointer"  />
            </td>
          </tr>
          <tr>
            <td>My Survey 2</td>
            <td className="flex flex-row justify-end">
              <FontAwesomeIcon icon={faComment} style={{ color: "#ffffff" }} className="p-1 m-1 hover:cursor-pointer" />
              <FontAwesomeIcon icon={faLink} style={{ color: "#2ab5d1" }} className="p-1 m-1 hover:cursor-pointer"  />
              <FontAwesomeIcon icon={faPencil} style={{ color: "#f5aa3b" }} className="p-1 m-1 hover:cursor-pointer"  />
              <FontAwesomeIcon icon={faTrash} style={{ color: "#bd0000" }} className="p-1 m-1 hover:cursor-pointer"  />
            </td>
          </tr>
          <tr>
            <td>My Survey 3</td>
            <td className="flex flex-row justify-end">
              <FontAwesomeIcon icon={faComment} style={{ color: "#ffffff" }} className="p-1 m-1 hover:cursor-pointer" />
              <FontAwesomeIcon icon={faLink} style={{ color: "#2ab5d1" }} className="p-1 m-1 hover:cursor-pointer"  />
              <FontAwesomeIcon icon={faPencil} style={{ color: "#f5aa3b" }} className="p-1 m-1 hover:cursor-pointer"  />
              <FontAwesomeIcon icon={faTrash} style={{ color: "#bd0000" }} className="p-1 m-1 hover:cursor-pointer"  />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
