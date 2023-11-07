import React, { useEffect, useRef, useState } from 'react'
import { Container, GlobalStyle } from '../../Styles/reset.style'
import { ChatContent, ChatInput, ChatInputBar, ChatMessage, ChatRoomContents, ChatTime, Overlay, SendBtn, UserImg, AddImgBtn, PreviewOverlay } from './ChatRoom.style'
import BtnClose from '../../assets/image/icon-close.png'
import BottomModal from '../../Components/Common/Modal/BottomModal';
import profile1 from '../../assets/image/img-user-siroo.jpg'
import profile2 from '../../assets/image/img-user-windy.png'
import profile3 from '../../assets/image/img-user-whiteDog.jpg'
import addImgBtn from '../../assets/image/icon-img-button.png'
import { useNavigate, useParams } from 'react-router-dom';
import HeaderLayouts from '../../Components/Common/Header/Header';


const chatUserData = [
  {id: 1, imgSrc: profile1, nickname: "시루", content: "혹시 팔렸나요?", time: "08:04", sender: 'other'},
  {id: 2, imgSrc: profile2, nickname: "바람돌이", content: "구매 가능할까요?", time: "10:25", sender: 'other'},
  {id: 3, imgSrc: profile3, nickname: "흰둥이", content: "안녕하세요~", time: "21:39", sender: 'other'}
]

export default function ChatRoom() {
  const {id} = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [chatData, setChatData] = useState({});
  const [imagePreview, setImagePreview] = useState(null); // 이미지 미리보기
  const chatRoomRef = useRef(null);
  const navigate = useNavigate();

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

   // 메시지 입력이 변경될 때 호출되는 함수 (이미지 미리보기 제거 로직 포함)
  const handleMessageChange = (e) => {
    setInputMessage(e.target.value);
    setIsActive(e.target.value.length > 0);
    // 사용자가 텍스트를 입력하기 시작하면 이미지 미리보기를 제거
    if (imagePreview && e.target.value) {
      setImagePreview(null);
    }
  };

  // 이미지 파일을 선택했을 때 호출되는 함수
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // 미리보기 이미지를 상태에 설정
        setImagePreview(reader.result);
        // 이미지가 준비되었으므로 전송 버튼을 활성화
        setIsActive(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = (e) => {
    if(imagePreview || inputMessage.trim()) { // 메시지의 앞 뒤 공백 제거
      const newMessage = {
        id: Date.now(),
        text: inputMessage,
        img: imagePreview,
        time: new Date().toLocaleTimeString('ko-KR', {hour12: false, hour: '2-digit', minute: '2-digit'}), // hour12: false => 24시간 형식 사용
        sender: 'me'
      };
      console.log("New Message:", newMessage); // 새 메시지 확인

      setMessages(currentMessages => [...currentMessages, newMessage]); // 새 메시지 추가
      console.log("Updated Messages:", messages); // 업데이트된 메시지 목록 확인
      setInputMessage(""); // 입력창 초기화
      setImagePreview(null); // 이미지 미리보기 상태 초기화
      setIsActive(false); // 전송 버튼 비활성화
    }
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // 줄바꿈 방지
      handleSendMessage();
    }
  }

  const reportOptions = [
    {
      action: "채팅방 나가기",
      alertText: "채팅방을 나가시겠습니까?",
      onSelect: () => navigate(-1)
    },
  ];
  
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
                onChange={handleImageChange}
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

        {/* 이미지 미리보기 */}
        {imagePreview && (
          <PreviewOverlay onClick={() => setImagePreview(null)}>
            <img src={imagePreview} alt="미리보기" style={{ maxWidth: '50%', maxHeight: '50%', objectFit: "contain" }} />
            <button onClick={() => setImagePreview(null)}>
              <img src={BtnClose} alt="닫기" />
            </button>
          </PreviewOverlay>
        )}

        {/* 모달창 */}
        {isModalOpen &&(
          <>
            <Overlay onClick={()=> setIsModalOpen(false)}/>
            <BottomModal 
              setIsModalOpen={setIsModalOpen} 
              reports={reportOptions}
              onLeave={() => navigate(-1)}
            />
          </>
        )}
      </Container>
    </>
  )
}
