import React, { useRef, useState } from 'react';
import Tone from 'tone';
import './styles.css';
import styled from 'styled-components';
import Scaper from './components/Scaper';

const paths = {
  fallout:
    'https://res.cloudinary.com/boonier/video/upload/v1590514578/soundscaperesq/fallout.wav',
  dynamite:
    'https://res.cloudinary.com/boonier/video/upload/v1590514555/soundscaperesq/dynamite.wav',
  drone:
    'https://res.cloudinary.com/boonier/video/upload/v1590514554/soundscaperesq/drone.wav',
};

const Scapers = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
`;

export default function App() {
  const [buffersLoaded, setBuffersLoaded] = useState(false);
  const sounds = useRef(new Tone.Buffers(paths, () => setBuffersLoaded(true)))
    .current;

  return (
    <div className="App">
      <h1>SoundScaperesq v0.1.0</h1>
      {buffersLoaded ? (
        <Scapers>
          <Scaper
            source={sounds.get('dynamite')}
            amp={1}
            rate={1}
            delayMix={0.2}
            loop
          />
          <Scaper source={sounds.get('drone')} amp={0.4} loop />
          <Scaper source={sounds.get('fallout')} rate={0.5} loop />
        </Scapers>
      ) : (
        <div>Loading sounds...</div>
      )}
    </div>
  );
}
