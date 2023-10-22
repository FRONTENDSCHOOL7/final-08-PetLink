import React, { useState } from 'react'
import './navBar.css'
import icoHome from '../../assets/images/icon-home.png'
import icoCommunity from '../../assets/images/icon-community.png'
import icoMarket from '../../assets/images/icon-market.png'
import icoChatting from '../../assets/images/icon-chatting.png'
import icoUser from '../../assets/images/icon-user.png'
import HomePage from '../HomePage/HomePage'
import ProfilePage from '../ProfilePage/ProfilePage'
import ChatPage from '../ChatPage/ChatPage'
import MarketPage from '../MarketPage/MarketPage'
import CommunityPage from '../CommunityPage/CommunityPage'


export default function NavBar() {
  const [page, setPage] = useState('/');
  const handlePage = (newPage) => {
      setPage(newPage);
  }
  
  return (
<>
 
  {/* {page === '/' && <HomePage handlePage={() => handlePage('/')} />}
  {page === 'community' && <CommunityPage handlePage={() => handlePage('community')} />}
  {page === '/market' && <MarketPage handlePage={() => handlePage('market')} />}
  {page === '/chat' && <ChatPage handlePage={() => handlePage('chat')} />}
  {page === '/profile' && <ProfilePage handlePage={() => handlePage('profile')} />} */}
    <nav className='nav'>
          <a href='/' className='nav-link active'>
             <img src={icoHome} />
             <span className='nav-text'>홈</span>
           </a>
           <a href="/community" className='nav-link '>
             <img src={icoCommunity} />
             <span className='nav-text'>커뮤니티</span>
           </a>
           <a href="/market" className='nav-link'>
             <img src={icoMarket} />
             <span className='nav-text'>반결장터</span>
           </a>
           <a href="/chat" className='nav-link'>
             <img src={icoChatting} />
             <span className='nav-text'>채팅</span>
           </a>
           <a href="/profile" className='nav-link'>
             <img src={icoUser} />
             <span className='nav-text'>프로필</span>
           </a>
        </nav>
</>
)
}
