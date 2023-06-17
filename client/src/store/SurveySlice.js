import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  user: null,
  survey: {
    maxPageWereAt: null, // To handle pagination visibility
    currentPage: null, // To handle answer giving
    data: null, // To handle answer giving
    id: null, // To get the answers
  },
  editedSurvey: false,
  message: false,
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

    // Survey editing
    setEditedSurvey: (state, { payload: survey }) => {
      state.editedSurvey = survey;
    },

    // Survey filling
    setSurvey: (state, { payload: surveyData }) => {
      state.survey.maxPageWereAt = 1;
      state.survey.currentPage = 1;
      state.survey.data = surveyData;
    },
    setPage: (state, { payload: page }) => {
      state.survey.currentPage = page;
    },
    setMaxPageWereAt: (state, { payload: page }) => {
      if (state.survey.maxPageWereAt < page) {
        state.survey.maxPageWereAt = page;
      }
    },

    // Listing answers
    setSurveyId: (state, { payload: id }) => {
      state.survey.id = id;
    },

    // Handling feedback messages
    setMessage: (state, { payload }) => {
      state.message = payload;
    },
  },
});

// Actions
export const {
  setCredentials,
  logout,
  setEditedSurvey,
  setSurvey,
  setPage,
  setMaxPageWereAt,
  setSurveyId,
  setMessage,
} = surveySlice.actions;

// Selectors
export const selectUser = (state) => state.survey.user;
export const selectIsLoggedIn = (state) => {
  const user = state.survey.user;
  return user !== null;
};
export const selectEditedSurvey = (state) => state.survey.editedSurvey;
export const selectSurvey = (state) => state.survey.survey;
export const selectSurveyPage = (state) => state.survey.survey.currentPage;
export const selectSurveyId = (state) => state.survey.survey.id;
export const selectMaxPageWereAt = (state) => state.survey.survey.maxPageWereAt;
export const selectMessage = (state) => state.survey.message;

export const { reducer: surveyReducer } = surveySlice;
