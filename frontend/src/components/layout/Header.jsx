import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { GiShoppingBag } from "react-icons/gi";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import { useSearch } from "../../context/searchContext";

const Header = () => {
  const { auth, handleLogout } = useAuth();
  
  const {values, setValues} = useSearch();


const handleSubmmit= (e)=>{
    e.preventDefault

  }
  return (
    <header className="bg-base-200  shadow sticky top-0  z-50">
      <div className="navbar bg-base-100 ">
        <div className="flex-1">
          <NavLink to={"/"} className="btn btn-ghost text-xl">
            <GiShoppingBag /> d-trade
          </NavLink>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <form action="" onSubmit={handleSubmmit}  >

            </form>
            <input
              type="text"
              placeholder="Search"
              value={values}
              onChange={(e) => setValues({...values,keyworads:e.target.value})}

              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
              

            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              {!auth?.user?.name ? (
                <>
                  <li>
                    <NavLink to="/register">Register</NavLink>
                  </li>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to={`/dashboard/${
                        auth?.user?.role === "admin" ? "admin" : "user"
                      }`}
                    >
                      {auth?.user?.role === "admin" ? (
                        <NavLink to="/dashboard/admin">Admin Panel</NavLink>
                      ) : (
                        <NavLink to="/dashboard/user">User </NavLink>
                      )}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink onClick={handleLogout} to="">
                      Logout
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
