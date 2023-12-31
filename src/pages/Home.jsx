import { Suspense, useEffect, useRef, useState } from "react";
import {Canvas} from '@react-three/fiber';
import Loader from '../components/loader';
import Laptop from '../models/laptop';
import backgroundImage from '../assets/Background/home.jpg';
import Model from '../models/plane';
import HomeInfo from "../components/Homeinfo";
const Home = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating,setIsRotating]=useState(false);
  const adjustmodelForScreenSize = () => {
    let screenScale, screenPosition;

    // If screen width is less than 768px, adjust the scale and position
    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };

  const adjustLaptopForScreenSize = () => {
    let screenScale=null;
    let  screenPosition =[0,-6.5,-40];
    let rotation = [0.1,0.1,0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -6.5, -43.4];
    } else {
      screenScale = [0.9,0.9,1];
      screenPosition = [0, -10.5, -40.4];
    }

    return [screenScale, screenPosition,rotation];
  };
  const [modelScale, modelPosition] = adjustmodelForScreenSize();
  const [LaptopScale,LaptopPosition,LaptopRotation] =adjustLaptopForScreenSize();
  return (
    <section className='w-full h-screen relative'
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>
       <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 5, 10]} intensity={2} />
          <spotLight
            position={[0, 50, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />
          <hemisphereLight
            skyColor='#b1e1ff'
            groundColor='#000000'
            intensity={1}
          />

          
          <Laptop
          position={LaptopPosition}
          scale={LaptopScale}
          rotation={LaptopRotation}
          isRotating={isRotating}
          setIsRotating={setIsRotating}
          setCurrentStage={setCurrentStage}
          />
          <Model
          isRotating={isRotating}
          modelScale={modelScale}
          modelPosition={modelPosition}
          rotation={[0,20,10]}
          
          />
        </Suspense>
      </Canvas>
    </section>
  )
}
export default Home
