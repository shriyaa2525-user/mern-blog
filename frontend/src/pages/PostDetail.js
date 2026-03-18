import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
                setPost(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchPost();
    }, [id]);

    if (!post) return <p>Loading...</p>

  return (
    <article className='max-w-4xl mx-auto'>
      <header className="mb-12 animate-fade-in">
        {post.image && (
          <div className="w-full aspect-[21/9] rounded-3xl overflow-hidden mb-10 shadow-2xl">
            <img
              src={`http://localhost:5000/uploads/${post.image}`}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <h1 className="text-5xl font-black mb-6 leading-tight">{post.title}</h1>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-lg font-bold text-indigo-600 capitalize">
            {post.author?.username?.charAt(0) || "A"}
          </div>
          <div>
            <p className="font-bold text-slate-800">{post.author?.username || "Anonymous Author"}</p>
            <p className="text-sm text-slate-500 font-medium">{new Date(post.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
          </div>
        </div>
      </header>

      <div className="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        {post.content.split('\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </article>
  )
}

export default PostDetail;