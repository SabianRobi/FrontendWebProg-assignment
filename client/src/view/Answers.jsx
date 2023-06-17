import { useSelector } from "react-redux";
import { selectSurveyId } from "../store/SurveySlice";
import { useGetSurveyAnswersQuery } from "../store/SurveyApiSlice";
import { Navigate } from "react-router-dom";

export const Answers = () => {
  const surveyId = useSelector(selectSurveyId);
  if (surveyId === null) {
    return <Navigate to="/my-surveys" replace />;
  }
  const { data: answersData, isLoading } = useGetSurveyAnswersQuery(surveyId);
  const answers = [];
  let noAnswers = false;
  const questions = [];

  if (!isLoading) {
    // Checking if there is any answers
    if (answersData.data.length == 0) {
      noAnswers = true;
    } else {
      // Build the answer array which will look like this:
      // [[q1 answers], [q2 answers], ...]
      const questionCount = JSON.parse(answersData.data[0].content).reduce(
        (acc, page) => acc + page.length,
        0
      );
      for (let i = 0; i < questionCount; i++) {
        answers[i] = [];
      }

      let questionCounter = 0;
      answersData.data.map((answer) => {
        questionCounter = 0;
        JSON.parse(answer.content).map((page) => {
          page.map((question) => {
            answers[questionCounter++].push(question);
          });
        });
      });

      // Getting the questions: questions = [q1, q2, q3, ...]
      JSON.parse(answersData.data[0].survey.content).map((page) => {
        page.questions.map((question) => {
          questions.push(question);
        });
      });
    }
  }

  return (
    <>
      {isLoading ? (
        <p>Loading answers...</p>
      ) : noAnswers ? (
        <h2 className="text-center m-10">There are no answers yet</h2>
      ) : (
        <div>
          <h1>Answers</h1>

          <h2>{answersData.data[0].survey.name}</h2>

          <ol className="answers">
            {answers.map((answers, index) => {
              return (
                <li key={index}>
                  <h3>{questions[index]}</h3>
                  <ul>
                    {answers.map((answer, aIndex) => {
                      return (
                        <li key={index + "." + aIndex}>
                          <p>{answer}</p>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </>
  );
};
