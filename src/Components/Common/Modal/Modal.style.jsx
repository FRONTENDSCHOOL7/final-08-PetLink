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

export const ModalAlertText = styled.div`
  padding: 27px 0; 
  border-bottom: 1px solid #DADADA;
  text-align: center;
  font-size: 15px;
  font-weight: 400;
  line-height: 23.435px;
  letter-spacing: 0.146px;
  flex-grow: 1;  
  display: flex;
  align-items: center;  
  justify-content: center; 
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: space-between; 
  width: 100%;
  padding: 16px 39px;  
`;

export const ModalButton = styled.button`
  width: 90px;
  height: 38px;
  border-radius: 44px;
  border: none;
  background-color: ${props => props.$isConfirm ? '#004E98' : '#7299BE'};
  color: white;
  cursor: pointer;
`;