import React, { useEffect, useState } from 'react'
import { Container, GlobalStyle } from '../../Styles/reset.style'
import { ChatContent, ChatInput, ChatInputBar, ChatMessage, ChatRoomContents, ChatTime, Overlay, SendBtn, UserImg, AddImgBtn } from './NewChatRoom.style'
import BottomModal from '../../Components/Common/Modal/BottomModal';
import userImg from '../../assets/image/icon-basic-profile.png' 
import addImgBtn from '../../assets/image/icon-img-button.png'
import { useLocation, useParams } from 'react-router-dom';
import HeaderLayouts from '../../Components/Common/Header/Header';


export default function NewChatRoom() {
  const {id} = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const location = useLocation();
  const chatPartnerUsername = location.state?.username;

  useEffect(()=> {
    console.log(`채팅방 ID: ${id}`)
  }, [id])

  const handleMessageChange = (e) => {
    setInputMessage(e.target.value);
    setIsActive(e.target.value.length > 0);
  };

  const handleSendMessage = (e) => {
    if(inputMessage.trim()) { // 메시지의 앞 뒤 공백 제거
      const newMessage = {
        id: Date.now(),
        text: inputMessage,
        img: null,
        time: new Date().toLocaleTimeString('ko-KR', {hour12: false, hour: '2-digit', minute: '2-digit'}) // hour12: false => 24시간 형식 사용
      };
      setMessages([...messages, newMessage]); // 새 메시지 추가
      setInputMessage(""); // 입력창 초기화
      setIsActive(false); // 전송 버튼 비활성화
    }
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // 줄바꿈 방지
      handleSendMessage();
    }
  }

  const handleInputFile = (e) => {
    const file = e.target.files[0];
    if(file) {
      const reader = new FileReader(); // FileReader => 비동기적으로 데이터를 읽기 위해 사용되는 객체
      reader.onloadend = () => { // 파일 읽기가 완료됐을 때 호출되는 이벤트 핸들러
        const newMessage = {
          id: Date.now(),
          text: "", // 텍스트는 비워둠
          img: reader.result, // 이미지 URL
          time: new Date().toLocaleTimeString('ko-KR', { hour12: false, hour: '2-digit', minute: '2-digit' })
        };
        setMessages([...messages, newMessage]);
      };
      reader.readAsDataURL(file); // 파일의 데이터 문자열로 표현
    }
  }

  const reportOptions = [
    {action: "채팅방 나가기", alertText: "채팅방 나가시겠습니까?"}
  ]
  
  return (
    <>
      <GlobalStyle/>
      <Container>
        <HeaderLayouts backTxt={true} txt={chatPartnerUsername} onModalToggle={() => setIsModalOpen(true)} />

        {/* 채팅 내용 */}
        <ChatRoomContents>
          {messages.map((message)=>(
            <ChatContent key={message.id} >
                {/* 내가 보낸 메시지 */}
                  <ChatTime>{message.time}</ChatTime>
                  <ChatMessage hasImage={Boolean(message.img)} >
                    {message.text}
                  </ChatMessage>
                  {message.img && (
                      <img 
                        src={message.img} 
                        alt="첨부 이미지" 
                        style={{ maxWidth: '240px', maxHeight: '240px', display: 'block', marginTop: '10px', objectFit: 'contain'}}
                      />
                    )}
            </ChatContent>
          ))}

          {/* 입력 및 전송 창 */}
          <ChatInputBar>

            {/* 파일 추가 버튼 */}
            <AddImgBtn>
              <label htmlFor='imgUpload' style={{cursor: "pointer"}}>
                <img src={addImgBtn} alt="파일 첨부" />
              </label>
              <input 
                type="file"
                id='imgUpload'
                style={{display: 'none'}}
                onChange={handleInputFile}
              />
            </AddImgBtn>

            {/* 메시지 입력창 */}
            <ChatInput 
              placeholder='메시지 입력하기...' 
              value={inputMessage}
              onChange={handleMessageChange}
              onKeyDown={handleKeyDown}
            />

            {/* 전송 버튼 */}
            <SendBtn 
              $active={isActive}
              onClick={handleSendMessage}
            >
              전송
            </SendBtn>

          </ChatInputBar>
        </ChatRoomContents>

        {/* 모달창 */}
        {isModalOpen &&(
          <>
            <Overlay onClick={()=> setIsModalOpen(false)}/>
            <BottomModal setIsModalOpen={setIsModalOpen} reports={reportOptions}/>
          </>
        )}
      </Container>
    </>
  )
}