import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsEverythingFilled,
  selectSurvey,
  selectSurveyPage,
  setNextPage,
  setPage,
  setPrevPage,
} from "../../store/SurveySlice";
import { useForm } from "react-hook-form";
import { useState } from "react";

/* eslint-disable react/prop-types */
export const Page = () => {
  const dispatch = useDispatch();
  const survey = useSelector(selectSurvey);
  const page = useSelector(selectSurveyPage);
  const isEverythingFilled = useSelector(selectIsEverythingFilled);
  const [error, setError] = useState(false);

  const { register, handleSubmit, getValues } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  // const questionCount = survey.data.pages.reduce(
  //   (acc, value) => value.questions.length + acc,
  //   0
  // );

  const handlePaginate = (fn, page) => {
    console.log("Paginating");

    let valid = true;
    // let counter = 0;
    for (const [key, value] of Object.entries(getValues())) {
      if (value.trim() === "") valid = false;
      // else counter++;
    }

    if (valid) {
      // if (counter == questionCount) {
      //   console.log("SURVEY READY, sending...");
      // } else
      if (page) {
        dispatch(fn(page));
      } else {
        dispatch(fn());
      }
    } else {
      setError("Filling every field is required!");
      setTimeout(() => {
        setError(false);
      }, 2500);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Survey title */}
      <h1>{survey.data.name}</h1>

      {/* Page title */}
      <h3>{survey.data.pages[page - 1].title}</h3>

      {error ? <p className="text-red-500 text-end">{error}</p> : ""}

      {/* Questions */}
      {survey.data.pages[page - 1].questions.map((question, qIndex) => {
        return (
          <div className="mb-6 mt-2" key={"question-" + page + "-" + qIndex}>
            <label
              htmlFor={"answer-" + page + "." + (qIndex + 1)}
              className="block mb-2 text-sm text-gray-900 dark:text-white">
              {question}
            </label>
            <input
              {...register("answer-" + page + "-" + (qIndex + 1), {
                required: true,
              })}
              type="text"
              id={"answer-" + page + "-" + (qIndex + 1)}
              placeholder="Type your answer here"
              className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        );
      })}

      {/* Pagination */}
      <nav className="flex flex-row justify-between">
        <span></span>
        <ul className="inline-flex -space-x-px">
          <li key={"prev"}>
            <span
              onClick={
                page - 1 === 0
                  ? () => {}
                  : () => {
                      handlePaginate(setPrevPage, false);
                    }
              }
              href="#"
              className="px-3 py-2 ml-0 leading-tight border rounded-l-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white hover:cursor-pointer">
              <span className="sr-only">Previous</span>
              <FontAwesomeIcon
                icon={faChevronLeft}
                style={{ color: "#9CA3AF" }}
              />
            </span>
          </li>

          {survey.data.pages.map((_, pIndex) => {
            return (
              <li key={"paginator." + (pIndex + 1)}>
                <span
                  onClick={() => {
                    handlePaginate(setPage, pIndex + 1);
                  }}
                  href="#"
                  className={
                    pIndex + 1 === page
                      ? "hover:cursor-pointer px-3 py-2 leading-tight border bg-gray-600 border-gray-700 text-white"
                      : "hover:cursor-pointer px-3 py-2 leading-tight border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
                  }>
                  {pIndex + 1}
                </span>
              </li>
            );
          })}

          <li key={"next"}>
            <span
              onClick={
                page === survey.data.pages.length
                  ? () => {}
                  : () => {
                      handlePaginate(setNextPage, false);
                    }
              }
              className="px-3 py-2 ml-0 leading-tight border rounded-r-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white hover:cursor-pointer">
              <span className="sr-only">Next</span>
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{ color: "#9CA3AF" }}
              />
            </span>
          </li>
        </ul>
        {isEverythingFilled ? (
          <button
            type="submit"
            className="bg-green-800 hover:bg-green-600 hover:text-white rounded p-2 m-2">
            Send
          </button>
        ) : (
          <span></span>
        )}
      </nav>
    </form>
  );
};
