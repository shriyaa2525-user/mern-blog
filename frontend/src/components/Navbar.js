import React from 'react'
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }

  return (
    <nav className='glass-nav px-6 py-4'>
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="group">
          <h1 className='text-2xl font-black bg-gradient-to-r from-plum via-chocolate to-tan bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300'>
            MERN Blog
          </h1>
        </Link>

        <div className='flex items-center gap-6'>
          <Link to="/profile" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">
            Profile
          </Link>

          <Link to="/create">
            <button className='btn-primary px-5 py-2 text-sm font-semibold'>
              Create Post
            </button>
          </Link>

          <button 
            onClick={handleLogout} 
            className='text-slate-500 hover:text-red-500 text-sm font-medium transition-colors border-l pl-6 border-slate-200'
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar