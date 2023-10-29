import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

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

const UnreadIndicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: red;
  position: absolute;
  top: 0;
  left: 0;
`

export function ChatItem({id, imgSrc, nickname, content, date, unread, onRead}) {

  return(
    <StyledLink to={`/chatroom/${id}`} onClick={()=> onRead()}>
      <ChatList>
        <div style={{position: "relative"}}>
          <img src={imgSrc} alt={`${nickname}의 프로필 이미지`} />
          {unread && <UnreadIndicator />}
        </div>
        <ChatListTxt>
          <h2>{nickname}</h2>
          <ChatContents>
            <p>{content}</p>
            <p>{date}</p>
          </ChatContents>
        </ChatListTxt>
      </ChatList>
    </StyledLink>
  )
}