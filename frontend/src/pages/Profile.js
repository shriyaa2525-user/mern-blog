import React from 'react';
import { Link } from "react-router-dom";

const Profile = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
      <div className='max-w-2xl mx-auto py-12'>
      <div className='glass-card p-12 text-center animate-fade-in'>
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 mx-auto mb-6 flex items-center justify-center text-3xl font-bold text-white shadow-xl">
          {user?.username?.charAt(0).toUpperCase() || "U"}
        </div>
        
        <h1 className="text-3xl font-black mb-2">{user?.username}</h1>
        <p className="text-slate-500 font-medium mb-10">{user?.email}</p>

        <div className="grid grid-cols-1 gap-4">
          <Link to="/my-posts">
            <button className='btn-primary w-full py-4 text-lg font-bold'>
              Manage My Articles
            </button>
          </Link>
          
          <Link to="/create">
            <button className='btn-secondary w-full py-4 text-lg font-bold'>
              Write New Story
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
