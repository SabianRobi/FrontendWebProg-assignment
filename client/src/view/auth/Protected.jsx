import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../store/SurveySlice";

// eslint-disable-next-line react/prop-types
const Protected = ({ only, children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // Filter user
  if (only === "guest") {
    return isLoggedIn ? <Navigate to="/" replace /> : children;
  } else if (only === "user") {
    return isLoggedIn ? children : <Navigate to="/" replace />;
  }
};
export default Protected;
