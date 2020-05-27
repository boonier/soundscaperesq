import React, { useEffect, useRef, useState, useCallback } from 'react';
import Tone from 'tone';
import {
  ScaperContainer,
  ScaperControlsSection,
  ScaperControlsTitle,
} from './styles';
import NSlider from '../nexusui/NSlider';
import { Slider, Number, Toggle } from 'react-nexusui';
import DubDelay from '../tonejs/DubDelay';

export default function Scaper({
  source,
  loop,
  rate = 1,
  amp = 1,
  delayFeedback = 0.5,
  delayTime = 0.25,
  delayMix = 0.5,
  filterFreq = 1000,
}) {
  const containerRef = useRef(null);
  const playerNode = useRef(new Tone.Player()).current;
  const volumeNode = useRef(new Tone.Gain()).current;
  const dubDelayNode = useRef(new DubDelay()).current;
  const filterNode = useRef(new Tone.Filter({ type: 'highpass' })).current;
  playerNode.chain(volumeNode, filterNode, dubDelayNode, Tone.Master);

  const [state, setState] = useState({
    storedRate: rate,
    storedAmp: amp,
    storedDelayFeedback: delayFeedback,
    storedDelayTime: delayTime,
    storedDelayMix: delayMix,
    storedFilterFreq: filterFreq,
    storedFilterRes: 0,
  });

  const updateState = (val, control) => {
    setState(prevState => ({
      ...prevState,
      storedAmp: val,
    }));
  };

  const onRateChange = useCallback(
    e =>
      setState(state => ({
        ...state,
        storedRate: e,
      })),
    []
  );
  useEffect(() => {
    playerNode.playbackRate = state.storedRate;
  }, [state.storedRate]);

  const onAmpChange = useCallback(
    e =>
      setState(state => ({
        ...state,
        storedAmp: e,
      })),
    []
  );
  useEffect(() => {
    volumeNode.gain.rampTo(Math.pow(state.storedAmp, 2), 0.2);
  }, [state.storedAmp]);

  // FILTER
  const onFilterFreqChange = useCallback(
    e =>
      setState(state => ({
        ...state,
        storedFilterFreq: e,
      })),
    []
  );
  useEffect(() => {
    filterNode.frequency.rampTo(state.storedFilterFreq, 0.2);
  }, [state.storedFilterFreq]);

  const onFilterResChange = useCallback(
    e =>
      setState(state => ({
        ...state,
        storedFilterRes: e,
      })),
    []
  );
  useEffect(() => {
    filterNode.Q.rampTo(state.storedFilterRes, 0.2);
  }, [state.storedFilterRes]);

  // FEEDBACK
  const onDelayFeedbackChange = useCallback(
    e =>
      setState(state => ({
        ...state,
        storedDelayFeedback: e,
      })),
    []
  );
  useEffect(() => {
    dubDelayNode.feedback(state.storedDelayFeedback);
  }, [state.storedDelayFeedback]);

  // DELAY TIME
  const onDelayTimeChange = useCallback(
    e =>
      setState(state => ({
        ...state,
        storedDelayTime: e,
      })),
    []
  );
  useEffect(() => {
    dubDelayNode.delayTime(state.storedDelayTime);
  }, [state.storedDelayTime]);

  // DELAY TIME
  const onDelayMixChange = useCallback(
    e =>
      setState(state => ({
        ...state,
        storedDelayMix: e,
      })),
    []
  );
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

    return function cleanUp() {
      playerNode.disconnect();
      volumeNode.disconnect();
      dubDelayNode.disconnect();
      filterNode.disconnect();
    };
  }, []);

  useEffect(() => setContainerWidth(containerRef.current.clientWidth), [
    containerWidth,
  ]);

  return (
    <ScaperContainer>
      <div ref={containerRef}>
        <ScaperControlsSection>
          <ScaperControlsTitle>FILE VIEW</ScaperControlsTitle>
        </ScaperControlsSection>

        <ScaperControlsSection>
          <ScaperControlsTitle>TRANSPORT</ScaperControlsTitle>
          <button onClick={() => playerNode.start()}>start</button>
          <button onClick={() => playerNode.stop()}>stop</button>
        </ScaperControlsSection>

        <ScaperControlsSection>
          <ScaperControlsTitle>LOOPER CONTROLS</ScaperControlsTitle>
          <NSlider
            // onSliderChange={onControlChange}
            onSliderChange={onRateChange}
            value={state.storedRate}
            labelText="Rate"
            min={0}
            max={2}
            totalWidth={containerWidth}
          />
          <NSlider
            // onSliderChange={val => onControlChange(val)}
            onSliderChange={onAmpChange}
            value={state.storedAmp}
            labelText="Amplitude"
            min={0}
            max={1}
            totalWidth={containerWidth}
            logScale
          />
        </ScaperControlsSection>

        <ScaperControlsSection>
          <ScaperControlsTitle>FILTER</ScaperControlsTitle>
          <Toggle size={[20, 22]} />
          <NSlider
            onSliderChange={onFilterFreqChange}
            value={state.storedFilterFreq}
            labelText="Filter freq"
            min={20}
            max={20000}
            totalWidth={containerWidth}
            // logScale
          />
          <NSlider
            onSliderChange={onFilterResChange}
            value={state.storedFilterRes}
            labelText="Filter res"
            min={0}
            max={100}
            totalWidth={containerWidth}
            // logScale
          />
        </ScaperControlsSection>

        <ScaperControlsSection>
          <ScaperControlsTitle>EFFECTS</ScaperControlsTitle>
          <NSlider
            onSliderChange={onDelayTimeChange}
            value={state.storedDelayTime}
            labelText="Delay time"
            min={0}
            max={2}
            totalWidth={containerWidth}
          />
          <NSlider
            onSliderChange={onDelayFeedbackChange}
            value={state.storedDelayFeedback}
            labelText="Feedback"
            min={0}
            max={1}
            totalWidth={containerWidth}
          />
          <NSlider
            onSliderChange={onDelayMixChange}
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
