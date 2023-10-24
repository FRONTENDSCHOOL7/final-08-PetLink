import { BrowserRouter, Routes, Route } from "react-router-dom";
import Market from "./Pages/MarketPage/Market";
import MarketDetail from "./Pages/MarketPage/MarketDetail";
import { GlobalStyle } from "./Styles/reset.style";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Market/>}/>
        <Route path="/market/detail" element={<MarketDetail/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
