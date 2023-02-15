import { TextareaAutosize } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ProfileNavbar from "../Components/ProfileNavbar";

const SinglePost = () => {
  const { postId } = useParams();

  const [me, setMe] = useState([]);
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState({ text: "" });
  const [like, setLike] = useState(true)
  const [dislike, setDislike] = useState(true)
  const [del, setDel] = useState(true)

  useEffect(() => {
    async function getMe() {
      let { data } = await axios.get(`api/profile/me`);
      setMe(data?.user?._id);
    }
    getMe();
    async function getPost() {
      let { data } = await axios.get(`api/posts/${postId}`);
      setPost(data);
    }
    getPost();
  }, [comment, like, dislike, del]);

  
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

  async function handleDeleteMyComment(id) {
    try {
      await axios.delete(`api/posts/comment/${post?._id}/${id}`);
      setDel(!del);
      toast("Comment deleted", {type:"info"})
    } catch (error) {
      if (error) return;
    }
  }
  

  function handleInputChange(e) {
    setComment((oldComment) => ({
      ...oldComment,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleCreateComment(e) {
    e.preventDefault();

    try {
     let {data} =  await axios.post(
        `api/posts/comment/${post?._id}`,
        comment
      );
      toast("Comment Added", { type: "success" });
    } catch (error) {
      toast("Something Went Wrong", { type: "error" });
    }

    e.target.reset();
  }
  return (
    <>
      <ProfileNavbar />
      <div className=" w-2/3 mx-auto my-14">
        <Link to="/posts" className="button bg-gray-100">
          Back to posts
        </Link>
        <div className="flex items-center overflow-hidden gap-14 p-7 mt-10 rounded-xl border bg-gray-100">
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
            <p className="text-xl mb-4">{post?.text}</p>
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
            </span>
          </span>
        </div>
        <form onSubmit={handleCreateComment} className="mt-10">
          <span className="w-full block p-3 text-2xl font-semibold bg-sky-600 text-white rounded-md">
            Leave a comment
          </span>
          <TextareaAutosize
            minRows={5}
            className="w-full border my-4 border-gray-600 p-3 rounded-md"
            placeholder="Comment the Post..."
            name="text"
            onChange={handleInputChange}
          />
          <button type="submit" className="button bg-sky-600 text-white">
            Submit
          </button>
        </form>
        {post?.comments?.map?.((comment)=>{
          return (
            <div
              key={comment?._id}
              className="flex items-center gap-14 p-7 mt-10 rounded-xl border bg-gray-100"
            >
              <span className="flex flex-col items-center w-1/5">
                <Link to={`/profile/${comment?.user}`}>
                  <img
                    src={comment?.avatar}
                    alt="profile image"
                    className="rounded-full w-36"
                  />
                </Link>
                <Link to={`/profile/${comment?.user}`}>
                  <h2 className=" text-xl font-semibold text-sky-600 text-center mt-2">
                    {comment?.name}
                  </h2>
                </Link>
              </span>
              <span>
                <p className="text-xl mb-4">{comment?.text}</p>
                <p className="opacity-60 font-semibold pb-2">
                  Posted on {moment(comment?.date).utc().format("DD-MM-YYYY")}
                </p>
                {comment?.user === me && (
                  <button onClick={()=>handleDeleteMyComment(comment?._id)} className="mt-5 button bg-red-600 text-white">
                    <i className="fa-solid fa-x"></i>
                  </button>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SinglePost;
