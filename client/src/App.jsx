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
import { Provider } from "react-redux";
import { store } from "./store/store";
import React from "react";
import Protected from "./view/auth/Protected";

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
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
              <Route path="/survey" element={<Survey />} />
              {/* Edit to: survey/hash */}

              <Route
                path="/new-survey"
                element={
                  <Protected only={"user"}>
                    <NewSurvey />
                  </Protected>
                }
              />
              <Route
                path="/my-surveys"
                element={
                  <Protected only={"user"}>
                    <MySurveys />
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
      </Provider>
    </React.StrictMode>
  );
}

export default App;
