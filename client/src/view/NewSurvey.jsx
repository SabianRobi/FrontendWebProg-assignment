export function NewSurvey() {
  return (
    <div>
      <h1>Create new survey</h1>
      {/* Label */}
      <label
        htmlFor="newSurvey"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white sr-only"
      >
        Create new Survey
      </label>

      {/* Textarea */}
      <textarea
        id="newSurvey"
        rows="4"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Type your questions here..."
      ></textarea>

      {/* Create button */}
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-green-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          // onClick={(e) => handleCreate(e)}
        >
          Create
        </button>
      </div>
    </div>
  );
}
