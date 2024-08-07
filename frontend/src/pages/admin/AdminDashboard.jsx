import React from 'react'
import AdminSideBar from './AdminSideBar'
import { useAuth } from '../../context/auth'

function AdminDashboard() {
  const { auth } = useAuth()
  return (
    <div>
      <div className="flex flex-row gap-4">
        <div className=" flex-1 text-center " style={{width: "100%"}}>
          <AdminSideBar/>
        </div>
        <div className=" text-center text-base-100 border-solid border-y border-black" style={{width: "100%"}}>
          <h1 className='text-lg '>Admin Panel</h1>
          <h3>Name: {auth?.user?.name}</h3>
          <h3>Email: {auth?.user?.email}</h3>
        </div>
        

      </div>
    </div>
  )
}

export default AdminDashboard