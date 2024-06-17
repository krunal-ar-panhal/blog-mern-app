import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  signinFailure,
  signinStart,
  signinSuccess,
} from "../Redux/user/userSlice";
import { Google } from "../Components/Google";
import toast from "react-hot-toast";

export const Signin = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signinStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (!data.success === false) {
        dispatch(signinSuccess(data));
        navigate("/");
        toast.success("user logged");
        return;
      }
      dispatch(signinFailure(data.message));
      toast.error(data.message);
    } catch (error) {
      dispatch(signinFailure(error.message));
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="md:min-h-screen">
        <div className="max-w-lg mx-auto flex flex-col gap-4 border border-stone-200 rounded-xl bg-stone-300 p-7 mt-16 mb-16 md:mb-auto ml-3 md:ml-auto mr-3 md:mr-auto md:mt-20">
          <h1 className="font-bold text-3xl text-center">Sign In</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              required
              id="email"
              className="p-3 rounded-lg border shadow-xl"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              required
              id="password"
              className="p-3 rounded-lg border  shadow-xl"
              onChange={handleChange}
            />

            <button className="p-3 rounded-lg border bg-blue-500 text-white hover:bg-blue-700 active:bg-blue-900 shadow-xl">
              SIGN-IN
            </button>
            <Google />
          </form>
          <div>
            <p>
              Don't Have an account?{" "}
              <span className="underline text-blue-500 cursor-pointer">
                <NavLink to="/signup">Sign-Up</NavLink>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
