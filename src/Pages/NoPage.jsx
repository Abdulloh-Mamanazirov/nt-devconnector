import React from 'react'
import Navbar from '../Components/Navbar'
import ProfileNavbar from '../Components/ProfileNavbar'

const NoPage = () => {

    let token = localStorage.getItem("token")
    
  return (
    <>
      {token ? <ProfileNavbar /> : <Navbar />}
      <div className="w-2/3 mx-auto mt-10">
        <h1 className="text-6xl font-bold text-sky-600">
          <i className="fa-solid fa-warning"></i>Page Not Found
        </h1>
        <p className='pt-5 text-4xl font-semibold'>Sorry, this page does not exist</p>
      </div>
    </>
  );
}

export default NoPage
