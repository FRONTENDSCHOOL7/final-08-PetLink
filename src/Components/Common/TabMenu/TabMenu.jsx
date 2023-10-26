import React from 'react'
import {Nav, NavLink,NavText,NavImg}from'./TabMenu.style'
import HomeIcon  from '../../../assets/image/icon-home.png'
import CommunityIcon from '../../../assets/image/icon-community.png'
import MarketIcon from '../../../assets/image/icon-market.png'
import ChatIcon from '../../../assets/image/icon-chatting.png'
import UserIcon from '../../../assets/image/icon-user.png'
import { Router, useLocation } from 'react-router-dom'
import { GlobalStyle } from '../../../Styles/reset.style'



export default function TabMenu() {
  const location = useLocation();

  const hideNavBarPaths = [
    '/login',
    '/join',
    '/upload',
    '/post/detail',
    '/follow',
  ];

  const shouldShowNavbar = !hideNavBarPaths.includes(location.pathname);

  return (
    <>
      <GlobalStyle/>
      {shouldShowNavbar && (
        <Nav >
          <NavLink to='/home' >
            <NavImg src={HomeIcon} />
            <NavText >홈</NavText>
          </NavLink>
          <NavLink to="/community" >
            <NavImg src={CommunityIcon} />
            <NavText>커뮤니티</NavText>
          </NavLink>
          <NavLink to="/market" >
            <NavImg src={MarketIcon} />
            <NavText >반결장터</NavText>
          </NavLink>
          <NavLink to="/chat" >
            <NavImg src={ChatIcon} />
            <NavText >채팅</NavText>
          </NavLink>
          <NavLink to="/profile" >
            <NavImg src={UserIcon} />
            <NavText >프로필</NavText>
          </NavLink>
        </Nav>
      )}
    </>
    )
}

