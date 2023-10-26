import {createGlobalStyle} from 'styled-components'
import styled from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  @font-face {
  font-family: '116watermelon';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.0/116watermelon.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  }

  body, div, span, h1, h2, h3, h4, h5, h6, p, ol, ul, li, button, img, strong, fieldset, form, label, nav, header, footer, section, article {
    margin: 0;
    padding: 0;
  }
  
  * {
    box-sizing: border-box;
  }

  body {
    background-color: #e9e9e9;
    font-family: '116watermelon', 'Nanum Gothic', sans-serif;
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
  height: 100vh;
  max-width: 390px;
  margin: 0 auto;
  background-color: white;
`;