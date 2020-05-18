import React from 'react';
import './styles.css';
import styled from 'styled-components';
import Scaper from './components/Scaper';
import audioFile1 from './assets/dynamite.wav';
import audioFile2 from './assets/drone.wav';
import audioFile3 from './assets/fallout.wav';

const Scapers = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
`;

export default function App() {
  return (
    <div className="App">
      <h1>SoundScaperesq v0.0.1</h1>
      <Scapers>
        <Scaper source={audioFile1} amp={0.6} />
        <Scaper source={audioFile2} amp={0.4} loop />
        <Scaper source={audioFile3} rate={0.5} loop />
      </Scapers>
    </div>
  );
}
