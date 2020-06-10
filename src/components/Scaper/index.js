import React, { useEffect, useRef, useState, useCallback } from 'react';
import Tone from 'tone';
import {
  ScaperContainer,
  ScaperControlsSection,
  ScaperControlsTitle,
  ScaperControlsSubTitle,
} from './styles';
import NSlider from '../nexusui/NSlider';
import { Toggle, RadioButton } from 'react-nexusui';
import DubDelay from '../tonejs/DubDelay';
import RingMod from '../tonejs/RingMod';
import ToggleButton from './ToggleButton';
import memoize from 'fast-memoize';

export default function Scaper({
  source,
  loop,
  rate = 1,
  amp = 1,
  delayFeedback = 0.5,
  delayTime = 0.25,
  delayMix = 0.5,
  filterFreq = 1000,
  ringModFreq = 200,
}) {
  const containerRef = useRef(null);
  const playerNode = useRef(new Tone.Player()).current;
  const volumeNode = useRef(new Tone.Gain()).current;
  const dubDelayNode = useRef(new DubDelay()).current;
  const ringModNode = useRef(new RingMod()).current;
  const filterNode = useRef(new Tone.Filter({ type: 'highpass' })).current;

  // console.log(ringModNode);

  playerNode.chain(
    volumeNode,
    ringModNode,
    dubDelayNode,
    filterNode,
    Tone.Master
  );

  const [state, setState] = useState({
    storedRate: rate,
    storedAmp: amp,
    storedDelayFeedback: delayFeedback,
    storedDelayTime: delayTime,
    storedDelayMix: delayMix,
    storedFilterFreq: filterFreq,
    storedFilterRes: 0,
    storedRingModFreq: ringModFreq,
    isPlaying: false,
  });

  const onControlChange = useCallback(
    memoize(control => val => updateState(control, val)),
    []
  );

  const updateState = (control, val) => {
    setState(prevState => ({
      ...prevState,
      [control]: val,
    }));
  };

  useEffect(() => {
    playerNode.playbackRate = state.storedRate;
  }, [state.storedRate]);

  useEffect(() => {
    volumeNode.gain.rampTo(Math.pow(state.storedAmp, 2), 0.2);
  }, [state.storedAmp]);

  useEffect(() => {
    ringModNode.carrFreq(state.storedRingModFreq);
  }, [state.storedRingModFreq]);

  // FILTER
  useEffect(() => {
    filterNode.frequency.rampTo(state.storedFilterFreq, 0.2);
  }, [state.storedFilterFreq]);

  useEffect(() => {
    filterNode.Q.rampTo(state.storedFilterRes, 0.2);
  }, [state.storedFilterRes]);

  // FEEDBACK
  useEffect(() => {
    dubDelayNode.feedback(state.storedDelayFeedback);
  }, [state.storedDelayFeedback]);

  // DELAY TIME
  useEffect(() => {
    dubDelayNode.delayTime(state.storedDelayTime);
  }, [state.storedDelayTime]);

  // DELAY TIME
  useEffect(() => {
    dubDelayNode.wet.rampTo(state.storedDelayMix, 0.2);
  }, [state.storedDelayMix]);

  const [containerWidth, setContainerWidth] = useState(200);

  useEffect(() => {
    // playerNode.load(source, player =>
    //   console.log(player.buffer.length, player.buffer.length / 200)
    // );
    playerNode.buffer = source;
    playerNode.loop = loop;
    playerNode.playbackRate = rate;

    return function () {
      playerNode.disconnect();
      volumeNode.disconnect();
      dubDelayNode.disconnect();
      filterNode.disconnect();
      ringModNode.disconnect();
    };
  }, []);

  useEffect(() => setContainerWidth(containerRef.current.clientWidth), [
    containerWidth,
  ]);

  const onPlayChange = () => {
    setState(state => ({
      ...state,
      isPlaying: !state.isPlaying,
    }));
  };
  useEffect(() => {
    state.isPlaying ? playerNode.start() : playerNode.stop();
  }, [state.isPlaying]);

  return (
    <ScaperContainer>
      <div ref={containerRef}>
        <ScaperControlsSection>
          <ScaperControlsTitle>FILE VIEW</ScaperControlsTitle>
        </ScaperControlsSection>

        <ScaperControlsSection>
          {/* <ScaperControlsTitle>MAIN CONTROLS</ScaperControlsTitle> */}
          <ToggleButton
            states={['Start', 'Stop']}
            isToggled={state.isPlaying}
            onClick={onPlayChange}
          />
          <NSlider
            // onSliderChange={onControlChange}
            onSliderChange={onControlChange('storedRate')}
            value={state.storedRate}
            labelText="Rate"
            min={0}
            max={2}
            totalWidth={containerWidth}
          />
          <NSlider
            // onSliderChange={val => onControlChange(val)}
            onSliderChange={onControlChange('storedAmp')}
            value={state.storedAmp}
            labelText="Amplitude"
            min={0}
            max={1}
            totalWidth={containerWidth}
            logScale
          />
        </ScaperControlsSection>

        <ScaperControlsSection>
          <ScaperControlsTitle>OSCILLATOR</ScaperControlsTitle>
          <ScaperControlsSubTitle>RING MODULATOR</ScaperControlsSubTitle>
          <NSlider
            onSliderChange={onControlChange('storedRingModFreq')}
            value={state.storedRingModFreq}
            labelText="Frequency"
            min={50}
            max={2000}
            totalWidth={containerWidth}
          />
          <RadioButton size={[160, 13]} numberOfButtons={4} active={-1} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              width: '160px',
            }}
          >
            <span>Sin</span>
            <span>Tri</span>
            <span>Sqr</span>
            <span>Saw</span>
          </div>
          {/* <NSlider
            // onSliderChange={val => onControlChange(val)}
            onSliderChange={onAmpChange}
            value={state.storedAmp}
            labelText="Mix"
            min={0}
            max={1}
            totalWidth={containerWidth}
            logScale
          /> */}
        </ScaperControlsSection>

        <ScaperControlsSection>
          <ScaperControlsTitle>FILTER</ScaperControlsTitle>
          <Toggle size={[20, 22]} />
          [FILTER TYPE]
          <NSlider
            onSliderChange={onControlChange('storedFilterFreq')}
            value={state.storedFilterFreq}
            labelText="Frequency"
            min={20}
            max={20000}
            totalWidth={containerWidth}
            // logScale
          />
          <NSlider
            onSliderChange={onControlChange('storedFilterRes')}
            value={state.storedFilterRes}
            labelText="Resonance"
            min={0}
            max={100}
            totalWidth={containerWidth}
            // logScale
          />
        </ScaperControlsSection>

        <ScaperControlsSection>
          <ScaperControlsTitle>EFFECTS</ScaperControlsTitle>
          <NSlider
            onSliderChange={onControlChange('storedDelayTime')}
            value={state.storedDelayTime}
            labelText="Delay time"
            min={0}
            max={2}
            totalWidth={containerWidth}
          />
          <NSlider
            onSliderChange={onControlChange('storedDelayFeedback')}
            value={state.storedDelayFeedback}
            labelText="Feedback"
            min={0}
            max={1}
            totalWidth={containerWidth}
          />
          <NSlider
            onSliderChange={onControlChange('storedDelayMix')}
            value={state.storedDelayMix}
            labelText="Mix"
            min={0}
            max={1}
            totalWidth={containerWidth}
          />
        </ScaperControlsSection>
      </div>
    </ScaperContainer>
  );
  // }, [storedRate]);
}
