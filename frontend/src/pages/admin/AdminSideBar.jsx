import React from 'react'
import {  NavLink } from 'react-router-dom'

function AdminSideBar() {
  return (
        <ul className='menu bg-base-200 rounded-box md:w-80 w-56'>
          <li>
            <NavLink to="/dashboard/admin">Admin Panel</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/admin/create-category">Create Category</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/admin/create-product">Create Product</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/admin/users">Users</NavLink>
          </li>
        </ul>
  )
}

export default AdminSideBar