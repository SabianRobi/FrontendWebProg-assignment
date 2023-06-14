import { Navigate, useParams } from "react-router-dom";
import { useGetSurveyByHashQuery } from "../../store/SurveyApiSlice";
import { Page } from "./Page";
import { useState } from "react";

export function Survey() {
  const { hash } = useParams();
  const [page, setPage] = useState(1);

  let { data: surveyData, isLoading } = useGetSurveyByHashQuery(hash);
  if (hash === undefined) {
    return <Navigate to="/" replace />;
  }

  if (!isLoading && surveyData.total === 0) {
    return <Navigate to="/" replace />;
  }

  return isLoading ? (
    <h2 className="text-center">Survey loading...</h2>
  ) : (
    <Page survey={surveyData.data[0]} page={page} setPage={setPage} />
  );
}
