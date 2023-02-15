import { TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../Components/Navbar";

const Register = () => {

  const navigate = useNavigate()
  
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  useEffect(()=>{
    let token = localStorage.getItem('token')
    if (token) navigate("/dashboard")
  },[])


  function handleInputChange(e) {
    setValues((oldValues) => ({
      ...oldValues,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleRegister(e) {
    e.preventDefault();

    // Validations
    if (values.password !== values.confirmedPassword) {
      toast("Passwords do not match", { type: "error" });
      return
    }

    try {
      let {data} = await axios.post("/api/users", values);
      let {token} = data
      localStorage.setItem("token", token)
      axios.defaults.headers.common["x-auth-token"] = `${token}`;

      toast("Registered Successflly", {type:"success"})
      navigate("/dashboard")
    } catch (error) {
      toast(error.response.data.errors[0].msg, {type:"error"});
    }
  }

  return (
    <div>
      <Navbar />
      <form onSubmit={handleRegister} className="w-2/3 mx-auto mt-10">
        <h2 className="text-6xl font-bold text-sky-600">Sign Up</h2>
        <p className="py-6 text-2xl font-semibold">
          <i className="fa-solid fa-user pr-3"></i>Create Your Account
        </p>
        <div className="flex flex-col gap-4">
          <TextField
            name="name"
            required
            id="outlined-basic1"
            fullWidth
            type="text"
            placeholder="Your Name"
            variant="outlined"
            value={values.name}
            onChange={handleInputChange}
          />
          <span>
            <TextField
              name="email"
              required
              id="outlined-basic2"
              fullWidth
              type="email"
              placeholder="Email Address"
              variant="outlined"
              value={values.email}
              onChange={handleInputChange}
            />
            <p className="opacity-70">
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </p>
          </span>
          <TextField
            name="password"
            min={6}
            required
            id="outlined-basic3"
            fullWidth
            type="password"
            placeholder="Password"
            variant="outlined"
            value={values.password}
            onChange={handleInputChange}
          />
          <TextField
            name="confirmedPassword"
            min={6}
            required
            id="outlined-basic4"
            fullWidth
            type="password"
            placeholder="Confirm Password"
            variant="outlined"
            value={values.confirmedPassword}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="button mt-4 text-white bg-sky-600">
          Register
        </button>
        <p className="text-lg mt-3">
          Already have an account?{" "}
          <Link className="text-sky-600" to="/login">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
