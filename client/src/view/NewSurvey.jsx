import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateSurveyMutation } from "../store/SurveyApiSlice";

export function NewSurvey() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [doCreateSurvey] = useCreateSurveyMutation();
  const { register, handleSubmit } = useForm();

  const handleCreate = async (data) => {
    setErrorMessage("");
    setSuccessMessage("");
    let survey = { name: "", content: [] }; // The final object

    // Count and check pages
    const pages = data["newSurvey"].split("\n\n");
    // console.log("pages", pages);

    if (pages.length <= 1) {
      setErrorMessage("At least one page is required!");
      console.error("At least one page is required!");
      return;
    }
    survey["name"] = pages[0];

    // Validate pages and questions
    for (let i = 1; i < pages.length; i++) {
      const page = pages[i];
      let qArr = [];

      let questions = page.split("\n");
      // console.log("questions", questions);
      if (questions.length < 2) {
        setErrorMessage("At least one question per page is required!");
        console.error("At least one question per page is required!");
        return;
      }

      questions.slice(1).forEach((question) => {
        // console.log("question", question);
        if (question.trim().length === 0) {
          setErrorMessage("A question can not be empty!");
          console.error("A question can not be empty!");
          return;
        }
        qArr.push(question);
      });

      survey.content.push({
        title: questions[0],
        questions: qArr,
      });
    }

    if (errorMessage !== "") return;

    survey = { ...survey, content: JSON.stringify(survey.content) };

    const response = await doCreateSurvey(survey);

    if (response["error"]) {
      setErrorMessage(response["error"]["data"]["message"]);
      console.error("Error:", response["error"]["data"]["message"]);
    } else {
      console.info("Success");
      setSuccessMessage("Successfully created survey!");
    }
  };

  return (
    <div>
      <h1>Create new survey</h1>
      <form
        id="newSurveyForm"
        onSubmit={handleSubmit((data) => {
          handleCreate(data);
        })}>
        <label
          htmlFor="newSurvey"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white sr-only">
          Create new Survey
        </label>

        {/* Feedback */}
        {errorMessage && (
          <p className="mt-2 text-sm text-red-500 font-medium text-end">
            {errorMessage}!
          </p>
        )}
        {successMessage && (
          <p className="mt-2 text-sm text-green-500 font-medium text-end">
            {successMessage}!
          </p>
        )}

        {/* Textarea */}
        <label htmlFor="newSurvey" className="sr-only">
          Survey code
        </label>
        <textarea
          id="newSurvey"
          name="newSurvey"
          {...register("newSurvey", { required: true })}
          rows="12"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Type your questions here..."
          required></textarea>

        {/* Create button */}
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-green-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
