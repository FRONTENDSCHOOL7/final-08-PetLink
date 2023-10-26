import React from 'react'
import profile1 from '../../assets/image/icon-basic-profile.png'
import profile2 from '../../assets/image/icon-test-user-profile.png'
import profile3 from '../../assets/image/icon-test-user-profile2.png'
import { GlobalStyle, Container } from '../../Styles/reset.style'
import {ChatItem} from '../../Components/Chat/ChatList'

import styled from 'styled-components';
import TabMenu from '../../Components/Common/TabMenu/TabMenu'

const PageTitle = styled.h1`
  font-size: 20px;
  color: #004E98;
  padding: 13px;
  border-bottom: 1px solid #DBDBDB;
`

const ChatListContainer = styled.div`
  width: 100%;
  padding: 24px 16px;
`


export default function Chat() {
  const chatData = [
    {id: 1, imgSrc: profile1, nickname: "뭉치의 일상", content: "혹시 강아지 옷 팔렸나요?", date: "2023.11.10"},
    {id: 2, imgSrc: profile2, nickname: "쿠키의 일상", content: "혹시 고양이 옷 팔렸나요?", date: "2023.11.09"},
    {id: 3, imgSrc: profile3, nickname: "아지의 일상", content: "안녕하세요~", date: "2023.11.08"}
  ]

  return (
    <>
      <GlobalStyle/>
      <Container> 
      <PageTitle>채팅</PageTitle>
        <ChatListContainer>
          {chatData.map(chat => (
            <ChatItem key={chat.id} {...chat} />
          ))}
        </ChatListContainer>
        <TabMenu/>
      </Container>
    </>
  )
}
