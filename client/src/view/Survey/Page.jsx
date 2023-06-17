import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMaxPageWereAt,
  selectMessage,
  selectSurvey,
  selectSurveyPage,
  setMaxPageWereAt,
  setMessage,
  setPage,
} from "../../store/SurveySlice";
import { useForm } from "react-hook-form";
import { useSaveAnswerMutation } from "../../store/SurveyApiSlice";

/* eslint-disable react/prop-types */
export const Page = () => {
  const dispatch = useDispatch();
  const survey = useSelector(selectSurvey);
  const page = useSelector(selectSurveyPage);
  const [doSaveAnswers] = useSaveAnswerMutation();
  const maxPageWereAt = useSelector(selectMaxPageWereAt);
  const message = useSelector(selectMessage);

  const { register, handleSubmit, getValues, reset } = useForm();

  // Handle survey submitting
  const onSubmit = async (data) => {
    // Counting total question count
    const totalQuestions = survey.data.pages.reduce(
      (acc, value) => value.questions.length + acc,
      0
    );

    // Counting given answer count
    let totalAnswers = 0;
    getValues().answers.map((page) => {
      page.map((question) => {
        if (question.trim() !== "") totalAnswers++;
      });
    });

    if (totalAnswers !== totalQuestions) {
      // Giving feedback if neccessary
      dispatch(
        setMessage({
          text: "Filling every field is required!",
          type: "error",
        })
      );
      setTimeout(() => {
        dispatch(setMessage(false));
      }, 2500);
      return;
    }

    // Sending data to DB
    console.log("Saving answers...");
    const answerData = Object.values(data)[0];
    const resp = await doSaveAnswers({
      surveyId: survey.data.id,
      content: JSON.stringify(answerData),
    });

    // Giving feedback
    if (resp["error"]) {
      dispatch(
        setMessage({
          text: resp["error"]["data"]["message"],
          type: "error",
        })
      );
      console.error("Error:", resp["error"]["data"]["message"]);
    } else {
      dispatch(
        setMessage({
          text: "Answers successfully saved!",
          type: "success",
        })
      );
      console.info("Answers successfully saved!");

      // Reseting form
      reset();
    }
    setTimeout(() => {
      dispatch(setMessage(false));
    }, 2500);
  };

  // Handle paginating
  const handlePaginate = (pageNumber) => {
    if (pageNumber <= page) {
      // Go to prev page
      dispatch(setPage(pageNumber));
    } else if (pageNumber > page) {
      // Validate fileds & go to next page
      let valid = true;
      getValues().answers[page - 1].map((question) => {
        if (question.trim() === "") valid = false;
      });
      if (valid) {
        dispatch(setMaxPageWereAt(page + 1));
        dispatch(setPage(pageNumber));
      } else {
        dispatch(
          setMessage({
            text: "Filling every field is required!",
            type: "error",
          })
        );

        setTimeout(() => {
          dispatch(setMessage(false));
        }, 2500);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Survey title */}
      <h1>{survey.data.name}</h1>

      {/* Page title */}
      <h3>{survey.data.pages[page - 1].title}</h3>

      {/* Feedback */}
      {message ? (
        message.type === "success" ? (
          <p className="mt-2 text-sm font-medium text-end text-green-500">
            {message.text}!
          </p>
        ) : (
          <p className="mt-2 text-sm font-medium text-end text-red-500">
            {message.text}!
          </p>
        )
      ) : (
        <></>
      )}

      {/* Questions */}
      {survey.data.pages[page - 1].questions.map((question, qIndex) => {
        return (
          <div className="mb-6 mt-2" key={"q-" + (page - 1) + "-" + qIndex}>
            <label
              htmlFor={"answers." + (page - 1) + "." + qIndex}
              className="block mb-2 text-sm text-gray-900 dark:text-white">
              {question}
            </label>
            <input
              {...register("answers." + (page - 1) + "." + qIndex, {
                required: true,
              })}
              type="text"
              placeholder="Type your answers here"
              className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        );
      })}

      {/* Pagination */}
      <nav className="flex flex-row justify-between">
        <span></span>
        <ul className="inline-flex -space-x-px">
          {/* Previous page */}
          <li key={"prev"}>
            <span
              onClick={
                page - 1 === 0
                  ? () => {}
                  : () => {
                      handlePaginate(page - 1);
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

          {/* Pages */}
          {survey.data.pages.map((pageContent, pIndex) => {
            return (
              <li key={"paginator." + (pIndex + 1)}>
                <span
                  onClick={() => {
                    handlePaginate(pIndex + 1);
                  }}
                  href="#"
                  className={
                    pIndex + 1 < maxPageWereAt
                      ? "hover:cursor-pointer px-3 py-2 leading-tight border bg-green-900 border-green-800 text-gray-300 hover:bg-green-700 hover:text-white"
                      : pIndex + 1 === page
                      ? "hover:cursor-pointer px-3 py-2 leading-tight border bg-gray-600 border-gray-700 text-white"
                      : "hover:cursor-pointer px-3 py-2 leading-tight border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
                  }>
                  {pageContent.title}
                </span>
              </li>
            );
          })}

          {/* Next page */}
          <li key={"next"}>
            <span
              onClick={
                page === survey.data.pages.length
                  ? () => {}
                  : () => {
                      handlePaginate(page + 1);
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

        {/* Submit survey button */}
        <button
          type="submit"
          className="bg-green-800 hover:bg-green-600 hover:text-white rounded p-2 m-2">
          Send
        </button>
      </nav>
    </form>
  );
};
