import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../../store/SurveyApiSlice";

export const Register = () => {
  const [doRegister] = useRegisterMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { register } = useForm();

  const handleRegister = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");
    const fullname = document.querySelector("#fullname");
    const email = document.querySelector("#email");
    const pw = document.querySelector("#password");

    let cred = {
      email: email.value,
      password: pw.value,
      fullname: fullname.value,
    };

    const response = await doRegister(cred);

    if (response["error"]) {
      setErrorMessage(response["error"]["data"]["message"]);
      console.error("Error:", response["error"]["data"]["message"]);
    } else {
      setSuccessMessage("Successfully registered, please log in");
      console.info("Successfully registered!");

      fullname.value = "";
      email.value = "";
      pw.value = "";
    }
  };

  return (
    <>
      <h1 className="text-center my-6">Register</h1>
      <div className="max-w-sm mx-auto">
        <form
          className="mx-3 my-6"
          id="registerForm"
          name="registerForm"
          onSubmit={handleRegister}>
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
              htmlFor="fullname"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Full name
            </label>
            <input
              type="text"
              name="fullname"
              {...register("fullname", { required: true })}
              id="fullname"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Example Bob"
              required
            />
          </div>
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
              // onClick={(e) => handleRegister(e)}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
