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
    background-color: #e9e9e9;
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
  max-width: 390px;
  margin: 0 auto;
  background-color: white;
`;