import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Forgot(props) {
  const [forgotForm, setForgotForm] = useState({
    email: "",
  });

  const onChangeForm = (label, event) => {
    setForgotForm({ ...forgotForm, [label]: event.target.value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/auth/forgot-password", forgotForm);
      toast.success(response.data.message);
      // Handle success - show message or redirect as needed
    } catch (error) {
      toast.error("Failed to send password reset email.");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white w-full max-w-md px-8 py-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="block w-full px-4 py-3 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              value={forgotForm.email}
              onChange={(event) => onChangeForm("email", event)}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Send Reset Email
          </button>
        </form>
      </div>
    </div>
  );
}
