import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from '../Pages/HomePage/Home';
import LoginPage from '../Pages/LoginPage/Login';
import JoinPage from '../Pages/JoinPage/Join';
import ChatPage from '../Pages/ChatPage/Chat';
import CommunityPage from '../Pages/CommunityPage/Community';
import CommunityUpload from '../Pages/CommunityPage/CommunityUpload'
import CommunityDetail from '../Components/Community/CommunityDetail'
import CommunityPostEdit from '../Pages/CommunityPage/CommunityPostEdit'
import MarketPage from '../Pages/MarketPage/Market';
import ProductDetail from '../Components/Product/ProductDetail';
import ProductEdit from '../Pages/MarketPage/ProductEdit';
import ProfilePage from '../Pages/ProfilePage/Profile';
import FollowerPage from '../Pages/FollowPage/FollowerList';
import FollowingPage from '../Pages/FollowPage/FollowingList';
import ErrorPage from '../Pages/ErrorPage/Error404';
import SplashPage from '../Pages/Splashpage/Splash';
import PostDetail from '../Components/Home/PostDetail';
import ProfileEdit from '../Components/Profile/ProfileEdit'
import AddProduct from '../Pages/MarketPage/AddProduct';
import ChatRoom from '../Pages/ChatPage/ChatRoom';
import Search from '../Pages/HomePage/Search';
import NewChatRoom from '../Pages/ChatPage/NewChatRoom';
import PostEdit from '../Components/Home/PostEdit'
import MyFeedEdit from '../Components/Profile/MyFeedEdit'
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="/post/edit/:postId" element={<PostEdit />} />
        <Route path="/search" element={<Search />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chatroom/:id" element={<ChatRoom />} />
        <Route path="/chatroom/newChat" element={<NewChatRoom />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/community/upload" element={<CommunityUpload />} />
        <Route path="/community/:postId" element={<CommunityDetail />} />
        <Route path="/community/edit/:postId" element={<CommunityPostEdit />} />
        <Route path="/market" element={<MarketPage />} />
        <Route path="/market/detail" element={<ProductDetail />} />
        <Route path="/market/:accountname" element={<MarketPage />} />
        <Route path="/market/detail/:productId" element={<ProductDetail />} />
        <Route path="/market/add-product" element={<AddProduct />} />
        <Route path="/market/edit/:productId" element={<ProductEdit />} />
        <Route path="/profile/" element={<ProfilePage />} />
        <Route path="/profile/:accountname" element={<ProfilePage />} />
        <Route path="/profile/:accountname/following" element={<FollowingPage />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />
        <Route path="/profile/edit/:postId" element={<MyFeedEdit />} />
        <Route path="/profile/:accountname/follower" element={<FollowerPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
