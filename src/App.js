import React from 'react';
import Router from './Router/Router';
import { GlobalStyle } from "./Styles/reset.style";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
      </Router>
    </>
  );
}

export default App;
