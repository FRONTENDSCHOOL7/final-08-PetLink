import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { GlobalStyle } from '../../../Styles/reset.style'
import PopupModal from './PopupModal';

// 슬라이드업 애니메이션
const slideUp = keyframes`
  from {
    transform: translateY(100%); // 처음 상태: 화면 아래
  }
  to {
    transform: translateY(0);    // 최종 상태: 원래 위치
  }
`;

const BottomModalContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 390px;
  padding: 1em 2em;
  background-color: white;
  border: 1px solid #e9e9e9;
  border-radius: 10px 10px 0 0;
  z-index: 20;

  animation: ${slideUp} 0.2s ease-out forwards;
`

// 버튼 스타일링
const Report = styled.button`
  color: red;
  font-size: 14px;
  text-align: left;
  position: relative;
  padding: 20px 0;
  display: inline-block;
  width: 100%;
  height: 50px;

  &::before {
    content: ${props => props.$first ? '""' : 'none'};
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 3px;
    width: 100px;
    background-color: #cccccc;
  }
`


export default function BottomModal({reports, setIsModalOpen}) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [alertText,setAlertText] = useState("");

  const handleReportClick = (alertText) => {
    setAlertText(alertText); 
    setIsPopupVisible(true); // 팝업 모달 표시
  }

  const handlePopupClose = () => {
    setIsPopupVisible(false); // 팝업 모달 숨기기
    setIsModalOpen(false); // 하단 모달 숨기기
  }
  
  return (
    <>
      <GlobalStyle/>
      <BottomModalContainer>
        {reports.map((report, index) => (
          <Report key={index} $first={index === 0} onClick={()=>handleReportClick(report.alertText)}>{report.action}</Report>
        ))}
      </BottomModalContainer>

      <PopupModal
        isVisible={isPopupVisible}
        setIsVisible={handlePopupClose}
        alertText={alertText}
        cancelText="취소"
        confirmText="확인"
        onConfirm={handlePopupClose}
        onCancel={handlePopupClose}
      />
    </>
  )
}
