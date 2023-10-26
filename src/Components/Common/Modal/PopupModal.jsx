import React from 'react';
import { ModalOverlay, ModalContainer, ModalAlertText, ModalButtonContainer, ModalButton } from './Modal.style';

function PopupModal({ onConfirm, onCancel }) {
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalAlertText>작성을 취소하시겠습니까?</ModalAlertText>
          <ModalButtonContainer>
            <ModalButton onClick={onConfirm}>확인</ModalButton>
            <ModalButton onClick={onCancel}>취소</ModalButton>
          </ModalButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default PopupModal;
