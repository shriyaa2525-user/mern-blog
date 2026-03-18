import { useState } from 'react';
import { signupUser } from "../services/authApi";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async(e) => {
    e.preventDefault();

    try {
      await signupUser(form);
      alert("Signup successful");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Signup failed");
    }
  };


  return (
    <div className='min-h-[80vh] flex items-center justify-center p-4'>
      <div className='glass-card w-full max-w-md p-10 animate-fade-in'>
        <div className="text-center mb-10">
          <h2 className='text-4xl font-black mb-2 bg-gradient-to-r from-plum via-chocolate to-tan bg-clip-text text-transparent'>
            Create Account
          </h2>
          <p className="text-slate-500 font-medium">Join our community of writers today</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Your unique handle"
              className="input-field"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              className="input-field"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="input-field"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className='btn-primary w-full py-4 text-lg font-bold mt-4'>
            Get Started
          </button>
        </form>

        <div className='mt-8 pt-8 border-t border-slate-200/50 text-center'>
          <p className="text-slate-600 font-medium">
            Already have an account? <Link to="/login" className="text-indigo-600 hover:underline font-bold">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup