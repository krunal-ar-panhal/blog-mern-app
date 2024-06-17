import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./Components/Header";
import { Home } from "./Pages/Home";
import { About } from "./Pages/About";
import { Signup } from "./Pages/Signup";
import { Signin } from "./Pages/Signin";
import { Projects } from "./Pages/Projects";
import { Dashboard } from "./Pages/Dashboard";
import { Contact } from "./Pages/Contact";
import { Found } from "./Pages/Found";
import { Toaster } from "react-hot-toast";
import { Footer } from "./Components/Footer";
import { CreatePost } from "./Pages/CreatePost";
import { useSelector } from "react-redux";
import { UpdatePost } from "./Pages/updatePost";
import { PostPage } from "./Pages/PostPage";
import { ScrollToTop } from "./Components/Scroll";
import { Comment } from "./Pages/Commet";
import { Search } from "./Pages/Search";

export const App = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/commet" element={<Comment />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/projects" element={<Projects />} />
            <Route
              path="/dashboard"
              element={currentUser ? <Dashboard /> : <Signin />}
            />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/create-post"
              element={
                currentUser && currentUser.isAdmin ? <CreatePost /> : <Signin />
              }
            />
            <Route
              path="/update-post/:postId"
              element={
                currentUser && currentUser.isAdmin ? <UpdatePost /> : <Home />
              }
            />
            <Route path="/post/:postSlug" element={<PostPage />} />
            <Route path="*" element={<Found />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
      <Toaster />
    </div>
  );
};
