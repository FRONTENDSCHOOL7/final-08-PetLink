import React, { useState } from 'react'
import profile1 from '../../assets/image/img-user-siroo.jpg'
import profile2 from '../../assets/image/img-user-windy.png'
import profile3 from '../../assets/image/img-user-whiteDog.jpg'
import { GlobalStyle, Container } from '../../Styles/reset.style'
import {ChatItem} from '../../Components/Chat/ChatList'

import styled from 'styled-components';
import TabMenu from '../../Components/Common/TabMenu/TabMenu'
import HeaderLayouts from '../../Components/Common/Header/Header'
import { Link } from 'react-router-dom'


const ChatListContainer = styled.div`
  width: 100%;
  padding: 24px 16px;
`


export default function Chat() {
  const [chatData, setChatData] = useState([
    {id: 1, imgSrc: profile1, nickname: "시루", content: "혹시 팔렸나요?", date: "2023.11.10", unread: true},
    {id: 2, imgSrc: profile2, nickname: "바람돌이", content: "구매 가능할까요?", date: "2023.11.09", unread: true},
    {id: 3, imgSrc: profile3, nickname: "흰둥이", content: "안녕하세요~", date: "2023.11.08", unread: false}
  ])

  const handleReadMsg = (id) => {
    const updatedChats = chatData.map(chat => 
      chat.id === id ? {...chat, unread: false} : chat
    );
    setChatData(updatedChats)
  }

  return (
    <>
      <GlobalStyle/>
      <Container> 
      <HeaderLayouts title="채팅" />
        <ChatListContainer>
          {chatData.map(chat => (
            <Link to={{
              pathname: `/chatroom/${chat.id}`,
              state: {...chat}
            }} key={chat.id}
            >
              <ChatItem {...chat} onRead={()=>handleReadMsg(chat.id)}/>
            </Link>
          ))}
        </ChatListContainer>
        <TabMenu/>
      </Container>
    </>
  )
}
