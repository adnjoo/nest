import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Scene from './components/Scene'
import { UI } from './components/UI'
import './App.css'

interface PetStats {
  happiness: number;
  hunger: number;
  energy: number;
}

function App() {
  const [stats, setStats] = useState<PetStats>({
    happiness: 100,
    hunger: 100,
    energy: 100
  });

  const handleFeed = () => {
    setStats(prev => ({
      ...prev,
      hunger: Math.min(100, prev.hunger + 30),
      happiness: Math.min(100, prev.happiness + 10)
    }));
  };

  const handlePlay = () => {
    if (stats.energy > 20) {
      setStats(prev => ({
        ...prev,
        happiness: Math.min(100, prev.happiness + 20),
        energy: Math.max(0, prev.energy - 20),
        hunger: Math.max(0, prev.hunger - 10)
      }));
    }
  };

  const handleSleep = () => {
    setStats(prev => ({
      ...prev,
      energy: Math.min(100, prev.energy + 50),
      hunger: Math.max(0, prev.hunger - 10)
    }));
  };

  return (
    <div className="app">
      <Canvas
        camera={{
          position: [0, 2, 5],
          fov: 75
        }}
      >
        <color attach="background" args={['#1e1e1e']} />
        <Scene stats={stats} setStats={setStats} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI/3}
          maxPolarAngle={Math.PI/1.5}
        />
      </Canvas>
      <UI
        stats={stats}
        onFeed={handleFeed}
        onPlay={handlePlay}
        onSleep={handleSleep}
      />
    </div>
  )
}

export default App 