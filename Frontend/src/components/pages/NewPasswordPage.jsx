import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const NewPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState();
  const parmas = useParams();
  const { userId } = useParams();
  const navigate = useNavigate();

  // console.log(userId, token);
  // console.log(parmas);

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if passwords match

      const res = await axios.post(`/api/v1/users/reset-password/${userId}`, {
        newPassword,
        confirmPassword,
      });

      setSuccess(true);

      setTimeout(() => {
        navigate("/Login");
      }, 3000);
    } catch (error) {
      console.log(error);
      setError(true, "An error occurred while checking passwords", error);
    }
  };

  return (
    <div className="sm:min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          {success && (
            <>
              <p className="text-center text-sm text-green-600">
                Password updated successfully ! please wait Redirecting to login
                page
              </p>
            </>
          )}
          {error && (
            <p className="text-center text-sm text-red-600">
              {" "}
              something went wrong{" "}
            </p>
          )}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Create Your <span className=""> New Password </span>
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm sm:space-y-4">
            <div>
              <label className="sr-only">New Password</label>
              <input
                id="new-password"
                name="newPassword"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none  rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="New Password"
                value={newPassword}
                onChange={handleNewPasswordChange}
              />
            </div>
            <div>
              <label className="sr-only">Confirm Password</label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="confirm-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
          </div>

          <div>
            <button
              // type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {success ? "Password Updated" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPasswordPage;
