
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/SignUp'
import GoogleLinkSuccess from './hooks/GoogleLinkSuccess'
import { useState } from 'react'
import FetchButton from './components/Button/FetchButton'

function App() {

  const [isLinked, setIsLinked] = useState(false);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home isLinked={isLinked} setIsLinked={setIsLinked} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/google-link-success"
          element={<GoogleLinkSuccess setIsLinked={setIsLinked} />}
        />
      </Routes>
    </Router>
  )
}

export default App
