import React, { useState } from "react";
import HelmetWrapper from "../seo/HelmetWrapper";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // prevent multiple submissions
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/register`,
        {
          name,
          email,
          password,
          phone,
          address,
        }
      );

      if (res.status === 201) {
        toast.success(res.data.message);
        setIsSubmitting(false);
        navigate("/login");
      } else {
        toast.error(res.data.message);
        console.log("Something went wrong");
        setError(res.data.message);
        setIsSubmitting(false);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setError(error.response?.data?.message || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col mx-32 shadow-xl py-2 px-12 text-base-100 md:flex-row items-center ">
      {/* Left Section: Content and Images */}
      <div className="lg:w-1/2  w-fit  flex items-center justify-center">
        <div className="text-center">
       
          <div className=" ">
            <img
              src="/d-trade1.jpg" // Replace with your actual image path
              alt="Welcome"
              className="w-fit  h-auto mt-4"
            />
          </div>
        </div>
      </div>

      {/* Right Section: Register Form */}
      <div className="lg:w-1/2  w-full px-2 flex items-center justify-center">
        <div className="w-full max-w-md">
          <HelmetWrapper
            title="Register"
            description="Create a new account on d-trade to start shopping for electronics and gadgets."
            keywords="register, d-trade, create account, electronics"
          />
          <h2 className="text-2xl font-bold mb- text-center ">Register</h2>
          <form
            className="space-y-3  px-5 rounded-lg text-gray-400 "
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full px-3 bg-gray-500 text-white  py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-gray-500 text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-gray-500 text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-500 text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border bg-gray-500 text-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSubmitting ? "Submitting..." : "Register"}
            </button>
            {error && (
              <p className="error my-4 p-2 rounded text-white bg-red-500 w-full text-center">
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
