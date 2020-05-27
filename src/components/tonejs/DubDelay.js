import Tone from 'tone';

export default class DubDelay extends Tone.Effect {
  constructor(freq) {
    super();
    this.filtFreq = 800;
    this.filterNode = new Tone.Filter({
      frequency: this.filtFreq,
      type: 'lowpass',
    });
    this.delayNode = new Tone.Delay({ maxDelay: 1, delayTime: 0.2 });
    this.feedbackNode = new Tone.Gain(0.7);
    this.delayNode.connect(this.feedbackNode);
    this.feedbackNode.connect(this.filterNode);
    this.filterNode.connect(this.delayNode);
    this.effectSend.chain(this.delayNode, this.effectReturn);
  }

  delayTime(val) {
    this.delayNode.delayTime.rampTo(val, 0.2);
  }

  feedback(val) {
    this.feedbackNode.gain.rampTo(val, 0.2);
  }
}
