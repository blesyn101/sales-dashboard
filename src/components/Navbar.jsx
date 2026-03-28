import {Menu, X} from 'lucide-react'
import '../styles/Navbar.css'
function Navbar({onMenuClick}) {
  return (
     <nav className="navbar ">
      <div className="navbar-content flex justify-between p-4 bg-white shadow">
   
          <button className="p-2 text-xl font-bold " onClick={onMenuClick} aria-label="Toggle menu"> <Menu size={24} /> </button>
          <div className="navbar-brand text-2xl font-bold"><h1>Dashboard</h1></div>
        
          <div className="user-profile">
            <div className="avatar bg-gray-300 w-10 h-10 rounded-full"></div>    
        </div>

      </div>
    </nav>
  )
}

export default Navbar