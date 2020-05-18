import React, { useEffect, useRef, useState, useCallback } from "react";
import Tone from "tone";
import { ScaperContainer } from "./styles";
import NSlider from "../NSlider";

export default function Scaper({
  source,
  loop,
  rate = 1,
  amp = 1,
  delayAmt = 0.5
}) {
  const playerNode = useRef(new Tone.Player()).current;
  const volumeNode = useRef(new Tone.Gain(amp, "Decibels")).current;
  const delayNode = useRef(new Tone.FeedbackDelay(0.1, 0.8)).current;
  const lfoNode = useRef(new Tone.LFO(0.02, 0.096, 0.14)).current;

  delayNode.toMaster();
  lfoNode.connect(delayNode.delayTime);
  playerNode.chain(volumeNode, delayNode);

  useEffect(() => {
    playerNode.load(source);
    playerNode.loop = loop;
    playerNode.playbackRate = rate;
    lfoNode.start();

    return function cleanUp() {
      playerNode.disconnect();
      volumeNode.disconnect();
      delayNode.disconnect();
    };
  }, []);

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

  const [storedDelayAmt, setStoredDelayAmt] = useState(delayAmt);
  const onDelayAmtChange = useCallback(e => setStoredDelayAmt(e), []);
  useEffect(() => {
    delayNode.wet.rampTo(storedDelayAmt, 0.2);
  }, [storedDelayAmt]);

  return (
    <ScaperContainer>
      <div>[filesview]</div>
      <button onClick={() => playerNode.start()}>start</button>
      <button onClick={() => playerNode.stop()}>stop</button>

      <NSlider
        onSliderChange={onRateChange}
        value={storedRate}
        labelText="Rate"
        min={0}
        max={2}
      />

      <NSlider
        onSliderChange={onAmpChange}
        value={storedAmp}
        labelText="Level"
        min={0}
        max={1}
        logScale
      />

      <div>[looper controls]</div>
      <div>[effects]</div>
      <NSlider
        onSliderChange={onDelayAmtChange}
        value={storedDelayAmt}
        labelText="Delay"
        min={0}
        max={1}
      />
    </ScaperContainer>
  );
  // }, [storedRate]);
}
