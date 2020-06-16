import React from 'react';
import { RadioButton } from 'react-nexusui';
import styled from 'styled-components';

const NRadioContainer = styled.div`
  margin: 10px 0;
`;

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.div`
  font-size: 11px;
  margin-top: 3px;
`;

const NRadioLabelsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 160px;
`;

export default function NRadioButtons({
  labelText,
  onRadioChange,
  active,
  logScale,
  totalWidth,
  ...props
}) {
  // console.log(active);

  return (
    <NRadioContainer>
      <RadioButton
        size={[160, 13]}
        numberOfButtons={4}
        active={-1}
        onChange={onRadioChange}
        active={active}
      />
      <NRadioLabelsContainer>
        <Label>Sin</Label>
        <Label>Sqr</Label>
        <Label>Tri</Label>
        <Label>Saw</Label>
      </NRadioLabelsContainer>
    </NRadioContainer>
  );
}
