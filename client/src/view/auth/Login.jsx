import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../store/SurveyApiSlice";
import { setCredentials } from "../../store/SurveySlice";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const Login = () => {
  const [doLogin] = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  const { register } = useForm();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    const email = document.querySelector("#email").value;
    const pw = document.querySelector("#password").value;

    let cred = {
      email: email,
      password: pw,
      strategy: "local",
    };

    const response = await doLogin(cred);

    if (response["error"]) {
      setErrorMessage(response["error"]["data"]["message"]);
      console.error("Error:", response["error"]["data"]["message"]);
    } else {
      setSuccessMessage("Successfully logged in!");
      console.info("Successfully logged in!");

      const data = response["data"];
      const userInfo = { accessToken: data.accessToken, user: data.user };
      dispatch(setCredentials(userInfo));
    }
  };

  return (
    <>
      <h1 className="text-center my-6">Login</h1>
      <div className="max-w-sm mx-auto">
        <form className="mx-3 my-6" id="loginForm" onSubmit={handleLogin}>
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
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="email"
              name="email"
              {...register("email", { required: true })}
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="bob@example.com"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              type="password"
              name="password"
              {...register("password", { required: true })}
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="•••••••••"
              required
            />
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              // onClick={(e) => handleLogin(e)}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
