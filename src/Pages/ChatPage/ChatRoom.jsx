import React, { useEffect, useState } from 'react'
import { Container, GlobalStyle } from '../../Styles/reset.style'
import { ChatContent, ChatInput, ChatInputBar, ChatMessage, ChatRoomContents, ChatTime, Header, HeaderButton, Overlay, SendBtn, UserImg, AddImgBtn } from './ChatRoom.style'
import BottomModal from '../../Components/Common/Modal/BottomModal';
import backBtn from '../../assets/image/icon-arrow-left.png'
import moreBtn from '../../assets/image/icon-more-vertical.png'
import userImg from '../../assets/image/icon-basic-profile.png' 
import addImgBtn from '../../assets/image/icon-img-button.png'
import { useNavigate, useParams } from 'react-router-dom';


export default function ChatRoom() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const {id} = useParams();

  const messages = [
    {id:1, text:"안녕하세요", time: "12:39"},
    {id:2, text:"누구세요", time: "12:50"},
    {id:3, text:"웅냥냥냥냥냥냥냥", time: "12:53"},
    {id:4, text:"웅냥냥냥냥냥냥냥", time: "12:53"}, // 이미지 추가
  ]

  useEffect(()=> {
    console.log(`채팅방 ID: ${id}`)
  }, [id])

  return (
    <>
      <GlobalStyle/>
      <Container>
        <Header>
          <HeaderButton onClick={()=>navigate(-1)}><img src={backBtn} alt="" /></HeaderButton>
          <HeaderButton onClick={()=>setIsModalOpen(true)}><img src={moreBtn} alt="" /></HeaderButton>
        </Header>

        <ChatRoomContents>
          {messages.map((message, index)=>(
            <ChatContent key={message.id} isFirst={index === 0}>
              {index === 0 ? (
                <>
                  <UserImg src={userImg} alt='프로필 이미지' />
                  <ChatMessage radius="0 22px 22px 22px" isFirst={index === 0}>{message.text}</ChatMessage>
                  <ChatTime>{message.time}</ChatTime>
                </>
              ) : (
                <>
                  <ChatTime>{message.time}</ChatTime>
                  <ChatMessage radius="22px 0 22px 22px" isFirst={index === 0}>{message.text}</ChatMessage>
                </>
              )}
            </ChatContent>
          ))}

          <ChatInputBar>
            <AddImgBtn>
              <img src={addImgBtn} alt="" />
            </AddImgBtn>
            <ChatInput placeholder='메시지 입력하기...' />
            <SendBtn $active={isActive}>전송</SendBtn>
          </ChatInputBar>
        </ChatRoomContents>

        {isModalOpen && (
          <>
            <Overlay onClick={()=> setIsModalOpen(false)}/>
            <BottomModal/>
          </>
        )}
      </Container>
    </>
  )
}
