import {useState} from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'

function Layout({children}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="layout">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="main-content relative">
        <Sidebar isOpen={sidebarOpen} />
        <main className="content p-4">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default Layout