import { TextareaAutosize, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProfileNavbar from "../Components/ProfileNavbar";

const EditProfile = () => {
  const navigate = useNavigate();
  const [myData, setMyData] = useState([]);

  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    status: "",
    company: "",
    location: "",
    skills:[],
    github: "",
    website: "",
    youtube: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
  });

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) navigate("/");

    async function bringData(){
      let {data} = await axios.get("/api/profile/me")
      setMyData(data);
    } bringData()
    
  }, [values]);

  function handleSocialLinks(e) {
    e.preventDefault();
    setOpen(!open);
  }

  function handleInputChange(e){
    setValues(oldV =>({
      ...oldV,
      [e.target.name]: e.target.value
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.post("/api/profile", values)
      toast("Profile Changed Successfully", {type:"success"})
      navigate('/dashboard')
    } catch (error) {
      toast("Fill out the required fields", {type:"error"})
      console.log(error); 
    }
  }

  console.log(myData);

  return (
    <div>
      <ProfileNavbar />
      <form className="w-2/3 mx-auto mt-10">
        <h2 className="text-6xl font-bold text-sky-600">Edit Your Profile</h2>
        <p className="py-6 text-2xl font-semibold">
          <i className="fa-solid fa-user-pen pr-3"></i>Add Some Changes To Your
          Profile
        </p>
        <p className="pb-4 opacity-90">
          <span className="font-bold">*</span> = required field
        </p>
        <div className="flex flex-col gap-5">
          <span className="w-full">
            <select
              className="form-select px-4 py-3 rounded-md border border-gray-500 w-full"
              name="status"
              required
              value={values.status}
              onChange={handleInputChange}
            >
              <option value="">* Select Professional Status</option>
              <option value="Developer">Developer</option>
              <option value="Junior Developer">Junior Developer</option>
              <option value="Senior Developer">Senior Developer</option>
              <option value="Manager">Manager</option>
              <option value="Student or Learning">Student or Learning</option>
              <option value="Instructor or Teacher">
                Instructor or Teacher
              </option>
              <option value="Intern">Intern</option>
              <option value="Other">Other</option>
            </select>
            <p className="opacity-70">
              Give us an idea where you are at in your career
            </p>
          </span>
          <span>
            <TextField
              id="outlined-basic2"
              fullWidth
              type="text"
              placeholder="Company"
              variant="outlined"
              name="company"
              value={values.company}
              onChange={handleInputChange}
            />
            <p className="opacity-70">
              Could be your own company or the one you work for
            </p>
          </span>
          <span>
            <TextField
              id="outlined-basic2"
              fullWidth
              type="text"
              placeholder="Website"
              variant="outlined"
              name="website"
              value={values.website}
              onChange={handleInputChange}
            />
            <p className="opacity-70">Could be your own or a company website</p>
          </span>
          <span>
            <TextField
              id="outlined-basic2"
              fullWidth
              type="text"
              placeholder="Location"
              variant="outlined"
              name="location"
              value={values.location}
              onChange={handleInputChange}
            />
            <p className="opacity-70">City & State (eg. Boston, MA)</p>
          </span>
          <span>
            <TextField
              id="outlined-basic2"
              fullWidth
              type="text"
              placeholder="* Skills"
              variant="outlined"
              name="skills"
              required
              value={values.skills}
              onChange={handleInputChange}
            />
            <p className="opacity-70">
              Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
            </p>
          </span>
          <span>
            <TextField
              id="outlined-basic2"
              fullWidth
              type="text"
              placeholder="GitHub Username"
              variant="outlined"
              name="github"
              value={values.github}
              onChange={handleInputChange}
            />
            <p className="opacity-70">
              If you want your latest repos and a Github link, include your
              username
            </p>
          </span>
          <span>
            <TextareaAutosize
              minRows={4}
              className="w-full border border-gray-600 p-3 rounded-md"
              placeholder="A short bio about yourself"
            />
            <p className="opacity-70">Tell us a little about yourself</p>
          </span>
          <span>
            <button
              onClick={handleSocialLinks}
              className="button bg-gray-300 w-2/6 mr-5"
            >
              Add Social Network Links <i className="fa-solid fa-globe"></i>
            </button>
            (Optional)
          </span>
          {open && (
            <div className="flex flex-col gap-4">
              <span className="flex items-center gap-5">
                <label htmlFor="twitterLink">
                  <i className="fa-brands fa-twitter fa-2xl text-cyan-500"></i>
                </label>
                <TextField
                  id="twitterLink"
                  fullWidth
                  type="text"
                  placeholder="Twitter URL"
                  variant="outlined"
                  name="twitter"
                  value={values.twitter}
                  onChange={handleInputChange}
                />
              </span>
              <span className="flex items-center gap-5">
                <label htmlFor="facebookLink">
                  <i className="fa-brands fa-facebook fa-2xl text-sky-700"></i>
                </label>
                <TextField
                  id="facebookLink"
                  fullWidth
                  type="text"
                  placeholder="Facebook URL"
                  variant="outlined"
                  name="facebook"
                  value={values.facebook}
                  onChange={handleInputChange}
                />
              </span>
              <span className="flex items-center gap-4">
                <label htmlFor="youtubeLink">
                  <i className="fa-brands fa-youtube fa-2xl text-red-600"></i>
                </label>
                <TextField
                  id="youtubeLink"
                  fullWidth
                  type="text"
                  placeholder="YouTube URL"
                  variant="outlined"
                  name="youtube"
                  value={values.youtube}
                  onChange={handleInputChange}
                />
              </span>
              <span className="flex items-center gap-6">
                <label htmlFor="linkedinLink">
                  <i className="fa-brands fa-linkedin fa-2xl text-sky-600"></i>
                </label>
                <TextField
                  id="linkedinLink"
                  fullWidth
                  type="text"
                  placeholder="LinkedIn URL"
                  variant="outlined"
                  name="linkedin"
                  value={values.linkedin}
                  onChange={handleInputChange}
                />
              </span>
              <span className="flex items-center gap-6">
                <label htmlFor="instagramLink">
                  <i className="fa-brands fa-instagram fa-2xl text-pink-500"></i>
                </label>
                <TextField
                  id="instagramLink"
                  fullWidth
                  type="text"
                  placeholder="Instagram URL"
                  variant="outlined"
                  name="instagram"
                  value={values.instagram}
                  onChange={handleInputChange}
                />
              </span>
            </div>
          )}
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="button mt-7 mr-7 mb-20 text-white bg-sky-600"
        >
          Submit
        </button>
        <Link to="/dashboard" className="button mt-4 bg-gray-300">
          Go Back
        </Link>
      </form>
    </div>
  );
};

export default EditProfile;
