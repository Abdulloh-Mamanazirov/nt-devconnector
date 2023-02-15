import { LinearProgress } from "@mui/material";
import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ProfileNavbar from "../Components/ProfileNavbar";

const UserProfile = () => {
  const { id } = useParams();

  const [user, setUser] = useState([]);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    async function getUser() {
      let { data } = await axios.get(`api/profile/user/${id}`);
      setUser(data);
      let { data: repos } = await axios.get(
        `api/profile/github/${data?.githubusername}`
      );
      setRepos(repos);
    }
    getUser();
  }, []);


  return (
    <>
      <ProfileNavbar />
      <div className="w-2/3 mx-auto my-10">
        <Link to="/profiles" className="button bg-gray-200">
          Back to Profiles
        </Link>
        {user?.length === 0 ? (
          <div className="mt-24">
            <h2 className="text-4xl text-center font-bold mb-10">
              Loading data...
            </h2>
            <LinearProgress />
          </div>
        ) : (
          <div className="mt-7">
            <div className="showcase flex flex-col gap-4 items-center bg-sky-600 p-16 rounded-xl text-white">
              <img
                src={user?.user?.avatar}
                alt="profile image"
                className="rounded-full w-64"
              />
              <h1 className="text-5xl font-bold">{user.user?.name}</h1>
              <p className="text-3xl text-center">
                {user?.status} at {user?.company}
              </p>
              <p className="text-xl">{user?.location}</p>
              <span className="flex items-center gap-10">
                {user?.social?.facebook ? (
                  <a href={user?.social?.facebook} target="_blank">
                    <i className="fa-brands fa-facebook text-3xl"></i>
                  </a>
                ) : (
                  ""
                )}
                {user?.social?.instagram ? (
                  <a href={user?.social?.instagram} target="_blank">
                    <i className="fa-brands fa-instagram text-3xl"></i>
                  </a>
                ) : (
                  ""
                )}
                {user?.social?.linkedin ? (
                  <a href={user?.social?.linkedin} target="_blank">
                    <i className="fa-brands fa-linkedin text-3xl"></i>
                  </a>
                ) : (
                  ""
                )}
                {user?.social?.twitter ? (
                  <a href={user?.social?.twitter} target="_blank">
                    <i className="fa-brands fa-twitter text-3xl"></i>
                  </a>
                ) : (
                  ""
                )}
                {user?.social?.youtube ? (
                  <a href={user?.social?.youtube} target="_blank">
                    <i className="fa-brands fa-youtube text-3xl"></i>
                  </a>
                ) : (
                  ""
                )}
              </span>
            </div>
            <div className="Bio flex flex-col items-center gap-5 p-14 my-7 border-2 rounded-xl bg-gray-100">
              <h2 className="text-3xl font-semibold text-sky-600">
                {user?.user?.name}'s bio
              </h2>
              <p className="text-xl text-center">{user?.bio}</p>
              <span className="w-full border-b-2 border-gray-400"></span>
              <h2 className="text-3xl font-semibold text-sky-600">Skill set</h2>
              <span className="text-xl flex items-center gap-10">
                {user?.skills?.map((skill, index) => (
                  <p key={index}>
                    <i className="fa-solid fa-check"></i>
                    {skill}
                  </p>
                ))}
              </span>
            </div>
            <div className="edu flex items-center justify-between gap-5"> 
              <div className="p-10 border-2 bg-gray-100 rounded-xl w-7/12 experience">
                <h3 className="text-3xl mb-3 font-semibold text-sky-600">
                  Experience
                </h3>
                {user?.experience?.length === 0 ? (
                  <h1 className="text-2xl text-gray-600">
                    No Information About Experience
                  </h1>
                ) : (
                  <>
                    <p className="text-xl font-semibold">
                      {user?.experience?.[0]?.company}
                    </p>
                    <p className="text-xl">
                      {user?.experience?.[0]?.from
                        ? moment(user?.experience?.[0]?.from)
                            .utc()
                            .format("DD-MM-YYYY")
                        : " "}{" "}
                      -{" "}
                      {user?.experience?.[0]?.to
                        ? moment(user?.experience?.[0]?.to)
                            .utc()
                            .format("DD-MM-YYYY")
                        : user?.experience?.[0]?.current
                        ? "Now"
                        : "No Information"}
                    </p>
                    <span className="flex gap-2 text-xl">
                      <p className="font-semibold">Position:</p>
                      <p>{user?.experience?.[0]?.title}</p>
                    </span>
                    <span className="flex gap-2 text-xl">
                      <p className="font-semibold">Location:</p>
                      <p>{user?.experience?.[0]?.location}</p>
                    </span>
                    <span className="flex gap-2 text-xl">
                      <p className="font-semibold">Description:</p>
                      <p>{user?.experience?.[0]?.description}</p>
                    </span>
                  </>
                )}
              </div>
              <div className="p-10 border-2 bg-gray-100 rounded-xl flex-1 education">
                <h3 className="text-3xl mb-3 font-semibold text-sky-600">
                  Education
                </h3>
                {user?.education?.length === 0 ? (
                  <h1 className="text-2xl text-gray-600">
                    No Information About Education
                  </h1>
                ) : (
                  <>
                    <p className="text-xl font-semibold">
                      {user?.education?.[0]?.school}
                    </p>
                    <p className="text-xl">
                      {user?.education?.[0]?.from
                        ? moment(user?.education?.[0]?.from)
                            .utc()
                            .format("DD-MM-YYYY")
                        : " "}{" "}
                      -{" "}
                      {user?.education?.[0]?.to
                        ? moment(user?.education?.[0]?.to)
                            .utc()
                            .format("DD-MM-YYYY")
                        : user?.education?.[0]?.current
                        ? "Now"
                        : "No Information"}
                    </p>
                    <span className="flex gap-2 text-xl">
                      <p className="font-semibold">Degree :</p>{" "}
                      {user?.education?.[0]?.degree}
                    </span>
                    <span className="flex gap-2 text-xl">
                      <p className="font-semibold">Field of Study :</p>{" "}
                      {user?.education?.[0]?.fieldofstudy}
                    </span>
                    <span className="flex gap-2 text-xl">
                      <p className="font-semibold">Description :</p>{" "}
                      {user?.education?.[0]?.description}
                    </span>
                  </>
                )}
              </div>
            </div>
            <h2 className="text-3xl font-semibold text-sky-600 my-7">
              GitHub Repositories
            </h2>
            <div className="gthub flex flex-col gap-5">
              {repos?.map?.((repo) => {
                return (
                  <div
                    key={repo?.id}
                    className="flex items-center justify-between p-7 border-2 rounded-xl bg-gray-100"
                  >
                    <a
                      className="text-xl font-semibold text-sky-500 hover:underline"
                      href={`https://github.com/${repo?.full_name}`}
                    >
                      {repo?.name}
                    </a>
                    <div className="flex flex-col gap-4">
                      <span className="px-4 py-1 rounded-lg text-white bg-sky-500">
                        Stars: {repo?.stargazers_count}
                      </span>
                      <span className="px-4 py-1 rounded-lg text-white bg-gray-500">
                        Watchers: {repo?.watchers_count}
                      </span>
                      <span className="px-4 py-1 rounded-lg text-white bg-slate-400">
                        Forks: {repo?.forks_count}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserProfile;
