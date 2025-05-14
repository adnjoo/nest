import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

interface PetStats {
  hunger: number;
  happiness: number;
  energy: number;
  age: number;
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  -webkit-app-region: drag;
`;

const PetContainer = styled(motion.div)`
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 20px;
  width: 300px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  padding: 15px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StatBar = styled.div<{ value: number }>`
  width: 100%;
  height: 20px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${props => props.value}%;
    background: rgba(255, 255, 255, 0.6);
    transition: width 0.3s ease;
  }
`;

const ActionButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  color: white;
  cursor: pointer;
  margin: 5px;
  -webkit-app-region: no-drag;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

function App() {
  const [stats, setStats] = useState<PetStats>({
    hunger: 100,
    happiness: 100,
    energy: 100,
    age: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setStats(prev => ({
        ...prev,
        hunger: Math.max(0, prev.hunger - 1),
        happiness: Math.max(0, prev.happiness - 0.5),
        energy: Math.max(0, prev.energy - 0.7),
        age: prev.age + 0.1,
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const feed = () => {
    setStats(prev => ({
      ...prev,
      hunger: Math.min(100, prev.hunger + 30),
    }));
  };

  const play = () => {
    if (stats.energy > 20) {
      setStats(prev => ({
        ...prev,
        happiness: Math.min(100, prev.happiness + 20),
        energy: Math.max(0, prev.energy - 20),
      }));
    }
  };

  const sleep = () => {
    setStats(prev => ({
      ...prev,
      energy: Math.min(100, prev.energy + 50),
      hunger: Math.max(0, prev.hunger - 10),
    }));
  };

  return (
    <Container>
      <PetContainer
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Pet character here - for now just a placeholder */}
        <motion.div
          style={{
            width: 100,
            height: 100,
            background: 'white',
            borderRadius: '50%',
          }}
        />
      </PetContainer>

      <StatsContainer>
        <div>Hunger</div>
        <StatBar value={stats.hunger} />
        <div>Happiness</div>
        <StatBar value={stats.happiness} />
        <div>Energy</div>
        <StatBar value={stats.energy} />
        <div>Age</div>
        <div>{Math.floor(stats.age)} days</div>
      </StatsContainer>

      <div style={{ marginTop: 20 }}>
        <ActionButton
          whileTap={{ scale: 0.95 }}
          onClick={feed}
        >
          Feed
        </ActionButton>
        <ActionButton
          whileTap={{ scale: 0.95 }}
          onClick={play}
        >
          Play
        </ActionButton>
        <ActionButton
          whileTap={{ scale: 0.95 }}
          onClick={sleep}
        >
          Sleep
        </ActionButton>
      </div>
    </Container>
  );
}

export default App; 