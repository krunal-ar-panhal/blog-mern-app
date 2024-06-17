import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { app } from "../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const CreatePost = () => {
  const [formData, setFormData] = useState({});
  const [imgUrl, setImgUrl] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setError(data.message);
        return;
      }

      if (res.ok) {
        setError(null);
        toast.success("post created");
        navigate(`/dashboard`);
      }
      console.log(data.slug);
    } catch (error) {
      setError("Something went wrong");
      toast.error(error.message);
      console.log(error);
    }
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const storage = getStorage(app);
      const storageRef = ref(storage, selectedFile.name);
      uploadBytes(storageRef, selectedFile).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, image: downloadURL });
          console.log(downloadURL);
          setImgUrl(downloadURL);
          toast.success("Image now display please upload image");
        });
      });
    } else {
      console.log("No file selected");
    }
  };

  const handleUploadClick = () => {
    toast.success("Image uploaded");
    navigate("");
  };

  return (
    <div className="min-h-screen p-3 mx-auto max-w-3xl mb-9">
      <h1 className="text-center text-3xl my-7 font-semibold">CREATE A POST</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <input
            type="text"
            className="flex-1 p-3 rounded-lg border shadow-md"
            placeholder="Title"
            id="title"
            required
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <select
            required
            id="category"
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="flex-1 p-3 rounded-lg border shadow-md"
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </select>
        </div>
        <div className="flex flex-col m">
          <div
            className="flex gap-4 items-center justify-between border-4 border-teal-500 p-3 border-dotted mt-6 mb-6"
            onChange={handleFileUpload}
          >
            <input type="file" accept="image/*" className="flex-" id="file" />
            <button
              onClick={handleUploadClick}
              className="p-2 border rounded-xl shadow-lg border-purple-500 hover:bg-gradient-to-r hover:to-pink-400 from-purple-500 hover:text-white hover:font-semibold active:bg-none active:text-black text-black "
            >
              Upload Image
            </button>
          </div>

          {imgUrl && (
            <img
              src={imgUrl}
              alt="Uploaded file"
              className="w-full mb-6 border-2 border-gray-300"
            />
          )}
        </div>
        <ReactQuill
          className="h-72 mb-12"
          required
          placeholder="write Something..."
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <div className="mt-8 md:mt-0 w-auo">
          <button
            type="submit"
            className="p-3 w-full text-white bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg hover:from-pink-500 hover:to-purple-400 border border-purple-500 active:bg-none active:text-black "
          >
            PUBLISH
          </button>
        </div>
      </form>
    </div>
  );
};
