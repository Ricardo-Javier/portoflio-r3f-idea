import {React, Suspense, useRef, useEffect}  from "react";
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Layout from './components/layout'
import './App.scss'
import { OrbitControls, Sparkles, Text, useCursor, GradientTexture, MeshDistortMaterial} from "@react-three/drei";




function App() {
   return (
    <>
   

      <Routes>
        
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
 
      </>
  )
}

export default App