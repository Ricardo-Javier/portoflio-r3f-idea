import { React, Suspense, useRef} from 'react'
import './index.scss'
import {Environment} from '../Environment/Environment'
import { useControl } from 'react-three-gui'
import { Canvas, useFrame, useThree, useLoader} from "@react-three/fiber";
import { Text, TrackballControls, PerspectiveCamera, Html, Sparkles } from '@react-three/drei'
import { animated, useSpring } from '@react-spring/three'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three'





const About = () => {  

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
        {/* <OrbitControls /> */}
        {/* <TorusKnot   /> */}
        <Environment preset={preset} background={background} />
      </Suspense>
    )
  }


  const Energy = () => {
    const gltf = useLoader(GLTFLoader, "./energy_sphere/scene.gltf");
    const ref = useRef()
    useFrame(() => {
      ref.current.rotation.y = ref.current.rotation.x  += -0.003
      
      ref.current.rotation.z = Math.PI /-3.5 ;
    })
    return (
      <>    
      <mesh>
        <primitive ref={ref}  position={[0, -10, -4]} object={gltf.scene} scale={4}  />  
        </mesh>
      </>
    );
  };





const AnimatedText = animated(Text)


function HtmlText() {
  const { width } = useThree((state) => state.viewport)
  const spring = useSpring({
    from: { scale: [0, 0, 0], position: [0,-6,0] },
    to: { scale: [5, 5, 5], position: [0,0,0]  },
    config: {
      friction: 1000,
    },
    delay: 2000,
  })
  return <AnimatedText fontSize={width / 41} color={'#79d4f9'} font='./Michroma-Regular.ttf'  {...spring}>HTML5</AnimatedText>
}

function CssText() {
  const { width } = useThree((state) => state.viewport)
  const spring = useSpring({
    from: { scale: [0, 0, 0], position: [0,-6,0] },
    to: { scale: [5, 5, 5], position: [4,3,1]  },
    config: {
      friction: 1000,
    },
    delay: 3000,
  })
  return <AnimatedText fontSize={width / 47} font='./Michroma-Regular.ttf' {...spring}>CSS</AnimatedText>
}


function ReactText() {
  const { width } = useThree((state) => state.viewport)
  const spring = useSpring({
    from: { scale: [0, 0, 0], position: [0,-6,0] },
    to: { scale: [5, 5, 5], position: [-3,-3,-1]  },
    config: {
      friction: 1000,
    },
    delay: 4000,
  })
  return <AnimatedText fontSize={width / 42}  font='./Michroma-Regular.ttf' {...spring}>REACT</AnimatedText>
}


function LottieText() {
  const { width } = useThree((state) => state.viewport)
  const spring = useSpring({
    from: { scale: [0, 0, 0], position: [0,-6,0] },
    to: { scale: [5, 5, 5], position: [5,-5,-2]  },
    config: {
      friction: 1000,
    },
    delay: 5000,
  })
  return <AnimatedText fontSize={width / 50} color={'#AE6BDA'} font='./Michroma-Regular.ttf' {...spring}>LOTTIE</AnimatedText>
}


function THREEText() {
  const { width } = useThree((state) => state.viewport)
  const spring = useSpring({
    from: { scale: [0, 0, 0], position: [0,-6,0] },
    to: { scale: [5, 5, 5], position: [-2,5,1]  },
    config: {
      friction: 1000,
    },
    delay: 6000,
  })
  return <AnimatedText fontSize={width / 45} color={'#AE6BDA'} font='./Michroma-Regular.ttf' {...spring}>THREE.JS</AnimatedText>
}


function TitleText() {
  const { width } = useThree((state) => state.viewport)
  const spring = useSpring({
    from: { scale: [0, 0, 0], position:[0,5,2] },
    to: { scale: [3, 3, 3], position:[0,5,2]  },
    config: {
      friction: 2000,
    },
    delay: 2000,
  })
  return <AnimatedText fontSize={width / 20} position={[0,5,2]} color={'white'} font='./Michroma-Regular.ttf' {...spring} >SKILLS</AnimatedText>
}

function Rig({ v = new THREE.Vector3() }) {
  return useFrame((state) => {
    state.camera.position.lerp(v.set(state.mouse.x / 5, state.mouse.y / 5, 10), 0.05)
  })
};



 
return (
    <>
    <Canvas dpr={[1, 2]} camera={{position:[0,0,10]}} >
    <Suspense fallback={null}>
      <Rig/>
    <Energy/>
    <TitleText />
          <HtmlText/>
          <CssText/>
          <ReactText/>
          <LottieText/>
          <THREEText/>
    <TrackballControls />
    </Suspense>
    <Scene/>
    </Canvas>
    </>
  )
}

export default About