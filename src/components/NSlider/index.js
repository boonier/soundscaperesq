import React from "react";
import { Slider, Number } from "react-nexusui";
import styled from "styled-components";
const NSliderContainer = styled.div`
  margin: 10px 0;
`;

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function NSlider({
  labelText,
  onSliderChange,
  value,
  logScale,
  ...props
}) {
  return (
    <NSliderContainer>
      <div>{labelText}</div>
      <Inner>
        <Slider // playback rate
          size={[180, 14]}
          value={value}
          onChange={onSliderChange}
          {...props}
        />
        <Number
          value={logScale ? Math.pow(value, 2) : value}
          size={10}
          {...props}
        />
      </Inner>
    </NSliderContainer>
  );
}
