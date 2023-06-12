import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // user: {
  //   fullname: "Teste elek",
  //   email: 'a.b@c.d'
  // },
  accessToken: null,
  user: null,
  // [
  //   {
  //     id: 10,
  //     name: "new survey",
  //     content: "valami",
  //     hash: "8b5ffa1b-6278-463a-94ad-5abc2f3055a4",
  //     createdAt: 1686510587120,
  //   },
  // ],
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
    //Other
  },
});

// Actions
export const { setCredentials, setSurveys, logout } = surveySlice.actions;

// Selectors
export const selectUser = (state) => state.survey.user;
export const selectAccessToken = (state) => state;
export const selectIsLoggedIn = (state) => {
  // console.log(state);
  const user = state.survey.user;
  return user !== null;
};

export const { reducer: surveyReducer } = surveySlice;
