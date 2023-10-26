import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const ChatList = styled.div`
  margin-bottom: 25px;
  display: flex;
  gap: 12px;

  img{ 
    width: 42px;
    height: 42px;
  }
`

const ChatListTxt = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;


  h2 {
    font-size: 14px;
  }

  p {
    font-size: 12px;
    color: #767676;
  }
`

const ChatContents = styled.p`
  font-size: 10px;
  color: #767676;
  display: flex;
  justify-content: space-between;
`

export function ChatItem({id, imgSrc, nickname, content, date}) {
  return(
    <Link to={`/chatroom/${id}`}>
      <ChatList>
        <img src={imgSrc} alt={`${nickname}의 프로필 이미지`} />
        <ChatListTxt>
          <h2>{nickname}</h2>
          <ChatContents>
            <p>{content}</p>
            <p>{date}</p>
          </ChatContents>
        </ChatListTxt>
      </ChatList>
    </Link>
  )
}