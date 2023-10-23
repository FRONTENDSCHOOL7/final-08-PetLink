import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ChatPage from './Pages/ChatPage/Chat';
import LoginPage from './Pages/LoginPage/Login';
import JoinPage from './Pages/JoinPage/Join';
import CommunityPage from './Pages/CommunityPage/Community';
import HomePage from './Pages/HomePage/Home';
import MarketPage from './Pages/MarketPage/Market';
import ProfilePage from './Pages/ProfilePage/Profile';
import FollowPage from './Pages/FollowPage/FollowList';
import ErrorPage from './Pages/ErrorPage/Error404';
import SplashPage from './Pages/Splashpage/Splash';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/market" element={<MarketPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/follow" element={<FollowPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;