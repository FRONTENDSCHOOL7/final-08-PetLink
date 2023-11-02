import React, { useEffect, useRef, useState } from 'react'
import { Container, GlobalStyle } from '../../Styles/reset.style'
import { ChatContent, ChatInput, ChatInputBar, ChatMessage, ChatRoomContents, ChatTime, Overlay, SendBtn, UserImg, AddImgBtn } from './ChatRoom.style'
import BottomModal from '../../Components/Common/Modal/BottomModal';
import userImg from '../../assets/image/icon-basic-profile.png' 
import profile1 from '../../assets/image/icon-basic-profile.png'
import profile2 from '../../assets/image/icon-test-user-profile.png'
import profile3 from '../../assets/image/icon-test-user-profile2.png'
import addImgBtn from '../../assets/image/icon-img-button.png'
import { useParams } from 'react-router-dom';
import HeaderLayouts from '../../Components/Common/Header/Header';


const chatUserData = [
  {id: 1, imgSrc: profile1, nickname: "시루", content: "혹시 팔렸나요?", date: "2023.11.10", unread: true, sender: 'other'},
  {id: 2, imgSrc: profile2, nickname: "바람돌이", content: "구매 가능할까요?", date: "2023.11.09", unread: true, sender: 'other'},
  {id: 3, imgSrc: profile3, nickname: "흰둥이", content: "안녕하세요~", date: "2023.11.08", unread: false, sender: 'other'}
]

export default function ChatRoom() {
  const {id} = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [chatData, setChatData] = useState({})
  const chatRoomRef = useRef(null);

  useEffect(() => {
    // id에 기반한 데이터 로딩
    const data = chatUserData.find(user => user.id === parseInt(id));
    if (data) {
      setChatData(data);
      setMessages(chatUserData.filter(message => message.id === parseInt(id)));
    }
  }, [id]);

  useEffect(() => {
    // 스크롤을 가장 아래로 이동
    if(chatRoomRef.current) {
      chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight;
    }
  }, [messages]);

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
        time: new Date().toLocaleTimeString('ko-KR', {hour12: false, hour: '2-digit', minute: '2-digit'}), // hour12: false => 24시간 형식 사용
        sender: 'me'
      };
      console.log("New Message:", newMessage); // 새 메시지 확인

      setMessages(currentMessages => [...currentMessages, newMessage]); // 새 메시지 추가
      console.log("Updated Messages:", messages); // 업데이트된 메시지 목록 확인
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
          time: new Date().toLocaleTimeString('ko-KR', { hour12: false, hour: '2-digit', minute: '2-digit' }),
          sender: 'me'
        };
        setMessages(currentMessages => [...currentMessages, newMessage]);
      };
      reader.readAsDataURL(file); // 파일의 데이터 문자열로 표현
    }
  }

  const reportOptions = [
    {action: "채팅방 나가기", alertText: "채팅방 나가시겠습니까?"}
  ]

  // 첫 번째 메시지만 현재 채팅방 id와 일치하는 경우 필터링
  const firstMessage = chatUserData.find((message, index) => index === 0 && message.id === parseInt(id));
  
  return (
    <>
      <GlobalStyle/>
      <Container>
        <HeaderLayouts backTxt={true} txt={chatData.nickname} onModalToggle={() => setIsModalOpen(true)} />

        {/* 채팅 내용 */}
        <ChatRoomContents ref={chatRoomRef}>
        {messages.map((message, index) => (
          <ChatContent key={message.id} isFirst={index === 0}>
            {message.sender === 'other' ? (
              // 상대방이 보낸 메시지
              <>
                <UserImg src={chatData.imgSrc} alt='프로필 이미지' />
                <ChatMessage radius="0 22px 22px 22px" isFirst={index === 0} hasImage={Boolean(message.img)}>
                  {message.content}
                  {message.img && (
                    <img 
                      src={message.img} 
                      alt="첨부 이미지" 
                      style={{ maxWidth: '240px', maxHeight: '240px', display: 'block', marginTop: '10px', objectFit: 'contain'}}
                    />
                  )}
                </ChatMessage>
                <ChatTime>{message.time}</ChatTime>
              </>
            ) : (
              // 내가 보낸 메시지
              <>
                <ChatTime>{message.time}</ChatTime>
                <ChatMessage radius="22px 0 22px 22px" isFirst={index === 0} hasImage={Boolean(message.img)}>
                  {message.text}
                </ChatMessage>
                {message.img && (
                  <img 
                    src={message.img} 
                    alt="첨부 이미지" 
                    style={{ maxWidth: '240px', maxHeight: '240px', display: 'block', marginTop: '10px', objectFit: 'contain'}}
                  />
                )}
              </>
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
