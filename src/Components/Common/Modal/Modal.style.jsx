import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContainer = styled.div`
  width: 297px;
  height: 151px;
  background-color: white;
  border: 1px solid #DADADA;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ModalAlertText = styled.div `
  padding: 27px;
  border-bottom: 1px solid #DADADA;
  text-align: center;
  font-size: 15px;
  font-weight: 400;
  line-height: 23.435px; /* 156.235% */
  letter-spacing: 0.146px;
`;

export const ModalButtonContainer = styled.button`
  display: flex;
  justify-content: center; // 가로 방향 중앙 정렬
  width: 100%; // 전체 너비를 차지하도록 설정
  padding: 10px 0; 
`

export const ModalButton = styled.button`
  width: 90px;
  height: 38px;
  border-radius: 44px;
  border: none;
  background-color: #7299BE;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;