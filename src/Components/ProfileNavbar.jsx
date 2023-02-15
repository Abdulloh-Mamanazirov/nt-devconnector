import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProfileNavbar() {
  const navigate = useNavigate()

  function handleLogOut(){
    localStorage.removeItem("token")
    toast("Logged Out", {type:"info"})
    navigate('/')
  }
  
  return (
    <div className="sticky top-0 z-50 opacity-90 bg-slate-800 text-white border-b-2 border-cyan-500">
      <nav className="container w-11/12 mx-auto py-6 flex items-center justify-between">
        <Link to="/" className="text-3xl font-bold hover:text-sky-500">
          {"</>"}DevConnector
        </Link>
        <div className="flex gap-10 text-xl font-bolder">
          <Link to="/profiles" className="hover:text-sky-300">
            Developers
          </Link>
          <Link to="/posts" className="hover:text-sky-300">
            Posts
          </Link>
          <Link to="/dashboard" className="hover:text-sky-300">
            <i className="fa-solid fa-user"></i> Dashboard
          </Link>
          <button onClick={handleLogOut} className=" hover:text-sky-300">
            <i className="fa-solid fa-right-from-bracket"></i> Log Out
          </button>
        </div>
      </nav>
    </div>
  );
}

export default ProfileNavbar;
