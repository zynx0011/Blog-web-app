"use client";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { signInStart, signInSuccess, signInFailure } from "../store/authSlice";

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

function Login() {
  const { toast } = useToast();
  const Navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    setErrorText(false);
    setSuccess(true);
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await axios.post(`/api/v1/users/SignIn`, {
        email,
        password,
      });
      dispatch(signInSuccess(res.data.data));
      Navigate("/");
      setErrorText(false);
    } catch (error) {
      dispatch(signInFailure(error.message));
      setSuccess(false);
      console.log(error);
      setErrorText(true);
    }
  };

  useEffect(() => {
    if (errorText) {
      // Call toast function when errorText changes to true
      toast({
        variant: "destructive",
        title: "Please check your credentials.",
        description: "There was a problem with your request.",
      });
    }
    if (success) {
      // Call toast function when errorText changes to true
      toast({
        title: "Logged in successfullydd",
        variant: "success",
        description: "The user has been logged in successfully.",
      });
    }
  }, [errorText, success]);

  return (
    <div className="flex items-center justify-center w-full  max-h-screen p-3 sm:p-[15%]">
      <div className="div w-10 bg-gradient-to-r from-violet-600 to-indigo-600 h-[532px] sm:ml-[16%] flex items-center justify-center rounded-xl sm:w-[30%]">
        <div className="sm:text-3xl hidden sm:block text-xl p-3 sm:p-0 text-center font-bold">
          <h1>
            Welcome To <span className="text-white">Express</span>
          </h1>
        </div>
      </div>
      <div className="mx-auto   sm:w-full max-w-lg  h-[532px] sm:mr-[12%] bg-white rounded-xl p-10 border  backdrop-blur-lg border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all text-indigo-500 duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && (
          <p className="text-red-600 mt-8 text-center">{error.message}</p>
        )}
        {errorText && (
          <div>
            <ToastAction description="There was a problem with your request." />
          </div>
        )}
        {success && (
          <div className="bg-green-500">
            <ToastAction
              badgeTitle="Success"
              title="Logged in successfullydd"
              variant="success"
              badgeColor="bg-green-500"
              badgeTextColor="text-white"
              titleColor="text-white"
              descriptionColor="text-white"
              titleVariant="bold"
              descriptionVariant="medium"
              description="Logged in successfully"
            />
          </div>
        )}
        <form onSubmit={submitHandler} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-7"
            />
            <div className="form-field">
              <div className="form-control justify-between">
                <label className="form-label">
                  <Link to={"/api/v1/users/forgotPassword"}>
                    <button className="link hover:underline link-primary text-sm text-blue-700">
                      Forgot your password?
                    </button>
                  </Link>
                </label>
              </div>
            </div>

            <Button type="submit" className=" w-full  bg-indigo-500">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
