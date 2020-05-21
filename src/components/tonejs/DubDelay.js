// import React, { useEffect, useRef, useState, useCallback } from 'react';
import Tone from 'tone';

export default class DubDelay extends Tone.Effect {
  constructor(freq) {
    super();

    // console.log(freq);
    // this.oscNode = new Tone.Oscillator(freq);
    // this.oscNode.volume.value = -18;

    // this.hpFreq = 100;
    // this.hpfNode = new Tone.Filter({
    //   frequency: this.hpFreq,
    //   type: 'highpass',
    // });

    this.delayNode = new Tone.Delay({ maxDelay: 1, delayTime: 0.3 });
    // this.feedbackNode = new Tone.Gain(1);
    this.effectSend.chain(this.delayNode, this.effectReturn);
  }
  delayTime() {}
}

// export default function DubDelay(freq) {
//   const oscNode = new Tone.Oscillator(freq);
//   oscNode.volume.value = -18;
//   const delayNode = new Tone.Delay({ maxDelay: 1, delayTime: 0.3 });
//   return oscNode.connect(delayNode);
// }
