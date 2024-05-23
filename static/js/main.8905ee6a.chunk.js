(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,n){e.exports=n(25)},20:function(e,t,n){},25:function(e,t,n){"use strict";n.r(t);var a,l,r,o,i=n(0),c=n.n(i),s=n(10),d=n.n(s),u=n(2),m=n(4),f=n.n(m),b=(n(20),n(3));const p=b.a.div(a||(a=Object(u.a)(["\n  display: block;\n  border: 2px solid #ddd;\n  padding: 8px;\n"]))),g=b.a.section(l||(l=Object(u.a)(["\n  border-bottom: 1px solid #ddd;\n  padding-bottom: 10px;\n  margin-bottom: 10px;\n  &:last-child {\n    border: none;\n    padding-bottom: 0px;\n    margin-bottom: 0px;\n  }\n"]))),h=b.a.h2(r||(r=Object(u.a)(["\n  font-weight: bold;\n  font-size: 13px;\n"]))),y=b.a.h3(o||(o=Object(u.a)(["\n  font-weight: bold;\n  font-size: 11px;\n  color: #848484;\n"])));var E,x,v,O=n(5);const F=b.a.div(E||(E=Object(u.a)(["\n  margin: 10px 0;\n"]))),j=b.a.div(x||(x=Object(u.a)(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n"]))),R=b.a.div(v||(v=Object(u.a)(["\n  font-size: 11px;\n"])));function T(e){let{labelText:t,onSliderChange:n,value:a,logScale:l,totalWidth:r,...o}=e;return c.a.createElement(F,null,c.a.createElement(R,null,t),c.a.createElement(j,null,c.a.createElement(O.c,Object.assign({size:[.8*r,14],value:a,onChange:n},o)),c.a.createElement(O.a,Object.assign({value:l?Math.pow(a,2):a,size:[.15*r,22]},o))))}var w,q,k,S;const M=b.a.div(w||(w=Object(u.a)(["\n  margin: 10px 0;\n"]))),W=(b.a.div(q||(q=Object(u.a)(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n"]))),b.a.div(k||(k=Object(u.a)(["\n  font-size: 11px;\n  margin-top: 3px;\n"])))),D=b.a.div(S||(S=Object(u.a)(["\n  display: flex;\n  justify-content: space-around;\n  width: 160px;\n"])));function C(e){let{labelText:t,onRadioChange:n,active:a,logScale:l,totalWidth:r,...o}=e;return c.a.createElement(M,null,c.a.createElement(O.b,{size:[160,13],numberOfButtons:4,active:-1,onChange:n,active:a}),c.a.createElement(D,null,c.a.createElement(W,null,"Sin"),c.a.createElement(W,null,"Sqr"),c.a.createElement(W,null,"Tri"),c.a.createElement(W,null,"Saw")))}var N;const z=b.a.button(N||(N=Object(u.a)(["\n  background-color: #2bb;\n  display: inline-block;\n  border: none;\n  padding: 0.7rem 1.5rem;\n  margin: 0;\n  text-decoration: none;\n  color: #ffffff;\n  font-family: sans-serif;\n  font-size: 1rem;\n  cursor: pointer;\n  text-align: center;\n  transition: background 250ms ease-in-out, transform 150ms ease;\n  appearance: none;\n  border-radius: 8px;\n\n  &:hover {\n    background: #0053ba;\n  }\n\n  /* &:focus {\n    outline: 1px solid #fff;\n    outline-offset: -4px;\n  } */\n\n  &:active {\n    transform: scale(0.96);\n  }\n"])));function A(e){let{isToggled:t,states:n,...a}=e;return c.a.createElement(z,a,t?n[1]:n[0])}class P extends f.a.Effect{constructor(e){super(),this.filtFreq=800,this.filterNode=new f.a.Filter({frequency:this.filtFreq,type:"lowpass"}),this.delayNode=new f.a.Delay({maxDelay:1,delayTime:.2}),this.feedbackNode=new f.a.Gain(.7),this.delayNode.connect(this.feedbackNode),this.feedbackNode.connect(this.filterNode),this.filterNode.connect(this.delayNode),this.effectSend.chain(this.delayNode,this.effectReturn)}delayTime(e){this.delayNode.delayTime.rampTo(e,.2)}feedback(e){this.feedbackNode.gain.rampTo(e,.2)}}class I extends f.a.Effect{constructor(){super(),this.ringOsc=new f.a.Oscillator({frequency:800,type:"sine"}),this.multNode=new f.a.Multiply,this.ringOsc.start(),this.ringOsc.connect(this.multNode,0,1),this.effectSend.chain(this.multNode,this.effectReturn)}carrFreq(e){this.ringOsc.frequency.rampTo(e,.2)}modWave(e){let t="sine";switch(e){case 1:t="square";break;case 2:t="triangle";break;case 3:t="sawtooth";break;default:t="sine"}console.log("type",t),this.ringOsc.type=t}}var L,B=n(14),G=n.n(B);function J(e){let{source:t,loop:n,rate:a=1,amp:l=1,delayFeedback:r=.5,delayTime:o=.25,delayMix:s=.5,filterFreq:d=1e3,ringModFreq:u=200}=e;const m=Object(i.useRef)(null),b=Object(i.useRef)(new f.a.Player).current,E=Object(i.useRef)(new f.a.Gain).current,x=Object(i.useRef)(new P).current,v=Object(i.useRef)(new I).current,F=Object(i.useRef)(new f.a.Filter({type:"highpass"})).current;b.chain(E,v,x,F,f.a.Master);const[j,R]=Object(i.useState)({storedRate:a,storedAmp:l,storedDelayFeedback:r,storedDelayTime:o,storedDelayMix:s,storedFilterFreq:d,storedFilterRes:0,storedRingModFreq:u,storedRingModWave:0,isPlaying:!1}),w=Object(i.useCallback)(G()(e=>t=>q(e,t)),[]),q=(e,t)=>{R(n=>({...n,[e]:t}))};Object(i.useEffect)(()=>{b.playbackRate=j.storedRate},[j.storedRate]),Object(i.useEffect)(()=>{E.gain.rampTo(Math.pow(j.storedAmp,2),.2)},[j.storedAmp]),Object(i.useEffect)(()=>{v.carrFreq(j.storedRingModFreq)},[j.storedRingModFreq]),Object(i.useEffect)(()=>{v.modWave(j.storedRingModWave)},[j.storedRingModWave]),Object(i.useEffect)(()=>{F.frequency.rampTo(j.storedFilterFreq,.2)},[j.storedFilterFreq]),Object(i.useEffect)(()=>{F.Q.rampTo(j.storedFilterRes,.2)},[j.storedFilterRes]),Object(i.useEffect)(()=>{x.feedback(j.storedDelayFeedback)},[j.storedDelayFeedback]),Object(i.useEffect)(()=>{x.delayTime(j.storedDelayTime)},[j.storedDelayTime]),Object(i.useEffect)(()=>{x.wet.rampTo(j.storedDelayMix,.2)},[j.storedDelayMix]);const[k,S]=Object(i.useState)(200);Object(i.useEffect)(()=>(b.buffer=t,b.loop=n,b.playbackRate=a,function(){b.disconnect(),E.disconnect(),x.disconnect(),F.disconnect(),v.disconnect()}),[]),Object(i.useEffect)(()=>S(m.current.clientWidth),[k]);return Object(i.useEffect)(()=>{j.isPlaying?b.start():b.stop()},[j.isPlaying]),c.a.createElement(p,null,c.a.createElement("div",{ref:m},c.a.createElement(g,null,c.a.createElement(h,null,"FILE VIEW")),c.a.createElement(g,null,c.a.createElement(A,{states:["Start","Stop"],isToggled:j.isPlaying,onClick:()=>{R(e=>({...e,isPlaying:!e.isPlaying}))}}),c.a.createElement(T,{onSliderChange:w("storedRate"),value:j.storedRate,labelText:"Rate",min:0,max:2,totalWidth:k}),c.a.createElement(T,{onSliderChange:w("storedAmp"),value:j.storedAmp,labelText:"Amplitude",min:0,max:1,totalWidth:k,logScale:!0})),c.a.createElement(g,null,c.a.createElement(h,null,"OSCILLATOR"),c.a.createElement(y,null,"RING MODULATOR"),c.a.createElement(T,{onSliderChange:w("storedRingModFreq"),value:j.storedRingModFreq,labelText:"Frequency",min:50,max:2e3,totalWidth:k}),c.a.createElement(C,{onRadioChange:w("storedRingModWave"),active:j.storedRingModWave,totalWidth:k})),c.a.createElement(g,null,c.a.createElement(h,null,"FILTER"),c.a.createElement(O.d,{size:[20,22]}),"[FILTER TYPE]",c.a.createElement(T,{onSliderChange:w("storedFilterFreq"),value:j.storedFilterFreq,labelText:"Frequency",min:20,max:2e4,totalWidth:k}),c.a.createElement(T,{onSliderChange:w("storedFilterRes"),value:j.storedFilterRes,labelText:"Resonance",min:0,max:100,totalWidth:k})),c.a.createElement(g,null,c.a.createElement(h,null,"EFFECTS"),c.a.createElement(T,{onSliderChange:w("storedDelayTime"),value:j.storedDelayTime,labelText:"Delay time",min:0,max:2,totalWidth:k}),c.a.createElement(T,{onSliderChange:w("storedDelayFeedback"),value:j.storedDelayFeedback,labelText:"Feedback",min:0,max:1,totalWidth:k}),c.a.createElement(T,{onSliderChange:w("storedDelayMix"),value:j.storedDelayMix,labelText:"Mix",min:0,max:1,totalWidth:k}))))}const Q={fallout:"https://res.cloudinary.com/boonier/video/upload/v1590514578/soundscaperesq/fallout.wav",dynamite:"https://res.cloudinary.com/boonier/video/upload/v1590514555/soundscaperesq/dynamite.wav",drone:"https://res.cloudinary.com/boonier/video/upload/v1590514554/soundscaperesq/drone.wav"},U=b.a.section(L||(L=Object(u.a)(["\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  grid-gap: 10px;\n"])));function V(){const[e,t]=Object(i.useState)(!1),n=Object(i.useRef)(new f.a.Buffers(Q,()=>t(!0))).current;return c.a.createElement("div",{className:"App"},c.a.createElement("h1",null,"SoundScaperesq v0.1.0"),e?c.a.createElement(U,null,c.a.createElement(J,{source:n.get("dynamite"),amp:1,rate:1,delayMix:.2,loop:!0}),c.a.createElement(J,{source:n.get("drone"),amp:.4,loop:!0}),c.a.createElement(J,{source:n.get("fallout"),rate:.5,loop:!0})):c.a.createElement("div",null,"Loading sounds..."))}const Y=document.getElementById("root");d.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(V,null)),Y)}},[[15,1,2]]]);
//# sourceMappingURL=main.8905ee6a.chunk.js.map