import styled from 'styled-components';



export const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const UserProfile = styled.div`
  display: flex;
  align-items: center; /* 텍스트 요소를 가운데 정렬 */
  gap: 12px;
`

export const UserImg = styled.img`  
    width: 42px;
    height: 42px;
    border-radius: 50%;
    object-fit: cover;
    vertical-align: middle;
`

export const UserName =styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    cursor: pointer;
`

export const NameTxt =styled.p`
        font-size:14px ;
        font-weight: bold;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
`
export const Account =styled.span`
 font-size:12px ;
        font-weight: 400;
`

export const IconMore = styled.img`
  width: 18px;
  height: 18px;
  margin-top: 4px;
  cursor: pointer;
`

export const Content = styled.div`
  margin: 16px 16px 16px 54px;
  /* position: relative; */
`
export const ContentImg = styled.img`
    max-width: 304px;
    object-fit: cover;
    margin-top: 16px;
    padding-right: 25px;
`
export const ContentTxt = styled.p`
   font-size: 16px;
    font-weight: 400;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
`
export const PostIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: start; 
   gap: 17px;
`
export const IconBtn = styled.button`
     margin-top:12px ;
    cursor: pointer;
`
export const IconImg = styled.img`
   vertical-align: text-bottom;
    width: 15px;
    height: 15px;
    margin-right: 6px;
    cursor: pointer;
    object-fit: fill;
`
export const Count = styled.span`
  font-size: 12px;
margin-left: 6px;
cursor: pointer;
`
export const PostDate = styled.div`
  font-size: 12px;
  margin: 16px 0 30px;
`;

export const Line = styled.div`
 position:absolute;
 /* display: flex; */
  width: 100%;
  max-width: 390px;
  transform: translateY(-40px);
  border-top: 1px solid #DBDBDB;
`

// CommentList 스타일 컴포넌트

export const CommentBox = styled.div`
/* padding: 20px 16px; */
  /* border-top: 1px solid #dbdbdb; */
div{
  display: flex;
  justify-content: space-between;
  align-items: center;
    p{
      font-size: 14px;
    }
    span{
        font-size: 10px;
    }
}
`
export const CommentTxt =styled.div`
  overflow: auto;
  max-height: calc(100vh - 120px);
  padding-bottom:10px;
  font-size: 14px;
  margin:4px 0 15px 48px ;
  display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;

`
export const CommentImg =styled.img`
border-radius: 50%;
width: 36px;
height: 36px;
`


// 댓글 입력창 컴포넌트
export const InputForm = styled.form`
    padding: 12px 16px;
    background-color: #fff;
    border-top: 1px solid #DBDBDB ; 
  width: 100%;
  max-width: 390px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  border-top: 1px solid #DBDBDB;

  @media (min-width: 768px) {
    width: 100%;
    min-width: 768px;
    height: 80px;
  }

`
export const CommentInput = styled.input`
  flex-grow: 1;
  height: 100%;
  border: none;
  padding: 16px 0;
  font-size: 14px;

  &::placeholder {
    color: #C4C4C4;
  }

  &:focus {
    outline: none;
  }

  @media (min-width: 768px) {
    font-size: 16px;
  }
`

export const InputImg = styled.img`
    vertical-align: middle; 
      width:36px ;
      height: 36px;
      margin-right: 18px;
`

export const InputBtn = styled.button`
     color: #004E98;
     width: 65px;
     flex-shrink: 0;
     font-size: 16px;

 &:disabled{
      color: #C4C4C4;
    }

`