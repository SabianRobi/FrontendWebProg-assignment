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
        headers.set("authorization", `Bearer ${token}`);
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

    // Get surveys created by user
    getUserSurveys: builder.query({
      query: (userId) => `surveys?userId=${userId}`,
      transformResponse: (data) => {
        return data;
      },
    }),

    // Register
    register: builder.mutation({
      query: (body) => ({
        url: `users`,
        method: "POST",
        body: body,
      }),
    }),

    // Create survey
    createSurvey: builder.mutation({
      query: (body) => ({
        url: `surveys`,
        method: "POST",
        body: body,
      }),
    }),

    // Delete survey
    deleteSurvey: builder.mutation({
      query: (surveyId) => ({
        url: `surveys/${surveyId}`,
        method: "DELETE",
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
} = SurveyApiSlice;
