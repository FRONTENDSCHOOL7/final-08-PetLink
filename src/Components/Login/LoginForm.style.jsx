import styled from 'styled-components';

export const TitleWrap = styled.h1`
  font-size: 25px;
  margin-bottom: 20px;
  text-align: center;
  padding-top: 50px;

  @media (min-width: 768px) {
    font-size: 30px;
  }
`;

export const SubmitButton = styled.button`
  width: 90%;
  height: 40px;
  border-radius: 50px;
  background-color: ${(props) => (props.disabled ? "#7299BE" : "#004e98")};
  color: white;
  font-size: 14px;
  border: none;
  margin: 30px auto 20px;
  display: block;
  transition: background-color 0.3s ease; /* Optional: for a smooth color transition */

  @media (min-width: 768px) {
    font-size: 16px;
    height: 50px;
  }
`;

export const InputField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 0 20px;
`;

export const StyledInput = styled.input`
  padding: 10px 0 5px;
  border: none;
  border-bottom: 1px solid #DBDBDB;
  font-size: 14px;
  margin-bottom: 5px;
  width: 100%;

  @media (min-width: 768px) {
    font-size: 16px;
  }
  
  &:focus {
    outline: none;
    border-bottom: 2px solid #004E98;
  }
  
  &::placeholder {
    color: #DBDBDB;
  }
`;

export const FieldLabel = styled.label`
  font-size: 14px;
  color: #767676;
  position: relative;

  &:after {
    content: '*';
    color: red;
    position: absolute;
    margin-left: 2px;
    margin-top: -3px;
    top: 0;
  }

  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

export const Label = styled.label`
  font-size: 14px;
  color: #767676;
  position: relative;
`

export const ErrorMsg = styled.p`
  color: red;
  font-size: 12px;
  
`