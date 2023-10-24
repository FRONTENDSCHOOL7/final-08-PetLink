import React from 'react'
import {Nav, NavLink,NavText,NavImg}from'./TabMenu.style'
import HomeIcon  from '../../../assets/image/icon-home.png'
import CommunityIcon from '../../../assets/image/icon-community.png'
import MarketIcon from '../../../assets/image/icon-market.png'
import ChatIcon from '../../../assets/image/icon-chatting.png'
import UserIcon from '../../../assets/image/icon-user.png'


export default function TabMenu() {

  return (
<>
    <Nav className='nav'>
          <NavLink href='/' >
             <NavImg src={HomeIcon} />
             <NavText >홈</NavText>
           </NavLink>
           <NavLink href="/community" >
             <NavImg src={CommunityIcon} />
             <NavText>커뮤니티</NavText>
           </NavLink>
           <NavLink href="/market" >
             <NavImg src={MarketIcon} />
             <NavText >반결장터</NavText>
           </NavLink>
           <NavLink href="/chat" >
             <NavImg src={ChatIcon} />
             <NavText >채팅</NavText>
           </NavLink>
           <NavLink href="/profile" >
             <NavImg src={UserIcon} />
             <NavText >프로필</NavText>
           </NavLink>
        </Nav>
</>
)
}

