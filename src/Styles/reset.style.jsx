import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap');

  body, h1, ul, li, button, img, p, strong {
    margin: 0;
    padding: 0;
  }

  body {
    background-color: #e9e9e9;
    font-family: 'Nanum Gothic', sans-serif;
  }

  ul, li {
    list-style: none;
  }

  button {
    cursor: pointer;
    font-family: inherit;
    background: none;
    border: 0;
  }
`