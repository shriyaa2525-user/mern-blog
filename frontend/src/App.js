import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreatePostPage from "./pages/CreatePostPage";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";
import MyPosts from "./pages/MyPosts";
import EditPost from "./pages/EditPost";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/create" element={<CreatePostPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-posts" element={<MyPosts />} />
          <Route path="/edit-post/:id" element={<EditPost />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;