import React, { useEffect, useRef, useState, useCallback } from 'react';
import Tone from 'tone';
import { ScaperContainer, ScaperControlsSection } from './styles';
import NSlider from '../nexusui/NSlider';
import DubDelay from '../tonejs/DubDelay';

export default function Scaper({
  source,
  loop,
  rate = 1,
  amp = 1,
  delayFeedback = 0.5,
  delayTime = 0.25,
  delayMix = 0.5,
}) {
  const containerRef = useRef(null);
  const playerNode = useRef(new Tone.Player()).current;
  const volumeNode = useRef(new Tone.Gain(amp, 'Decibels')).current;
  // for tape delay effect
  const dubDelayNode = useRef(new DubDelay()).current;
  // console.log(dubDelayNode);

  // const lfoNode = useRef(new Tone.LFO(0.02, 0.096, 0.14)).current;
  playerNode.chain(dubDelayNode, Tone.Master);
  // delayNode.toMaster();

  const [storedRate, setStoredRate] = useState(rate);
  const onRateChange = useCallback(e => setStoredRate(e), []);
  useEffect(() => {
    playerNode.playbackRate = storedRate;
  }, [storedRate]);

  const [storedAmp, setStoredAmp] = useState(amp);
  const onAmpChange = useCallback(e => setStoredAmp(e), []);
  useEffect(() => {
    volumeNode.gain.rampTo(Math.pow(storedAmp, 2), 0.2);
  }, [storedAmp]);

  // FEEDBACK
  const [storedDelayFeedback, setStoredDelayFeedback] = useState(delayFeedback);
  const onDelayFeedbackChange = useCallback(e => setStoredDelayFeedback(e), []);
  useEffect(() => {
    dubDelayNode.feedback(storedDelayFeedback);
  }, [storedDelayFeedback]);

  // DELAY TIME
  const [storedDelayTime, setStoredDelayTime] = useState(delayTime);
  const onDelayTimeChange = useCallback(e => setStoredDelayTime(e), []);
  useEffect(() => {
    dubDelayNode.delayTime(storedDelayTime);
  }, [storedDelayTime]);

  // DELAY TIME
  const [storedDelayMix, setStoredDelayMix] = useState(delayMix);
  const onDelayMixChange = useCallback(e => setStoredDelayMix(e), []);
  useEffect(() => {
    dubDelayNode.wet.rampTo(storedDelayMix, 0.2);
  }, [storedDelayMix]);

  const [containerWidth, setContainerWidth] = useState(200);

  useEffect(() => {
    // lfoNode.start();
    // delayNode.delayTime.rampTo(0.1, 1);

    playerNode.load(source, player =>
      console.log(player.buffer.length, player.buffer.length / 200)
    );
    playerNode.loop = loop;
    playerNode.playbackRate = rate;

    return function cleanUp() {
      playerNode.disconnect();
      volumeNode.disconnect();
      dubDelayNode.disconnect();
    };
  }, []);

  useEffect(() => setContainerWidth(containerRef.current.clientWidth), [
    containerWidth,
  ]);

  return (
    <ScaperContainer>
      <div ref={containerRef}>
        <div>[FILE VIEW]</div>

        <ScaperControlsSection>
          <div>[TRANSPORT]</div>
          <button onClick={() => playerNode.start()}>start</button>
          <button onClick={() => playerNode.stop()}>stop</button>
        </ScaperControlsSection>

        <ScaperControlsSection>
          <div>[LOOPER CONTROLS]</div>
          <NSlider
            onSliderChange={onRateChange}
            value={storedRate}
            labelText="Rate"
            min={0}
            max={2}
            totalWidth={containerWidth}
          />
          <NSlider
            onSliderChange={onAmpChange}
            value={storedAmp}
            labelText="Level"
            min={0}
            max={1}
            totalWidth={containerWidth}
            logScale
          />
        </ScaperControlsSection>

        <ScaperControlsSection>
          <div>[EFFECTS]</div>
          <NSlider
            onSliderChange={onDelayTimeChange}
            value={storedDelayTime}
            labelText="Delay time"
            min={0}
            max={2}
            totalWidth={containerWidth}
          />
          <NSlider
            onSliderChange={onDelayFeedbackChange}
            value={storedDelayFeedback}
            labelText="Feedback"
            min={0}
            max={1}
            totalWidth={containerWidth}
          />
          <NSlider
            onSliderChange={onDelayMixChange}
            value={storedDelayMix}
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
