import styled from 'styled-components';

export const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 100px auto;
  
  img {
    max-width: 100%;
    height: auto;
    margin-bottom: 10px;
  }
  
  img:last-child {
    margin-bottom: 0;
  }
`;

export const LoginButton = styled.button`
  background-color: transparent;
  color: grey;
  border: none;
  padding: 10px 5px 0;
  margin: 0;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: black;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  position: relative;
  left: -14px;
  justify-content: center; /* 버튼을 중앙으로 배치 */
  gap: 10px;
`;


export const Divider = styled.span`
  position: relative;
  top: 7px;
  color: grey;
  
`;