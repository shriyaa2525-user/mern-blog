import React, { useEffect, useState } from 'react';
import { getUserPosts, deletePost } from "../services/api";
import { Link } from "react-router-dom";

const MyPosts = () => {

    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const res = await getUserPosts();
        setPosts(res.data);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
            return;
        }
        fetchPosts()
    }, []);

    const handleDelete = async (id) => {
        await deletePost(id);
        fetchPosts();
    }

  return (
    <div className='space-y-10 py-6'>
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black mb-2">My Stories</h1>
          <p className="text-slate-500 font-medium">Manage and edit your published articles</p>
        </div>
        <Link to="/create">
          <button className="btn-primary">New Story</button>
        </Link>
      </header>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post._id} className='glass-card overflow-hidden group flex flex-col'>
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-slate-600 text-sm line-clamp-3">{post.content}</p>
              </div>

              <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex gap-3">
                <Link to={`/edit-post/${post._id}`} className="flex-grow">
                  <button className="w-full py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-all">
                    Edit
                  </button>
                </Link>
                <button 
                  onClick={() => handleDelete(post._id)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card p-20 text-center animate-fade-in">
          <span className="text-6xl mb-6 block">📭</span>
          <h3 className="text-2xl font-bold mb-2">No stories yet</h3>
          <p className="text-slate-500 mb-8">Ready to share your thoughts with the world?</p>
          <Link to="/create">
            <button className="btn-primary">Write your first story</button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default MyPosts