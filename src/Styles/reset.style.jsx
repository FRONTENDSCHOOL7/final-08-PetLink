import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`

  body, div, span, h1, h2, h3, h4, h5, h6, p, ol, ul, li, button, img, strong, fieldset, form, label, nav, header, footer, section, article {
    margin: 0;
    padding: 0;
  }
  
*{
  box-sizing: border-box;
}

  body {
    background-color: #e9e9e9;
    font-family: 'Nanum Gothic', sans-serif;
    // display: flex;
    // justify-content: center;
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
`;