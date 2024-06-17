import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Google } from "../Components/Google";
import toast from "react-hot-toast";

export const Signup = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        toast.error(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/signin");
      toast.success(data.message);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="md:min-h-screen">
        <div className="max-w-lg mx-auto flex flex-col gap-4 border border-stone-200 rounded-xl bg-stone-300 p-7 mt-14 ml-3 md:ml-auto md:mr-auto mr-3 mb-14 md:mt-20">
          <h1 className="font-bold text-3xl text-center">Sign Up</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Username"
              required
              id="username"
              className="p-3 rounded-lg border shadow-xl"
              onChange={handleChange}
            />
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
              SIGN-UP
            </button>
            <Google />
          </form>
          <div>
            <p>
              Have an account ?{" "}
              <span className="underline text-blue-500 cursor-pointer">
                <NavLink to="/signin">Sign-In</NavLink>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
