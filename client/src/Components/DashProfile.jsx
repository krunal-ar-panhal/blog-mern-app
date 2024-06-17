import { useState } from "react";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutFailure,
  signOutStart,
  signOutSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../Redux/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export const DashProfile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [updateUser, setUpdateUser] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
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
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        dispatch(updateUserSuccess(data));
        navigate("/");
        toast.success("User updated");
        setUpdateUser(true);
        return;
      }
      dispatch(updateUserFailure(data.message));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        dispatch(signOutFailure(data.message));
        return;
      }
      dispatch(signOutSuccess(data));
      navigate("/signin");
      toast.success(data.message);
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/auth/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      if (!data.success) {
        dispatch(deleteUserFailure(data.message));
        toast.error(data.message);
      } else {
        dispatch(deleteUserSuccess(data));
        navigate("/signup");
        toast.success("User deleted successfully");
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="">
        <div className="md:max-w-lg mx-auto flex flex-col gap-4 rounded-xl md:mt-6 mt-16 mb-6 md:ml-auto md:mr-auto ml-3 mr-3">
          <h1 className="font-bold text-3xl text-center">Profile</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="w-28 h-28 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
              <img
                src={currentUser.profilePicture}
                alt="user"
                className="rounded-full w-full h-full border-4 border-gray-400"
              />
            </div>
            <input
              type="text"
              placeholder="Username"
              defaultValue={currentUser.username}
              id="username"
              className="p-3 rounded-lg border border-black shadow-xl"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              defaultValue={currentUser.email}
              id="email"
              className="p-3 rounded-lg border border-black shadow-xl"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              className="p-3 rounded-lg border border-black shadow-xl"
              onChange={handleChange}
            />
            <button className="p-3 rounded-lg border bg-green-500 text-white hover:bg-green-700 active:bg-green-900 shadow-xl">
              UPDATE
            </button>
            {currentUser.isAdmin && (
              <NavLink to={"/create-post"}>
                <button
                  type="button"
                  className="p-3 rounded-lg border bg-gradient-to-r hover:from-purple-400 hover:to-pink-500 text-white w-full shadow-xl from-purple-600 to-pink-600"
                >
                  CREATE A POST
                </button>
              </NavLink>
            )}
          </form>
          <div className="flex justify-between">
            <button
              onClick={() => setShowModal(true)}
              className="text-red-700 hover:bg-gray-200 rounded-lg p-1"
            >
              Delete account
            </button>
            <button
              onClick={handleSignout}
              className="text-red-700 cursor-pointer p-1 hover:bg-gray-200 rounded-lg"
            >
              Signout
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 dark:bg-gray-800">
            <div className="text-center">
              <HiOutlineExclamationCircle className="text-black mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-black">
                Are you sure you want to delete this account?
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
