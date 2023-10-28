import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #fafafa;
`;

export const FormWrapper = styled.div`
    background-color: white;
    padding: 20px;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
`;

export const Logo = styled.h1`
    font-size: 36px;
    text-align: center;
`;

export const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #dbdbdb;
    border-radius: 4px;
    font-size: 14px;
`;

export const Button = styled.button`
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #3897f0;
    color: white;
    font-size: 14px;
    cursor: pointer;
`;

export const Modal = styled.div`
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ModalContent = styled.div`
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    text-align: center;
`;

export const CloseButton = styled.span`
    color: #aaa;
    float;
`;

// 새로운 스타일 컴포넌트 추가
export const TitleWrap = styled.div`
  font-size: 30px;
  margin-bottom: 20px;
  text-align: center;
  padding-top: 50px;
`;

export const SubmitButton = styled.button`
  width: 90%;
  height: 50px;
  border-radius: 50px;
  background-color: #004e98;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border: none;
  margin: auto;
  margin-bottom: 20px;
  display: block;
`;

export const InputField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 0 20px;
`;

export const StyledInput = styled.input`
  padding: 10px;
  border: none;
  border-bottom: 1px solid #dbdbdb;
  font-size: 16px;
  margin-top: 5px;
  width: 100%;
  
  &:focus {
    outline: none;
    border-bottom: 2px solid #004E98;
  }
  
  &::placeholder {
    color: #dbdbdb;
  }
`;

export const FieldLabel = styled.label`
  font-size: 14px;
  color: #767676;
`;

export const PetInfo = styled.div`
font-size: 14px;
`;

export const Styledpetinfo = styled.h2`
font-size: 14px;
`;