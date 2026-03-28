import { Routes, Route, Router } from 'react-router-dom'
import Layout from './components/Layout'
import Orders from './pages/Orders'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import './App.css'

function App() {

  return (
    <>
      <Layout>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/analytics' element={<Analytics />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
