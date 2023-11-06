import styled from "styled-components"

// 채팅방 컨테이너
export const ChatRoomContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 16px;
  overflow-y: auto;

  @media (min-width: 768px) {
    padding: 25px 0;
  }
`

// 채팅 컨테이너
export const ChatContent = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  margin-bottom: 10px;
  display: flex;
  gap: 12px;
  justify-content: ${props => props.isFirst ? "flex-start" : "flex-end"};

  @media (min-width: 768px) {
    padding: 0 25px;
  }
`

// 사용자 프로필
export const UserImg = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
`

// 채팅 메시지
export const ChatMessage = styled.p`
  font-size: 14px;
  max-width: 240px;
  padding: 12px;
  border: ${ props => props.hasImage ? "none" : "1px solid #C4C4C4"};
  border-radius: ${props => props.radius || "0"};
  background-color: ${props => props.hasImage ? "#transparent" : (props.isFirst ? "#transparent" : "#004E98")};
  color: ${props => props.isFirst && !props.hasImage ? "initial" : "white"};
`

// 채팅 시간
export const ChatTime = styled.span`
  margin-top: auto;
  font-size: 10px;
  color: #767676;
  justify-content: ${props => props.isFirst ? "flex-start" : "flex-end"};
`

// 채팅 입력 컨테이너
export const ChatInputBar = styled.div`
  width: 100%;
  max-width: 390px;
  height: 60px;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #DBDBDB;

  @media (min-width: 768px) {
    width: 100%;
    min-width: 768px;
    height: 80px;
  }
`

// 이미지 추가 버튼
export const AddImgBtn = styled.button`
  width: 70px;
  flex-shrink: 0;

  img {
    width: 36px;
    height: 36px;
  }
`

// 채팅 입력창
export const ChatInput = styled.input`
  flex-grow: 1;
  height: 100%;
  border: none;
  padding: 16px 0;
  font-size: 14px;

  &::placeholder {
    color: #C4C4C4;
  }

  &:focus {
    outline: none;
  }

  @media (min-width: 768px) {
    font-size: 16px;
  }
`

// 전송 버튼
export const SendBtn = styled.button`
  width: 65px;
  flex-shrink: 0;
  color: ${props => props.$active ? "#004E98" : "#C4C4C4" };
  font-size: 16px;
`

// 모달 클릭 시 배경화면 흐리게
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
`

export const PreviewOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto 60px;
  width: 100%;
  max-width: 390px; /* 혹은 '100%' */
  height: auto; /* 혹은 '100%' */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); /* 배경 반투명 */

  button {
    width: 30px;
  }

  @media (min-width: 768px) {
    width: 100%;
    max-width: 768px;
    margin: 0 auto 80px;
  }
`