// CreatePost.js
import React from 'react';

const CreatePost = ({ title, content, preview, handleChange, handleImageChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 ml-1">Article Title</label>
        <input 
          name="title"
          placeholder="Give your story a catchy title"
          value={title}
          onChange={handleChange}
          className="input-field text-lg font-bold"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 ml-1">Featured Image</label>
        <div className="flex flex-col gap-4">
          <input 
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-plum/5 file:text-plum hover:file:bg-plum/10 transition-all cursor-pointer"
          />
          {preview && (
            <div className="w-full aspect-video rounded-2xl overflow-hidden border border-slate-200">
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 ml-1">Your Story</label>
        <textarea
          name="content"
          placeholder="Tell your story..."
          value={content}
          onChange={handleChange}
          className="input-field min-h-[300px] resize-none leading-relaxed"
          required
        />
      </div>

      <div className="pt-4">
        <button type="submit" className="btn-primary w-full py-4 text-lg font-bold shadow-lg shadow-plum/10">
          Publish Story
        </button>
      </div>
    </form>
  );
};

export default CreatePost;