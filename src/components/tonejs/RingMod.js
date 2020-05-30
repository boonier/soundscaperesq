import Tone from 'tone';

export default class RingMod extends Tone.Effect {
  constructor() {
    super();
    // Gain no
    // this.gainNode = new Tone.Gain();
    this.ringOsc = new Tone.Oscillator({ frequency: 800, type: 'sine' });
    this.multNode = new Tone.Multiply();
    this.ringOsc.start();

    this.ringOsc.connect(this.multNode, 0, 1);
    this.effectSend.chain(this.multNode, this.effectReturn);
  }

  carrFreq(val) {
    this.ringOsc.frequency.rampTo(val, 0.2);
  }
}
