import { useEffect, useState } from "react";
import { getPosts, deletePost } from "../services/api";
import PostList from "../components/PostList";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  const [state, setState] = useState({
    posts: []
  });

  const fetchPosts = async () => {
    const res = await getPosts();

    setState(prev => ({
      ...prev,
      posts: res.data
    }));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchPosts();
  }, [navigate]);

  const handleDeletePost = async (id) => {
    console.log("Deleting ID:", id);
    await deletePost(id);
    fetchPosts();
  };

const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="space-y-12">
      <header className="animate-fade-in text-center py-10">
        <h2 className="text-5xl font-black mb-4">
          Hello, <span className="bg-gradient-to-r from-plum via-chocolate to-tan bg-clip-text text-transparent">{user?.username}</span> 👋
        </h2>
        <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
          Explore the latest stories, ideas, and expertise from writers in our community.
        </p>
      </header>

      <div className="border-t border-slate-200/50 pt-12">
        <PostList
          posts={state.posts}
          deletePost={handleDeletePost}
          fetchPosts={fetchPosts}
        />
      </div>
    </div>
  );
}

export default Home;