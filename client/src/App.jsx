import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./view/layout/Layout";
import { Home } from "./view/Home";
import { Login } from "./view/auth/Login";
import { Register } from "./view/auth/Register";
import { NewSurvey } from "./view/NewSurvey.jsx";
import { MySurveys } from "./view/MySurveys.jsx";
import { Answers } from "./view/Answers.jsx";
import { Profile } from "./view/Profile.jsx";
import { Survey } from "./view/Survey";
import Protected from "./view/auth/Protected";
import { useState } from "react";

function App() {
  const [editedSurvey, setEditedSurvey] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <Protected only={"guest"}>
                <Login />
              </Protected>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/survey" element={<Survey />}>
            <Route path=":hash" element={<Survey />} />
          </Route>
          {/* Edit to: survey/hash */}

          <Route
            path="/new-survey"
            element={
              <Protected only={"user"}>
                <NewSurvey
                  editedSurvey={editedSurvey}
                  setEditedSurvey={setEditedSurvey}
                />
              </Protected>
            }
          />
          <Route
            path="/my-surveys"
            element={
              <Protected only={"user"}>
                <MySurveys setEditedSurvey={setEditedSurvey} />
              </Protected>
            }
          />
          <Route
            path="/answers"
            element={
              <Protected only={"user"}>
                <Answers />
              </Protected>
            }
          />
          <Route
            path="/profile"
            element={
              <Protected only={"user"}>
                <Profile />
              </Protected>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
