import React from "react";
import { useEffect, useState, Suspense } from 'react'
import Loader from 'react-loaders'
import { useRef } from 'react'
import emailjs from '@emailjs/browser'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'
import {Environment} from '../Environment/Environment'
import { useControl } from 'react-three-gui'
import { Canvas, useFrame, useLoader} from "@react-three/fiber";
import { OrbitControls} from "@react-three/drei";
import { Html } from "@react-three/drei"
import * as THREE from 'three'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const form = useRef()

  useEffect(() => {
    setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
  }, [])

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
      .sendForm(
        'gmail',
        'template_YeJhZkgb',
        form.current,
        'your-token'
      )
      .then(
        () => {
          alert('Message successfully sent!')
          window.location.reload(false)
        },
        () => {
          alert('Failed to send the message, please try again')
        }
      )
  }

  function Scene() {  
    const preset = useControl('Preset', {
      type: 'select',
      items: ['milkyway', 'pisa', 'bridge2', 'angus'],
    })
    const background = useControl('Background', {
      type: 'boolean',
      value: true,
    })
    return (
      <Suspense fallback={null}>
        <OrbitControls />
        {/* <TorusKnot   /> */}
        <Environment preset={preset} background={background} />
      </Suspense>
    )
  }

  function Rig({ v = new THREE.Vector3() }) {
    return useFrame((state) => {
      state.camera.position.lerp(v.set(state.mouse.x / 5, state.mouse.y / 5, 5), 0.05)
    })
  };

  const Astronaut = () => {
    const gltf = useLoader(GLTFLoader, "./glass9/scene.gltf");
    const ref = useRef()
    useFrame(() => {
      ref.current.rotation.y = ref.current.rotation.x  += -0.00059
      
      ref.current.rotation.z = Math.PI /-3.5 ;
    })
    return (
      <>    
      <mesh>
        <primitive ref={ref}  position={[-5, -5, -5]} object={gltf.scene} scale={4}  />  
        </mesh>
      </>
    );
  };

  return (
    <>
     <Canvas>
    <Scene/>
    <Rig/>
    <Suspense fallback={null}>
    
    <ambientLight/>
    <pointLight color ='blue' position={[-10, 0, 4]} />
    <pointLight color ='white' position={[5, -1, 7]} />
    <pointLight color ='blue' position={[0, 0, 8]} />
    <pointLight color ='blue' position={[-5, 1, 9]} />
   <pointLight color ='blue' position={[5, 3, 2]} />
   <pointLight color ='blue' position={[0, 0, -70]} />
    <pointLight color ='white' position={[-5, 20, -70]} />
   <pointLight color ='white' position={[5, -10, -80]} />
   <Astronaut/>
   </Suspense>

    <Html position={[-10,20,-30]}> 
      <div className="container contact-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'm', 'e']}
              idx={15}
            />
          </h1>
          <p>
            If you are looking to add a Junior Front-End Developer to your team, send me a message. 
            <br/>I'm open to learn everything with passion and hard-working. 
            <br/>Looking forward to work with you!
          </p>
          <div className="contact-form">
            <form ref={form} onSubmit={sendEmail}>
              <ul>
                <li className="half">
                  <input placeholder="Name" type="text" name="name" required />
                </li>
                <li className="half">
                  <input
                    placeholder="Email"
                    type="email"
                    name="email"
                    required
                  />
                </li>
                <li>
                  <input
                    placeholder="Subject"
                    type="text"
                    name="subject"
                    required
                  />
                </li>
                <li>
                  <textarea
                    placeholder="Message"
                    name="message"
                    required
                  ></textarea>
                </li>
                <li>
                  <input type="submit" className="flat-button" value="SEND" />
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
      </Html>
     
      </Canvas>
    </>
  )
}

export default Contact