import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import toast from "react-hot-toast";
import { signinSuccess } from "../Redux/user/userSlice";

export const Google = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          googlePhotoUrl: result.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log(data);
      dispatch(signinSuccess(data));
      navigate("/");
      toast.success("user logged");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      className="p-3 rounded-lg border bg-red-500 text-white hover:bg-gradient-to-r from-pink-500 to-orange-500 active:bg-blue-900 shadow-xl"
      onClick={handleGoogle}
      type="button"
    >
      CONTINUE WITH GOOGLE
    </button>
  );
};
