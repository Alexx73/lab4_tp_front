import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

import Nav from './components/Nav'
import Footer from './components/Footer'

import Reservas from './pages/Reservas'
import VerReservas from './pages/VerReservas'
import 'flowbite';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
          <div className="container-lg mx auto" >
  
        <Nav/>

        {/* <Reservas/> */}

        {/* <VerReservas/> */}

      
        <Footer/>
        </div>
       




    </>
  )
}

export default App
