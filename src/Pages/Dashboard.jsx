import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProfileNavbar from "../Components/ProfileNavbar";
import { addUser } from "../store/slices/user";

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [delEx, setDelEx] = useState(true);
  const [delEdu, setDelEdu] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((u) => u.user);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) navigate("/");

    async function getMe() {
      try {
        let { data } = await axios.get("api/profile/me");
        dispatch(addUser(data));
        setUserData(data);
      } catch (error) {
        console.log(error);
        setUserData(error);
      }
    }
    getMe();
  }, [delEx, delEdu]);

  async function handleDeleteExperience(id) {
    try {
      axios.delete(`api/profile/experience/${id}`);
      setDelEx(!delEx);
      toast("Experience Removed", { type: "info" });
    } catch (error) {
      toast("Something Went Wrong", { type: "error" });
      console.log(error);
    }
  }
  async function handleDeleteEducation(id) {
    try {
      axios.delete(`api/profile/education/${id}`);
      setDelEdu(!delEdu);
      toast("Education Removed", { type: "info" });
    } catch (error) {
      toast("Something Went Wrong", { type: "error" });
      console.log(error);
    }
  }

  function handleDeleteAcount() {
    let confirmation = confirm(
      "Are You Sure To Delete Your Account? \nYour data cannot be restored!"
    );
    if (confirmation) {
      toast("Your Account Was Deleted", { type: "info" });
      localStorage.removeItem("token");
      axios.delete("api/profile");
      navigate("/");
    }
  }
  return (
    <>
      <ProfileNavbar />
      <div className="w-2/3 mx-auto my-10">
        <h2 className="text-6xl font-bold text-sky-600">Dashboard</h2>
        {userData?._id ? (
          <>
            <p className="py-6 text-2xl font-bolder">
              <i className="fa-solid fa-user pr-3"></i>Welcome,
              {userData?.user?.name}
            </p>
            <div className="flex gap-3">
              <Link to="/edit-profile" className="button bg-gray-200">
                <i className="pr-2 fa-solid fa-user-pen"></i> Edit Profile
              </Link>
              <Link to="/add-experience" className="button bg-gray-200">
                <i className="pr-2 fa-solid fa-briefcase"></i> Add Experience
              </Link>
              <Link to="/add-education" className="button bg-gray-200">
                <i className="pr-2 fa-solid fa-graduation-cap"></i> Add
                Education
              </Link>
            </div>
            <h3 className="py-8 text-3xl font-semibold">
              Experience Credentials
            </h3>
            <table className="table-auto bg-gray-100">
              <thead className="text-2xl border-b-2 border-white py-3">
                <tr>
                  <th className="py-3 px-5 border-r-2 border-white border-b-2">
                    Company
                  </th>
                  <th className="py-3 px-5 border-r-2 border-white border-b-2">
                    Title
                  </th>
                  <th className="py-3 px-5 border-r-2 border-white border-b-2">
                    Years
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {userData?.experience?.length > 0
                  ? userData?.experience?.map?.((exp) => (
                      <tr key={crypto.randomUUID()}>
                        <td className="text-lg p-3 border-r-2 border-white border-b-2">
                          {exp?.company ? exp?.company : "No Information"}
                        </td>
                        <td className="text-lg p-3 border-r-2 border-white border-b-2">
                          {exp?.title ? exp?.title : "No Information"}
                        </td>
                        <td className="text-lg p-3 border-r-2 border-white border-b-2">
                          {exp?.from
                            ? moment(exp?.from).utc().format("DD-MM-YYYY")
                            : ""}
                          -
                          {exp?.to
                            ? moment(exp?.to).utc().format("DD-MM-YYYY")
                            : "Now"}
                        </td>
                        <td>
                          {exp?.company ? (
                            <button
                              onClick={() => handleDeleteExperience(exp?._id)}
                              className="button bg-red-600 text-white"
                            >
                              Delete
                            </button>
                          ) : (
                            ""
                          )}
                        </td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </table>
            <h3 className="py-8 text-3xl font-semibold">
              Education Credentials
            </h3>
            <table className="table-auto bg-gray-100">
              <thead className="text-2xl border-b-2 border-white py-3">
                <tr>
                  <th className="py-3 px-5 border-r-2 border-white border-b-2">
                    School
                  </th>
                  <th className="py-3 px-5 border-r-2 border-white border-b-2">
                    Degree
                  </th>
                  <th className="py-3 px-5 border-r-2 border-white border-b-2">
                    Years
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {userData?.education?.length > 0
                  ? userData?.education?.map?.((edu) => {
                      return (
                        <tr key={crypto.randomUUID()}>
                          <td className="text-lg p-3 border-r-2 border-b-2 border-white">
                            {edu?.school ? edu?.school : "No Information"}
                          </td>
                          <td className="text-lg p-3 border-r-2 border-white border-b-2">
                            {edu?.degree ? edu?.degree : "No Information"}
                          </td>
                          <td className="text-lg p-3 border-r-2 border-white border-b-2">
                            {edu?.from
                              ? moment(edu?.from).utc().format("DD-MM-YYYY")
                              : " "}
                            -
                            {edu?.to
                              ? moment(edu?.to).utc().format("DD-MM-YYYY")
                              : "Now"}
                          </td>
                          <td>
                            {edu?.school ? (
                              <button
                                onClick={() => handleDeleteEducation(edu?._id)}
                                className="button bg-red-600 text-white"
                              >
                                Delete
                              </button>
                            ) : (
                              ""
                            )}
                          </td>
                        </tr>
                      );
                    })
                  : ""}
              </tbody>
            </table>
            <button
              onClick={handleDeleteAcount}
              className="button bg-red-600 text-white mt-8"
            >
              <i className="fa-solid fa-user-slash"></i> Delete My Account
            </button>
          </>
        ) : (
          <>
            <p className="text-xl pt-5 pb-7">
              No profile found. Do you want to create a profile?
            </p>
            <Link to="/create-profile" className="button bg-sky-600 text-white">
              Create Profile
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
