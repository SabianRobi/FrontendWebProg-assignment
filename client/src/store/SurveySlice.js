import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  user: null,
  // user: {
  //   fullname: "Teste elek",
  //   email: 'a.b@c.d'
  // },
};

const surveySlice = createSlice({
  name: "surveys",
  initialState,
  reducers: {
    // Auth
    setCredentials: (state, { payload }) => {
      state.user = payload.user;
      state.accessToken = payload.accessToken;
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      state.surveys = null;
    },
  },
});

// Actions
export const { setCredentials, setSurveys, logout } = surveySlice.actions;

// Selectors
export const selectUser = (state) => state.survey.user;
export const selectIsLoggedIn = (state) => {
  const user = state.survey.user;
  return user !== null;
};

export const { reducer: surveyReducer } = surveySlice;
