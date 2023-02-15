import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Landing = () => {

  const navigate = useNavigate()

  useEffect(()=>{
    let token = localStorage.getItem("token")
    if(token) navigate('/dashboard')
  },[])
  
  return (
    <div className="landingPage min-h-screen">
      <div className="blackCover">
        <Navbar />
        <div className="absolute inset-0 grid place-items-center">
            <Box className="text-white flex flex-col items-center justify-between">
              <h1 className="text-7xl font-semibold ">Developer Connector</h1>
              <p className="text-2xl py-7">
                Create a developer profile/portfolio, share posts and get help from
                other developers
              </p>
              <div className="flex gap-3">
                <Link className="button bg-sky-600" to="register">
                  Sign Up
                </Link>
                <Link className="button bg-gray-200 text-black" to="login">
                  Log In
                </Link>
              </div>
            </Box>
        </div>
      </div>
    </div>
  );
};

export default Landing;
