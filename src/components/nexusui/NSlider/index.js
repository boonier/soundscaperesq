import React from 'react';
import { Slider, Number } from 'react-nexusui';
import styled from 'styled-components';

const NSliderContainer = styled.div`
  margin: 10px 0;
`;

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.div`
  font-size: 11px;
`;

export default function NSlider({
  labelText,
  onSliderChange,
  value,
  logScale,
  totalWidth,
  ...props
}) {
  // console.log('rendering NSlider');

  return (
    <NSliderContainer>
      <Label>{labelText}</Label>
      <Inner>
        <Slider
          size={[totalWidth * 0.8, 14]}
          value={value}
          onChange={onSliderChange}
          {...props}
        />
        <Number
          value={logScale ? Math.pow(value, 2) : value}
          size={[totalWidth * 0.15, 22]}
          {...props}
        />
      </Inner>
    </NSliderContainer>
  );
}
