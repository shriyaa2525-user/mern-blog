import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { updatePost, getSinglePost } from "../services/api"

const EditPost = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        content: ""
    });

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await getSinglePost(id);

                setForm({
                    title: res.data.title,
                    content: res.data.content
                });
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };

        fetchPost();
    }, [id]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updatePost(id, form);
        navigate("/my-posts");
    }

  return (
    <div className='max-w-3xl mx-auto py-12'>
      <div className='glass-card p-10 animate-fade-in'>
        <h1 className="text-4xl font-black mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Edit Story
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Article Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className='input-field text-xl font-bold'
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Post Content</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Content"
              className='input-field min-h-[300px] resize-none leading-relaxed'
              required
            />
          </div>

          <div className="pt-4">
            <button type="submit" className="btn-primary w-full py-4 text-lg font-bold">
              Save Changes
            </button>
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              className="mt-4 w-full text-slate-500 font-bold hover:text-slate-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditPost