import React from 'react'
import { Link } from 'react-router-dom'
import './footer.module.css'
function Footer() {
  return (
<footer className="footer footer-center bg-base-300 text-base-content p-4">
  <aside>
    <p>Copyright © {new Date().getFullYear()} - All right reserved by d-trade Ltd</p>
    <div className='flex items-center gap-3'>
      <Link to={'/about'}  >About</Link>
      <Link to={'/contact'} >Contact</Link>
      <Link to={'/policy'}>Policy</Link>
    </div>
  </aside>
</footer>
  )
}

export default Footer