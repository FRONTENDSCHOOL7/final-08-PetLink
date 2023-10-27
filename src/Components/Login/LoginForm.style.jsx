import styled from 'styled-components';

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
  background-color: ${(props) => (props.disabled ? "#b2dffb" : "#004e98")};
  color: white;
  font-size: 16px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  border: none;
  margin: auto;
  margin-bottom: 20px;
  display: block;
  transition: background-color 0.3s ease; /* Optional: for a smooth color transition */
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
  border-bottom: 1px solid #DBDBDB;
  font-size: 16px;
  margin-top: 5px;
  width: 100%;
  
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
`;