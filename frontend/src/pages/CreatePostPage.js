// CreatePostPage.js
import React, { useState } from 'react';
import CreatePost from '../components/CreatePost';
import { createPost as apiCreatePost } from "../services/api";
import { useNavigate } from "react-router-dom";

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    content: ""
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    if (image) formData.append("image", image);

    try {
      await apiCreatePost(formData);
      navigate("/");
    } catch (error) {
      console.error("Failed to create post:", error);
      alert("Error creating post. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="glass-card p-8 md:p-12 animate-fade-in">
        <header className="mb-10">
          <h2 className="text-4xl font-black mb-2 bg-gradient-to-r from-plum via-chocolate to-tan bg-clip-text text-transparent">
            Create a New Story
          </h2>
          <p className="text-slate-500 font-medium">Share your thoughts with the world</p>
        </header>

        <CreatePost
          title={form.title}
          content={form.content}
          image={image}
          preview={preview}
          handleChange={handleChange}
          handleImageChange={handleImageChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CreatePostPage;