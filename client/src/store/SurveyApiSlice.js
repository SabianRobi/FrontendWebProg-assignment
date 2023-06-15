import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3030/";

export const SurveyApiSlice = createApi({
  reducerPath: "surveyApi",
  keepUnusedDataFor: 1,
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().survey.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    // Login
    login: builder.mutation({
      query: (body) => ({
        url: `authentication`,
        method: "POST",
        body: body,
      }),
    }),

    // Register
    register: builder.mutation({
      query: (body) => ({
        url: `users`,
        method: "POST",
        body: body,
      }),
    }),

    // Get surveys created by user
    getUserSurveys: builder.query({
      query: (userId) => `surveys?userId=${userId}`,
    }),

    // Get survey by hash
    getSurveyByHash: builder.query({
      query: (hash) => `surveys?hash=${hash}`,
    }),

    // Create survey
    createSurvey: builder.mutation({
      query: (body) => ({
        url: `surveys`,
        method: "POST",
        body: body,
      }),
    }),

    // Modify survey
    modifySurvey: builder.mutation({
      query: ({ survey, id }) => ({
        url: `surveys/${id}`,
        method: "PATCH",
        body: survey,
      }),
    }),

    // Delete survey
    deleteSurvey: builder.mutation({
      query: (surveyId) => ({
        url: `surveys/${surveyId}`,
        method: "DELETE",
      }),
    }),

    // Save answer
    saveAnswer: builder.mutation({
      query: (payload) => ({
        url: `results`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUserSurveysQuery,
  useLazyGetUserSurveysQuery,
  useRegisterMutation,
  useCreateSurveyMutation,
  useDeleteSurveyMutation,
  useModifySurveyMutation,
  useLazyGetSurveyByHashQuery,
  useGetSurveyByHashQuery,
  useSaveAnswerMutation,
} = SurveyApiSlice;
