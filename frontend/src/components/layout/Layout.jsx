import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout({children}) {
  return (
    <div className=' bg-slate-200 flex flex-col min-h-screen'>
        <Header/>

        <main className=' p-3 ' >
        <ToastContainer/>
          {children}
        </main>
        <Footer/>

    </div>
  )
}

export default Layout