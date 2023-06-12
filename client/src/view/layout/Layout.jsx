import { Outlet } from "react-router-dom";
import { Menubar } from "../Menubar";
import "./Layout.css";

// eslint-disable-next-line react/prop-types
export function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <div className="max-800 mx-auto bg-gray-800 h-full min-h-screen p-2 w-full">
        <Menubar />
        <div className="flex-1">{<Outlet />}</div>
      </div>
    </div>
  );
}

export default Layout;
