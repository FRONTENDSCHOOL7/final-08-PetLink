import React from 'react'
import { Container, GlobalStyle } from '../../Styles/reset.style'
import logoError from '../../assets/image/logo-error.png'

import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const ErrorContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  img {
    width: 150px;
    height: 150px;
  }

  p {
    color: #767676;
    font-size: 14px;
  }
`

const BackBtn = styled.button`
  width: 120px;
  height: 44px;
  font-weight: bold;
  color: white;
  background-color: #004E98;
  border-radius: 44px;
`

export default function Error404() {
  const navigate = useNavigate();
  return (
    <>
      <GlobalStyle/>
      <Container>
        <ErrorContainer>
          <img src={logoError} alt="에러 이미지" />
          <p>페이지를 찾을 수 없습니다. &#58;&#40;</p> 
          <BackBtn onClick={()=>navigate(-1)}>이전 페이지</BackBtn>
        </ErrorContainer>
      </Container>
    </>
  )
}
