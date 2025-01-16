import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/App.css'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Main from './pages/MainPage'

function App() {

  const [IsLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="App">
      <Header IsLoggedIn={IsLoggedIn} />
        <Main />
      <Footer />
    </div>
  )
}

export default App;