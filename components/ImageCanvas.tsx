
import React, { forwardRef, Suspense, useMemo, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useTexture, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Rotation } from '../types';

interface ImageCanvasProps {
  imageUrl: string;
  rotation: Rotation;
  scale: number;
  focalLength: number;
  resetTrigger: number;
}

const RotatingImage: React.FC<{imageUrl: string, rotation: Rotation, scale: number}> = ({ imageUrl, rotation, scale }) => {
  const texture = useTexture(imageUrl);
  
  const geometryArgs = useMemo(() => {
    const image = texture.image;
    if (!image) return [5, 5];

    const aspect = image.naturalWidth / image.naturalHeight;
    const baseSize = 5;
    
    // Fit image within a 5x5 box
    let width = baseSize;
    let height = baseSize;
    if (aspect > 1) { // Landscape
      height = baseSize / aspect;
    } else { // Portrait or square
      width = baseSize * aspect;
    }
    
    return [width, height];
  }, [texture]);

  // Convert degrees to radians for three.js
  const rotationRad = {
    x: THREE.MathUtils.degToRad(rotation.x),
    y: THREE.MathUtils.degToRad(rotation.y),
    z: THREE.MathUtils.degToRad(rotation.z),
  };
  
  return (
    <mesh
      scale={scale}
      rotation={[rotationRad.x, rotationRad.y, rotationRad.z]}
    >
      <planeGeometry args={geometryArgs as [number, number]} />
      <meshStandardMaterial map={texture} side={THREE.DoubleSide} transparent />
    </mesh>
  );
};

const ImageCanvas = forwardRef<HTMLCanvasElement, ImageCanvasProps>((props, ref) => {
  const { imageUrl, rotation, scale, focalLength, resetTrigger } = props;
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    if (controlsRef.current) {
        controlsRef.current.reset();
    }
  }, [resetTrigger]);

  return (
    <Canvas
      gl={{ preserveDrawingBuffer: true, antialias: true }}
      ref={ref}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={focalLength} />
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <directionalLight position={[-10, -10, -5]} intensity={1} />
      
      <OrbitControls ref={controlsRef} />

      <Suspense fallback={null}>
        <RotatingImage imageUrl={imageUrl} rotation={rotation} scale={scale} />
      </Suspense>
    </Canvas>
  );
});

export default ImageCanvas;
