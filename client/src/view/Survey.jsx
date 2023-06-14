import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Navigate, useParams } from "react-router-dom";
import { useGetSurveyByHashQuery } from "../store/SurveyApiSlice";

export function Survey() {
  const { hash } = useParams();

  let { data: surveyData, isLoading } = useGetSurveyByHashQuery(hash);
  if (hash === undefined) {
    return <Navigate to="/" replace />;
  }

  if (!isLoading && surveyData.total === 0) {
    return <Navigate to="/" replace />;
  }

  if (!isLoading && surveyData.total > 0) {
    console.log(JSON.parse(surveyData.data[0].content));
  }

  return isLoading ? (
    <h2 className="text-center">Survey loading...</h2>
  ) : (
    <>
      {/* Survey title */}
      <h1>{surveyData.data[0].name}</h1>

      {/* Pages */}
      {!isLoading
        ? JSON.parse(surveyData.data[0].content).map((page, pIndex) => {
            return (
              <>
                {/* Page title */}
                <h3 key={pIndex}>{page.title}</h3>

                {/* Questions */}
                {page.questions.map((question, qIndex) => {
                  return (
                    <div
                      className="mb-6 mt-2"
                      key={"question-" + pIndex + "." + qIndex}>
                      <label
                        htmlFor={"answer-" + pIndex + "." + qIndex}
                        className="block mb-2 text-sm text-gray-900 dark:text-white">
                        {question}
                      </label>
                      <input
                        type="text"
                        id={"answer-" + pIndex + "." + qIndex}
                        placeholder="Type your answer here"
                        className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  );
                })}
              </>
            );
          })
        : ""}

      {/* Pagination */}
      <nav className="flex flex-row justify-center">
        <ul className="inline-flex -space-x-px">
          <li key={"prev"}>
            <a
              href="#"
              className="px-3 py-2 ml-0 leading-tight border rounded-l-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">
              <span className="sr-only">Previous</span>
              <FontAwesomeIcon
                icon={faChevronLeft}
                style={{ color: "#9CA3AF" }}
              />
            </a>
          </li>

          {JSON.parse(surveyData.data[0].content).map((_, pIndex) => {
            return (
              <li key={"paginator." + (pIndex + 1)}>
                <a
                  href="#"
                  className=" px-3 py-2 leading-tight border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">
                  {pIndex + 1}
                </a>
              </li>
            );
          })}

          <li key={"next"}>
            <a
              href="#"
              className="px-3 py-2 ml-0 leading-tight border rounded-r-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">
              <span className="sr-only">Next</span>
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{ color: "#9CA3AF" }}
              />
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
