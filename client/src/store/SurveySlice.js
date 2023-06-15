import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  user: null,
  survey: {
    isFilling: false,
    currentPage: null,
    data: null,
  },
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
      state.user = null;
      state.accessToken = null;
    },

    // Survey filling
    setSurvey: (state, { payload }) => {
      state.survey.isFilling = true;
      state.survey.currentPage = 1;
      state.survey.data = payload;
    },
    setPage: (state, { payload: page }) => {
      state.survey.currentPage = page;
    },
    setNextPage: (state) => {
      state.survey.currentPage = state.survey.currentPage + 1;
    },
    setPrevPage: (state) => {
      state.survey.currentPage--;
    },
  },
});

// Actions
export const {
  setCredentials,
  logout,
  setSurvey,
  setPage,
  setNextPage,
  setPrevPage,
} = surveySlice.actions;

// Selectors
export const selectUser = (state) => state.survey.user;
export const selectIsLoggedIn = (state) => {
  const user = state.survey.user;
  return user !== null;
};
export const selectSurvey = (state) => state.survey.survey;
export const selectSurveyPage = (state) => state.survey.survey.currentPage;

export const { reducer: surveyReducer } = surveySlice;
