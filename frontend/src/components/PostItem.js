import React from "react";
import { Link } from "react-router-dom";

const PostItem = ({ post }) => {
  return (
    <div className="glass-card overflow-hidden group hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
      <Link to={`/post/${post._id}`} className="block overflow-hidden relative aspect-video">
        {post.image ? (
          <img
            src={`http://localhost:5000/uploads/${post.image}`}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-olive/20 to-tan/20 flex items-center justify-center">
            <span className="text-4xl">📝</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-chocolate/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white text-sm font-bold">Read Article →</span>
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-grow">
        <Link to={`/post/${post._id}`}>
          <h3 className="text-xl font-bold mb-3 group-hover:text-plum transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>

        <p className="text-slate-600 text-sm line-clamp-3 mb-6 flex-grow">
          {post.content}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-plum/10 flex items-center justify-center text-xs font-bold text-plum capitalize">
              {post.author?.username?.charAt(0) || "A"}
            </div>
            <span className="text-xs font-bold text-slate-700">
              {post.author?.username || "Anonymous"}
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostItem;