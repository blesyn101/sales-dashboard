import { useLocation, Link } from "react-router-dom"
import {BarChart3, Home, ShoppingCart, Calendar, Settings} from 'lucide-react'
import '../styles/Sidebar.css'

function Sidebar({isOpen}) {
    const location = useLocation();

    const menuItems = [
        {path: '/', label: 'Dashboard', icon: <Home />},
        {path: '/orders', label: 'Orders', icon: <ShoppingCart />},
        {path: '/analytics', label: 'Analytics', icon: <BarChart3 />},
        {path: '/calendar', label: 'Calendar', icon: <Calendar />},
        {path: '/settings', label: 'Settings', icon: <Settings />}
    ]
  return (
    
<aside className={`fixed lg:absolute bg-blue-500 shadow w-64 h-screen sidebar left-0 z-40 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-64'}`}>            <nav className="p-4 space-y-2 sidebar-nav">
                {menuItems.map(items => (
                    <Link to ={items.path} key={items.path} className={`flex items-center p-2 nav-link sidebar-link ${location.pathname === items.path ? 'active' : ''}`}>
                        <div className="sidebar-icon">{items.icon}</div>
                        <span className="sidebar-label">{items.label}</span>
                    </Link>
                ))}
            </nav>
        </aside>

  )
}

export default Sidebar