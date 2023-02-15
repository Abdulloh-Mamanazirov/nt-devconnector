import {
  Checkbox,
  FormControlLabel,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProfileNavbar from "../Components/ProfileNavbar";
import { addExperience } from "../store/slices/user";

const AddExperience = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const [values, setValues] = useState({
    title:"",
    company:"",
    from:"",
    to:""
  })
const user = useSelector(e=>e.user)
console.log(user);
  async function handleInputChange(e){
    setValues(oldV =>({
      ...oldV,
      [e.target.name]: e.target.value,
    }))
  }
  
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let {data}= await axios.put("api/profile/experience", values)
      toast("Experience Added Successfully", {type:"success"})
      dispatch(addExperience(data))
      navigate('/dashboard')
    } catch (error) {
      toast("Fill out the required fields", {type:"error"})
      console.log(error);
    }
  }

  return (
    <div>
      <ProfileNavbar />
      <form className="w-2/3 mx-auto mt-10">
        <h2 className="text-6xl font-bold text-sky-600">Add Experience</h2>
        <p className="py-6 text-2xl font-semibold">
          <i className="fa-solid fa-briefcase pr-3"></i> Add any
          developer/programming positions that you have had in the past
        </p>
        <p className="pb-4 opacity-90">
          <span className="font-bold">*</span> = required field
        </p>
        <div className="flex flex-col gap-4">
          <TextField
            id="outlined-basic2"
            fullWidth
            type="text"
            placeholder="* Job Title"
            variant="outlined"
            name="title"
            required
            onChange={handleInputChange}
          />
          <TextField
            id="outlined-basic3"
            fullWidth
            type="text"
            placeholder="* Company"
            variant="outlined"
            name="company"
            required
            onChange={handleInputChange}
          />
          <TextField
            id="outlined-basic4"
            fullWidth
            type="text"
            placeholder="Location"
            variant="outlined"
          />
          <span className="flex flex-col">
            <label htmlFor="fromDate" className="font-semibold">
             * From Date
            </label>
            <TextField
              type="date"
              id="fromDate"
              name="from"
              required
              onChange={handleInputChange}
            />
          </span>
          <span className="flex items-center">
            <FormControlLabel control={<Checkbox />} id="chackbox" />
            <label htmlFor="chackbox">Current Job</label>
          </span>
          <span className="flex flex-col">
            <label htmlFor="toDate" className="font-semibold">
              To Date
            </label>
            <TextField type="date" id="toDate" name="to" onChange={handleInputChange} />
          </span>
          <TextareaAutosize
            minRows={4}
            className="w-full border border-gray-600 p-3 rounded-md"
            placeholder="Job Description"
          />
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

export default AddExperience;
