"use client";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import { signInSuccess } from "../store/authSlice";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      // Call toast function when errorText changes to true
      toast({
        variant: "destructive",
        title: "Please check your credentials.",
        description: "There was a problem with your request.",
      });
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await axios.post("/api/v1/users/Signup", {
        username,
        email,
        password,
      });
      navigate("/");
      console.log(res);
      dispatch(signInSuccess(res.data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);

      setError(true);
    }
  };

  return (
    <div className="flex items-center justify-center   max-h-screen p-[15%]">
      <div className="div w-10 bg-gradient-to-r from-violet-600 to-indigo-600 h-[592px] sm:ml-[16%] flex items-center justify-center rounded-xl sm:w-[30%]">
        <div className="text-3xl hidden sm:block text-center font-bold">
          <h1>
            Welcome To <span className="text-white">Express</span>
          </h1>
        </div>
      </div>
      <div
        className={`mx-auto h-[592px]  sm:w-full max-w-lg backdrop-blur-lg sm:mr-[12%] bg-white rounded-xl p-10 border border-black/20`}
      >
        <div className="mb-5 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all text-indigo-500 duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && (
          <div>
            <ToastAction description="There was a problem with your request." />
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Input
              label="Password: "
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter your password"
            />
            {/* <Input
              label="phone no"
              placeholder="enter phone number"
              {...register("phoneno", {
                required: true,
              })}
            />
            
            <Input
              label="OTP"
              placeholder="Enter OTP received by SMS"
              {...register("otp", {
                required: true,
              })}
            /> */}
            <Button type="submit" className="w-full bg-indigo-500">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
