import { LinearProgress, TextareaAutosize } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ProfileNavbar from "../Components/ProfileNavbar";

const Posts = () => {
  const [me, setMe] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState({ text: "" });
  const [like, setLike] = useState(true);
  const [dislike, setDislike] = useState(true);
  const [del, setDel] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) navigate("/");

    async function getMe() {
      try {
        let { data } = await axios.get("api/profile/me");
        setMe(data?.user?._id);
      } catch (error) {
        console.log(error);
      }
    }
    getMe();
    async function getPosts() {
      try {
        let { data } = await axios.get("api/posts");
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    }
    getPosts();
  }, [comment, like, dislike, del]);

  function handleInputChange(e) {
    setComment((oldComment) => ({
      ...oldComment,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleLike(id) {
    try {
      await axios.put(`api/posts/like/${id}`);
      setLike(!like);
    } catch (error) {
      if (error) {
        await axios.put(`api/posts/unlike/${id}`);
        setDislike(!dislike);
        return;
      }
    }
  }
  async function handleDislike(id) {
    try {
      await axios.put(`api/posts/unlike/${id}`);
      setDislike(!dislike);
    } catch (error) {
      if (error) return;
    }
  }
  async function handleDeleteMyPost(id) {
    try {
      await axios.delete(`api/posts/${id}`);
      setDel(!del);
      toast("Post deleted", { type: "info" });
    } catch (error) {
      if (error) return;
    }
  }

  async function handleCreateComment(e) {
    e.preventDefault();

    try {
      let { data } = await axios.post("/api/posts", comment);
      toast("Post Created Successflly", { type: "success" });
    } catch (error) {
      console.log(error);
      toast("Something Went Wrong", { type: "error" });
    }

    e.target.reset();
  }
  return (
    <div>
      <ProfileNavbar />
      <form onSubmit={handleCreateComment} className="w-2/3 mx-auto mt-10">
        <h2 className="text-6xl font-bold text-sky-600">Posts</h2>
        <p className="py-6 text-2xl font-semibold">
          <i className="fa-solid fa-earth-americas pr-3"></i> Welcome to the
          community
        </p>
        <span className="w-full block p-3 text-2xl font-semibold bg-sky-600 text-white rounded-md">
          Say Something...
        </span>
        <TextareaAutosize
          minRows={5}
          className="w-full border my-4 border-gray-600 p-3 rounded-md"
          placeholder="Write a message..."
          name="text"
          onChange={handleInputChange}
        />
        <button type="submit" className="button bg-sky-600 text-white">
          Submit
        </button>
      </form>
      <div className="posts w-2/3 mx-auto my-14 flex flex-col gap-7">
        {posts?.length === 0 ? (
          <div className="mt-20 mb-10">
            <h2 className="text-4xl text-center font-bold mb-10">
              Loading posts...
            </h2>
            <LinearProgress />
          </div>
        ) : (
          posts?.map?.((post) => {
            return (
              <div
                key={crypto.randomUUID()}
                className="flex items-center overflow-hidden gap-14 p-7 rounded-xl border bg-gray-100"
              >
                <span className="flex flex-col items-center w-1/5">
                  <Link to={`/profile/${post?.user}`}>
                    <img
                      src={post?.avatar}
                      alt="profile image"
                      className="rounded-full w-36"
                    />
                  </Link>
                  <Link to={`/profile/${post?.user}`}>
                    <h2 className=" text-xl font-semibold text-sky-600 text-center mt-2">
                      {post?.name}
                    </h2>
                  </Link>
                </span>
                <span>
                  <p className="text-xl mb-4 overflow-hidden w-3/3">
                    {post?.text}
                  </p>
                  <p className="opacity-60 font-semibold pb-2">
                    Posted on {moment(post?.date).utc().format("DD-MM-YYYY")}
                  </p>
                  <span className="flex items-center gap-3">
                    <button
                      onClick={() => handleLike(post?._id)}
                      className="button bg-gray-300"
                    >
                      <i className="fa-solid fa-thumbs-up pr-2"></i>

                      {post.likes?.length ? post.likes?.length : ""}
                    </button>
                    <button
                      onClick={() => handleDislike(post?._id)}
                      className="button bg-gray-300"
                    >
                      <i className="fa-solid fa-thumbs-down"></i>
                    </button>
                    <Link
                      to={`/posts/${post?._id}`}
                      className="button flex items-center bg-sky-600 text-white"
                    >
                      Discussion{" "}
                      <span className="bg-white px-1 rounded ml-3 text-black">
                        {post?.comments?.length}
                      </span>
                    </Link>
                    {post?.user === me && (
                      <button
                        onClick={() => handleDeleteMyPost(post?._id)}
                        className="button bg-red-600"
                      >
                        <i className="fa-solid fa-x text-white"></i>
                      </button>
                    )}
                  </span>
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Posts;
