import { useEffect,useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

import Home from "./components/Home";
import Detailsresto from "./components/Detailsresto";
import Panier from "./components/Panier";
import About from "./components/About";

import Footer from "./components/Footer";
import Detailresto from './components/Detailsresto';

  function App() {
 


  return (
  <Router>
          <div className="app-container"> {/* <-- ici */}

     <Navbar/>
         <div className='main-content'>
    <Routes>
      
    <Route path="/details/:id" element={<Detailsresto />}/>

      <Route path="/" element={<Home />} />
            <Route path="/panier" element={<Panier />} />

            <Route path="/about" element={<About />} />



    </Routes>
         </div>
    </div>
    <Footer/>
    </Router>
  )
}

export default App
