import React from 'react';
import styled from 'styled-components';

const TogBut = styled.button`
  background-color: #2bb;
  display: inline-block;
  border: none;
  padding: 0.7rem 1.5rem;
  margin: 0;
  text-decoration: none;
  color: #ffffff;
  font-family: sans-serif;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  appearance: none;
  border-radius: 8px;

  &:hover {
    background: #0053ba;
  }

  /* &:focus {
    outline: 1px solid #fff;
    outline-offset: -4px;
  } */

  &:active {
    transform: scale(0.96);
  }
`;

export default function ToggleButton({ isToggled, states, ...props }) {
  return <TogBut {...props}>{isToggled ? states[1] : states[0]}</TogBut>;
}
