import React from 'react'
import './navBar.css'
import icoHome from '../../assets/images/icon-home.png'
import icoCommunity from '../../assets/images/icon-community.png'
import icoMarket from '../../assets/images/icon-market.png'
import icoChatting from '../../assets/images/icon-chatting.png'
import icoUser from '../../assets/images/icon-user.png'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
export default function NavBar() {
  return (
    <nav className='nav'>
S          <a href="/" className='nav-link active'>
            <img src={icoHome} />
            <span className='nav-text'>홈</span>
          </a>
          <a href="#" className='nav-link '>
            <img src={icoCommunity} />
            <span className='nav-text'>커뮤니티</span>
          </a>
          <a href="#" className='nav-link'>
            <img src={icoMarket} />
            <span className='nav-text'>반결장터</span>
          </a>
          <a href="#" className='nav-link'>
            <img src={icoChatting} />
            <span className='nav-text'>채팅</span>
          </a>
          <a href="#" className='nav-link'>
            <img src={icoUser} />
            <span className='nav-text'>프로필</span>
          </a>

        </nav>
  )
}
