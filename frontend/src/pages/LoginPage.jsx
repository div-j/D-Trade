import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HelmetWrapper from '../seo/HelmetWrapper';
import { useAuth } from '../context/auth';
import Spinner from '../components/Spinner';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

   // Use optional chaining to safely access the original path
   const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      if (!loading && !error) {
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-page mx-32">
      <HelmetWrapper
        title="Login"
        description="Login to d-trade to access the best deals on electronics and electrical products."
        keywords="login, d-trade, electronics, electrical products, gadgets"
      />
      <section className=" mx-auto  items-center shadow-xl justify-center ">
        <div className="card lg:card-side  p-10   flex flex-col lg:flex-row">
          <div className='max-w-1/2 h-72 mt-4'>

          <figure className="h-full w-full object-cover">
            <img
              src="/d-trade1.jpg"  // Replace with your actual image path
              alt="Login"
              className="object-cover w-full h-full"
              />
          </figure>
              </div>
          <div className="card-body lg:w-1/2 p-6 shadow-slate-500">
            <h2 className="card-title text-2xl font-bold mb-4 text-base-100">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered w-full bg-gray-500 text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full bg-gray-500 text-white"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary bg-base-100 text-white w-full" disabled={loading}>
                {loading ? <Spinner />  : 'Login'}
              </button>
              {error && <p className="bg-red-500 text-center text-white mt-4 p-3 rounded">{error}</p>}
            </form>

            <Link to="/forgot-password" className="text-base-100 text-sm mt-4 underline text-center font-bold hover:text-blue-500">forgot password</Link>
           
<p className="text-base-100 text-center text-lg font-bold ">Or</p>
            {            // eslint-disable-next-line react/no-unescaped-entities
}            <p className="text-base-100 text-center text-lg font-bold ">Don't have an account? <br />
              <Link to="/register" className="text-base-100 underline text-sm font-bold hover:text-blue-500">Register here</Link>
              </p>
          </div>

        </div>

      </section>
      
    </div>
  );
};

export default LoginPage;
