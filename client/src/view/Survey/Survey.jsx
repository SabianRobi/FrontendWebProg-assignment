import { Navigate, useParams } from "react-router-dom";
import { useGetSurveyByHashQuery } from "../../store/SurveyApiSlice";
import { selectSurvey, setSurvey } from "../../store/SurveySlice";
import { useDispatch, useSelector } from "react-redux";
import { Page } from "./Page";

export function Survey() {
  const { hash } = useParams();
  const surveyData = useSelector(selectSurvey);
  const dispatch = useDispatch();

  let { data: surveyFetchedData, isLoading } = useGetSurveyByHashQuery(hash);
  if (hash === undefined || (!isLoading && surveyFetchedData.total === 0)) {
    return <Navigate to="/" replace />;
  }

  if (!isLoading && !surveyData.isFilling) {
    const survey = {
      ...surveyFetchedData.data[0],
      pages: JSON.parse(surveyFetchedData.data[0].content),
    };
    delete survey.content;

    dispatch(setSurvey(survey)); // TODO Warning-ot dob :(
  }

  return isLoading ? (
    <h2 className="text-center">Survey loading...</h2>
  ) : (
    <Page />
  );
}
