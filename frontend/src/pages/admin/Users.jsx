import React from 'react'
import AdminSideBar from './AdminSideBar'

function Users() {
  return (
    <div>
      <div className="flex flex-row gap-4">
        <div className=" flex-1 text-center " style={{width: "100%"}}>
          <AdminSideBar/>
        </div>
        <div className=" text-center text-base-100 border-solid border-y border-black " style={{width: "100%"}}>
          
      <h1>Manage User </h1>
        </div>
        

      </div>
    </div>
  )
}

export default Users