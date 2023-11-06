import styled from "styled-components"


export const ChatRoomContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 16px;
  overflow-y: auto;
  height: calc(100vh - 108px);
`

export const ChatContent = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  margin-bottom: 10px;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`

export const UserImg = styled.img`
  width: 42px;
  height: 42px;
`

export const ChatMessage = styled.p`
  font-size: 14px;
  max-width: 240px;
  padding: 12px;
  border: ${ props => props.hasImage ? "none" : "1px solid #C4C4C4"};
  border-radius: 22px 0 22px 22px;
  background-color:${props => props.hasImage ? "#transparent" : (props.isFirst ? "#transparent" : "#004E98")};
  color: white;
`

export const ChatTime = styled.span`
  margin-top: auto;
  font-size: 10px;
  color: #767676;
  justify-content: ${props => props.isFirst ? "flex-start" : "flex-end"};
`

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

export const AddImgBtn = styled.button`
  width: 70px;
  flex-shrink: 0;

  img {
    width: 36px;
    height: 36px;
  }
`

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

export const SendBtn = styled.button`
  width: 65px;
  flex-shrink: 0;
  color: ${props => props.$active ? "#004E98" : "#C4C4C4" };
  font-size: 16px;
`

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
`