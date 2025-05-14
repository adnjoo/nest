import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Group } from 'three'

interface SceneProps {
  stats: {
    happiness: number;
    hunger: number;
    energy: number;
  };
  setStats: (stats: any) => void;
}

export default function Scene({ stats, setStats }: SceneProps) {
  const bodyRef = useRef<Group>(null)
  const eyesRef = useRef<Group>(null)

  useFrame((state, delta) => {
    if (bodyRef.current) {
      // Bouncy animation based on happiness
      bodyRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1 * (stats.happiness / 100);
      
      // Gentle rotation based on energy
      bodyRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1 * (stats.energy / 100);
    }

    if (eyesRef.current) {
      // Blink animation
      const blinkSpeed = 0.2;
      const blinkInterval = 3;
      const time = state.clock.elapsedTime;
      const blink = Math.sin(time * blinkSpeed) > 0.95;
      
      eyesRef.current.scale.y = blink ? 0.1 : 1;
    }

    // Decrease stats over time
    setStats((prev: any) => ({
      ...prev,
      happiness: Math.max(0, prev.happiness - delta * 2),
      hunger: Math.max(0, prev.hunger - delta * 3),
      energy: Math.max(0, prev.energy - delta * 1.5)
    }));
  })

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[0, 2, 2]} intensity={0.5} />

      {/* Pet Body */}
      <group ref={bodyRef}>
        {/* Main body */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhongMaterial color="#ffb6c1" shininess={100} />
        </mesh>

        {/* Eyes */}
        <group ref={eyesRef} position={[0, 0.2, 0.8]}>
          {/* Left eye */}
          <mesh position={[-0.3, 0, 0]}>
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshPhongMaterial color="#000000" />
          </mesh>
          {/* Right eye */}
          <mesh position={[0.3, 0, 0]}>
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshPhongMaterial color="#000000" />
          </mesh>
        </group>

        {/* Cheeks */}
        <mesh position={[-0.5, -0.1, 0.7]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshPhongMaterial color="#ff8fa3" />
        </mesh>
        <mesh position={[0.5, -0.1, 0.7]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshPhongMaterial color="#ff8fa3" />
        </mesh>

        {/* Ears */}
        <mesh position={[-0.7, 0.7, 0]} rotation={[0, 0, -0.5]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshPhongMaterial color="#ffb6c1" />
        </mesh>
        <mesh position={[0.7, 0.7, 0]} rotation={[0, 0, 0.5]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshPhongMaterial color="#ffb6c1" />
        </mesh>
      </group>

      {/* Stats display as floating text */}
      <group position={[2, 2, 0]}>
        <mesh>
          <planeGeometry args={[2, 0.5]} />
          <meshPhongMaterial color="#333333" />
        </mesh>
      </group>

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial 
          color="#404040"
          metalness={0.2}
          roughness={0.8}
          opacity={0.6}
          transparent={true}
        />
      </mesh>
    </>
  )
} 