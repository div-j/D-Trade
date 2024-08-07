import React from 'react'
import { NavLink } from 'react-router-dom'

function Dashboard() {
  return (
    <div >
        <ul className='menu bg-base-200 rounded-box md:w-80 w-56'>
          <li>
            <NavLink to="/dashboard/user/profile">User Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/user/orders">Create Category</NavLink>
          </li>
     
        </ul>
    </div>
  )
}

export default Dashboard