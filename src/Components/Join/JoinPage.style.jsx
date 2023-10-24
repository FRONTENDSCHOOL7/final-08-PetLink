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
    font-family: 'Pacifico', cursive;
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