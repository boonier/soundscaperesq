import styled from 'styled-components';

export const ScaperContainer = styled.div`
  display: block;
  border: 2px solid #ddd;
  padding: 8px;
`;

export const ScaperControlsSection = styled.section`
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 10px;
  &:last-child {
    border: none;
    padding-bottom: 0px;
    margin-bottom: 0px;
  }
`;

export const ScaperControlsTitle = styled.h2`
  font-weight: bold;
  font-size: 13px;
`;

export const ScaperControlsSubTitle = styled.h3`
  font-weight: bold;
  font-size: 11px;
  color: #848484;
`;
