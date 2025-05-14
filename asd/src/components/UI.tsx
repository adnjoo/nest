import React from 'react';
import styled from '@emotion/styled';

interface UIProps {
  stats: {
    happiness: number;
    hunger: number;
    energy: number;
  };
  onFeed: () => void;
  onPlay: () => void;
  onSleep: () => void;
}

const Container = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  padding: 20px;
  border-radius: 10px;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 300px;
`;

const StatBar = styled.div<{ value: number }>`
  width: 100%;
  height: 20px;
  background: rgba(255, 255, 255, 0.1);
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
    background: ${props => {
      if (props.value > 66) return '#4CAF50';
      if (props.value > 33) return '#FFC107';
      return '#F44336';
    }};
    transition: all 0.3s ease;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
`;

const Button = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export function UI({ stats, onFeed, onPlay, onSleep }: UIProps) {
  return (
    <Container>
      <div>
        <div>Happiness</div>
        <StatBar value={stats.happiness} />
      </div>
      <div>
        <div>Hunger</div>
        <StatBar value={stats.hunger} />
      </div>
      <div>
        <div>Energy</div>
        <StatBar value={stats.energy} />
      </div>
      <ButtonContainer>
        <Button onClick={onFeed}>Feed</Button>
        <Button onClick={onPlay}>Play</Button>
        <Button onClick={onSleep}>Sleep</Button>
      </ButtonContainer>
    </Container>
  );
} 