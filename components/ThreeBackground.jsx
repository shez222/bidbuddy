'use client';

import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Sphere } from '@react-three/drei';

function AnimatedSphere() {
  const sphereRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (sphereRef.current) {
      // Rotate the sphere slightly on each frame
      sphereRef.current.rotation.y += delta * 0.2;
      sphereRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <Sphere
      args={[1, 32, 32]}
      ref={sphereRef}
      scale={hovered ? 1.2 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      position={[0, 0, -5]} // Push it slightly behind
    >
      <MeshDistortMaterial
        color={hovered ? '#ff6699' : '#3366ff'}
        distort={0.5}
        speed={2}
      />
    </Sphere>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <Suspense fallback={null}>
          <AnimatedSphere />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
        {/* 
          You can add more lighting or more 3D objects here if desired 
        */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
      </Canvas>
    </div>
  );
}
