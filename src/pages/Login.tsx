// pages/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../types/hooks";
import { login } from "../slices/authSlice";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mock authentication: anyone can log in
    if (username && password) {
      dispatch(login({ username }));
     toast.success(`Welcome, ${username}!`, {
  duration: 100, // 100 milliseconds
});
      navigate("/"); // redirect to home
    } else {
      toast.error("Please enter a username and password!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Toaster position="top-right" />
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          Login
        </h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
        />
        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold"
        >
          Login
        </button>
      </form>
    </div>
  );
}
