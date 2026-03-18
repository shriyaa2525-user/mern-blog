import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 animate-fade-in max-w-6xl">
        <Outlet />
      </main>
      <footer className="py-8 text-center text-slate-500 text-sm border-t border-white/20 mt-auto">
        &copy; {new Date().getFullYear()} MERN Blog. Crafted with ✨
      </footer>
    </div>
  );
};

export default Layout;
