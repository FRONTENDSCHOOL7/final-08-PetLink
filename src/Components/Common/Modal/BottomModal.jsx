import React from 'react'
import styled, { keyframes } from 'styled-components'
import { GlobalStyle } from '../../../Styles/reset.style'

const slideUp = keyframes`
  from {
    transform: translateY(100%); // 처음 상태: 화면 아래
  }
  to {
    transform: translateY(0);    // 최종 상태: 원래 위치
  }
`;

const BottomModalContainer = styled.div`
  position: fixed;
  bottom: 60px;
  width: 100%;
  max-width: 390px;
  height: 92px;
  padding: 1em 2em;
  background-color: white;
  border: 1px solid #e9e9e9;
  border-radius: 10px 10px 0 0;
  z-index: 20;

  animation: ${slideUp} 0.2s ease-out forwards;
`

const Report = styled.p`
  color: red;
  font-size: 14px;
  position: relative;
  padding-top: 20px;
  display: inline-block;
  width: 100%;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 3px;
    width: 100px;
    background-color: #cccccc;
  }
`


export default function BottomModal() {
  return (
    <>
      <GlobalStyle/>
      <BottomModalContainer>
        <Report>신고하기</Report>
      </BottomModalContainer>
    </>
  )
}
