import {React, Suspense, useRef } from "react";
import * as THREE from 'three'
import './index.scss'
import { Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";
import { useSpring, animated } from '@react-spring/three'
import { OrbitControls, Sparkles, Text} from "@react-three/drei";
import {Environment} from '../Environment/Environment'
import { useControl } from 'react-three-gui'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";







// ASTRONAUT MODEL
// ----------------------------

const Astronaut = () => {
  const gltf = useLoader(GLTFLoader, "./glass9/scene.gltf");
  const ref = useRef()
  const spring = useSpring({
    from: {  position:[-3,-30,-1] },
    to: {  position:[-3,-2,-1]  },
    config: {
      friction: 1500,
    },
    delay: 1000,
  })
  useFrame(() => {

    ref.current.rotation.z  += -0.00059    
    ref.current.rotation.y = Math.PI /20 ;
    ref.current.rotation.x = Math.PI /-8 ;

  })
  return (
    <>    
    <animated.mesh {...spring}>
      <primitive ref={ref}   object={gltf.scene} scale={2}  />  
      </animated.mesh>
    </>
  );
};


// SPACE SCENE
// ----------------------------
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
      <Environment preset={preset} background={background} />
    </Suspense>
  )
};

// ----------------------------




// SHINING STARS BG
// ----------------------------
function Sparkless() {
  const ref = useRef()
  useFrame(() => {
    ref.current.rotation.y = ref.current.rotation.x += -0.0002
  })
  return (
    <>
    <Sparkles ref={ref}  count={10000} scale={ 4000} color={'white'} size={300} position={[1,0.5,80]}/>
    </>
  )
};
// ----------------------------



// MAIN TEXT
// ----------------------------
const AnimatedText = animated(Text)
function Caption({ children }) {
  const { width } = useThree((state) => state.viewport)
  const spring = useSpring({
    from: { scale: [2, 2, 2], position:[0,5,2] },
    to: { scale: [1, 1, 1], position:[0,5,2]  },
    config: {
      friction: 300,
    },
    delay: 1000,
  })
  const ref = useRef()
  return (
    <AnimatedText
    ref={ref}
    {...spring}
    color={'white'}
      position={[0, 0, -5]}
      lineHeight={1.4}
      font="/Michroma-Regular.ttf"
      fontSize={width / 7}
      material-toneMapped={false}
      anchorX="center"
      anchorY="middle">
      {`
      HEY
      I'M RICARDO
      A <beginner/> 
      FRONT-END DEVELOPER
      `}
    </AnimatedText>
  )
};

// ----------------------------



// MOUSE & CAMERA MOVEMENT
// ----------------------------
// function Rig({ v = new THREE.Vector3() }) {
//   return useFrame((state) => {
//     state.camera.position.lerp(v.set(state.mouse.x / 5, state.mouse.y / 5, 10), 0.05)
//   })
// };

// ----------------------------




// FINAL RENDER/COMPONENT
// ----------------------------
const MainRender = () => {
  return (    
  <div className="logo-container">
  <Canvas performance={{ max: 0.5 }} dpr={[1, 2]}>
  <Suspense fallback={null}>
  {/* <Rig/>  */}
    <ambientLight/>
    <pointLight color ='blue' position={[-10, 0, 4]} />
    <pointLight color ='white' position={[5, -1, 7]} />
    <pointLight color ='blue' position={[0, 0, 8]} />
    <pointLight color ='blue' position={[-5, 1, 9]} />
   <pointLight color ='blue' position={[5, 3, 2]} />
   <pointLight color ='blue' position={[0, 0, -70]} />
    <pointLight color ='white' position={[-5, 20, -70]} />
   <pointLight color ='white' position={[5, -10, -80]} />  
    <Scene/>
    <Sparkless/>
    <Astronaut />
    {/* <Energy/> */}
    <Caption/>   
    </Suspense>       
  </Canvas>
  </div>  
  )
};

// ----------------------------

export default MainRender