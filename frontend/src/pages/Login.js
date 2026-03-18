import { useState } from 'react';
import { loginUser } from "../services/authApi";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Login successful");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <div className='min-h-[80vh] flex items-center justify-center p-4'>
      <div className='glass-card w-full max-w-md p-10 animate-fade-in'>
        <div className="text-center mb-10">
          <h2 className='text-4xl font-black mb-2 bg-gradient-to-r from-plum via-chocolate to-tan bg-clip-text text-transparent'>
            Welcome Back
          </h2>
          <p className="text-slate-500 font-medium">Log in to your account to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
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
            Sign In
          </button>
        </form>

        <div className='mt-8 pt-8 border-t border-slate-200/50 text-center'>
          <p className="text-slate-600 font-medium">
            Don't have an account? <Link to="/signup" className="text-indigo-600 hover:underline font-bold">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
