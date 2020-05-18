import React, { useEffect, useRef, useState, useMemo } from "react";
import Tone from "tone";
import { Slider, Number } from "react-nexusui";
import { ScaperContainer } from "./styles";

export default class ScaperO extends React.Component {
  constructor(props) {
    super();
    this.state = {
      storedRate: props.rate
    };

    this.playerNode = new Tone.Player().toMaster();
    this.playerNode.load(props.source);
    this.playerNode.loop = props.loop;
    this.playerNode.playbackRate = props.rate;
  }

  setStoredRate = val => {
    this.playerNode.playbackRate = val;
    this.setState({
      storedRate: val
    });
  };

  render() {
    return (
      <ScaperContainer>
        <button onClick={() => this.playerNode.start()}>start</button>
        <button onClick={() => this.playerNode.stop()}>stop</button>
        <Slider // playback rate
          size={[180, 14]}
          min={0}
          max={2}
          value={this.state.storedRate}
          onChange={this.setStoredRate}
        />
        <Number value={this.state.storedRate} min="0" max="2" size={12} />
      </ScaperContainer>
    );
  }
}

// export default function ScaperO({ source, loop, rate = 1 }) {
//   const playerNode = useRef(null);
//   const [storedRate, setStoredRate] = useState(rate);

//   useEffect(() => {
//     playerNode.current = new Tone.Player().toMaster();
//     playerNode.current.load(source);
//     playerNode.current.loop = loop;
//     playerNode.current.playbackRate = rate;
//     // setStoredRate(rate);
//   }, []);

//   // useEffect(() => {
//   // playerNode.current.playbackRate = storedRate;
//   // }, [storedRate]);

//   const onRateChange = e => {
//     // console.log(playerNode.current);
//     // setStoredRate(e);
//   };
//   // return useMemo(() => {
//   console.log("render");

//   return (
//     <ScaperContainer>
//       <div>[fileview]</div>
//       <button onClick={() => playerNode.current.start()}>start</button>
//       <button onClick={() => playerNode.current.stop()}>stop</button>
//       <Slider // playback rate
//         size={[180, 14]}
//         min={0}
//         max={2}
//         value={storedRate}
//         onChange={val => setStoredRate(val)}
//         // onReady={e => console.log("slider ready")}
//       />
//       {/* <Number
//         // value={storedRate}
//         size={12}
//         // onReady={e => console.log("number ready")}
//       /> */}
//       <div>[looper controls]</div>
//       <div>[effects]</div>
//     </ScaperContainer>
//   );
//   // }, [storedRate]);
// }
