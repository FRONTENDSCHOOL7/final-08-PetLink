import React from "react";
// import ReactDOM from 'react-dom'; //구버전
import { createRoot } from "react-dom/client";
import App from "./App";
import CommunityList from "./Components/Community/CommunityList"

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<CommunityList />);