import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./view/layout/Layout";
import { Home } from "./view/Home";
import { Login } from "./view/auth/Login";
import { Register } from "./view/auth/Register";
import { NewSurvey } from "./view/NewSurvey.jsx";
import { MySurveys } from "./view/MySurveys.jsx";
import { Answers } from "./view/Answers.jsx";
import { Profile } from "./view/Profile.jsx";
import { Survey } from "./view/Survey";
// import { useState } from "react";

function App() {
  // const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/new-survey" element={<NewSurvey />} />
          <Route path="/my-surveys" element={<MySurveys />} />
          <Route path="/answers" element={<Answers />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/survey" element={<Survey />} />
          {/* Edit to: survey/<hash> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
