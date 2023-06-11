import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export function Survey() {
  return (
    <>
      <h1>MyFavSurvey</h1>

      {/* Questions */}
      <h3>1. What is my favourite color?</h3>
      <div className="mb-6 mt-2">
        <label
          htmlFor="answer-1"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white sr-only"
        >
          Answer:
        </label>
        <input
          type="text"
          id="answer-1"
          placeholder="Type your answer here"
          className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <h3>2. What is my favourite city?</h3>
      <div className="mb-6 mt-2">
        <label
          htmlFor="answer-2"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white sr-only"
        >
          Answer:
        </label>
        <input
          type="text"
          id="answer-2"
          placeholder="Type your answer here"
          className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <h3>3. How old am I?</h3>
      <div className="mb-6 mt-2">
        <label
          htmlFor="answer-3"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white sr-only"
        >
          Answer:
        </label>
        <input
          type="text"
          id="answer-3"
          placeholder="Type your answer here"
          className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Pagination */}
      <nav className="flex flex-row justify-center">
        <ul className="inline-flex -space-x-px">
          <li>
            <a
              href="#"
              className="px-3 py-2 ml-0 leading-tight border rounded-l-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <FontAwesomeIcon
                icon={faChevronLeft}
                style={{ color: "#9CA3AF" }}
              />
            </a>
          </li>
          <li>
            <a
              href="#"
              className=" px-3 py-2 leading-tight border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="px-3 py-2 leading-tight border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              className="px-3 py-2 border dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-500"
            >
              3
            </a>
          </li>
          <li>
            <a
              href="#"
              className="px-3 py-2 leading-tight border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              4
            </a>
          </li>
          <li>
            <a
              href="#"
              className="px-3 py-2 leading-tight border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              5
            </a>
          </li>
          <li>
            <a
              href="#"
              className="px-3 py-2 ml-0 leading-tight border rounded-r-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
            >
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
