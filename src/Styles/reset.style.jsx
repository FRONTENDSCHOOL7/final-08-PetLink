import {createGlobalStyle} from 'styled-components'
import styled from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Yeongdo-Rg';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2202-2@1.0/Yeongdo-Rg.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

  body, div, span, h1, h2, h3, h4, h5, h6, p, ol, ul, li, button, img, strong, fieldset, form, label, nav, header, footer, section, article, textarea {
    margin: 0;
    padding: 0;
    font-family: inherit;
  }
  
  * {
    box-sizing: border-box;
  }

  body {
    background-color: white;
    font-family: 'Nanum Gothic', sans-serif;
    overflow-y: scroll;
  }

  ol, ul {
    list-style: none;
  }

  button {
    cursor: pointer;
    font-family: inherit;
    background: none;
    border: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  
  input {
    border: none;
    outline: none;
  }
  
`

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  max-width: 390px; // 모바일 화면에 맞춘 너비
  margin: 0 auto;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); // 약한 그림자 효과
  overflow-x: hidden; // 컨테이너 밖으로 내용이 보이지 않도록 설정

  // 태블릿 화면
  @media (min-width: 768px) {
    max-width: 768px;
  }
`;

export const SubContainer = styled.div`
  padding: 20px 25px;
  margin-bottom: 30px;

  // 태블릿 화면
  @media (min-width: 768px) {
    padding: 30px 40px; // 태블릿 화면에서 패딩 증가
  }
`