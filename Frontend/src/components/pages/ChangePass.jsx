import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const ChangePass = () => {
  const [error, setError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/v1/users/change-password", {
        oldPassword,
        newPassword,
      });
      setError(false);
      setUpdateSuccess(true);
      console.log("Password changed successfully", res);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center ">
        <form className="flex flex-col gap-4 sm:w-[30%] border p-6 m-10  ">
          <h1 className="text-3xl font-bold text-center text-white mb-6">
            Change Password
          </h1>
          {error && (
            <span className="text-red-600 text-center">
              Something went wrong!
            </span>
          )}
          {updateSuccess && (
            <span className="text-green-600 text-center">
              Password changed successfully
            </span>
          )}
          <input
            type="password"
            onChange={(e) => setOldPassword(e.target.value)}
            value={oldPassword}
            name="password"
            placeholder="Enter Old password"
            className=" rounded-lg p-3"
          />
          <input
            type="password"
            name="password"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            placeholder="Enter New password"
            className=" rounded-lg p-3"
          />
          <button
            className="bg-blue-600 p-3 rounded-lg hover:bg-blue-700 font-semibold text-white"
            onClick={handleChangePassword}
          >
            Update
          </button>
          <Link to="/">
            <span className="text-blue-600 underline hover:text-blue-700 w-full">
              Back To Home
            </span>
          </Link>
        </form>
      </div>
    </>
  );
};

export default ChangePass;
