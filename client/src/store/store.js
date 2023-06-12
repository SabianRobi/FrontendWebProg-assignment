import { configureStore } from "@reduxjs/toolkit";
import { surveyReducer } from "./SurveySlice";
import { SurveyApiSlice } from "./SurveyApiSlice";

export const store = configureStore({
  reducer: {
    survey: surveyReducer,
    [SurveyApiSlice.reducerPath]: SurveyApiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(SurveyApiSlice.middleware),
});
