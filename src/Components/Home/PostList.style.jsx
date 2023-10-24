import styled from 'styled-components';

// 홈 화면 스타일드 컴포넌트
export const PostLayout = styled.div`
  width: 390px;
  margin: 0 auto;
`

export const HomeHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  padding: 12px 16px;
  border-bottom: 1px solid #DBDBDB;

  img {
    
    object-fit: cover;
    cursor: pointer;
  }

  a img{
    width: 24px;
    height: 24px;
    cursor: pointer;
  }


`

export const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
`

export const UserProfile = styled.div`
  display: flex;
  gap: 12px;

  img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    object-fit: cover;

  }
`

export const UserName =styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-top: 4px;
    cursor: pointer;

    p{
        font-size:14px ;
        font-weight: 500;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    span{
        font-size:12px ;
        font-weight: 400;
    }
`

export const IconMore = styled.img`
  width: 18px;
  height: 18px;
  margin-top: 4px;
  cursor: pointer;
`

export const PostList = styled.ul`
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  margin: 16px 16px 16px 54px;

  p {
    font-size: 14px;
    font-weight: 400;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
  }

  a{
    text-decoration:none;
    color:#000000;
  }

  img {
    border-radius: 10px;
    width: 304px;
    object-fit: cover;
    margin-top: 16px;
  }
`

export const PostIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: start; 
   gap: 17px;
  
   button {
    cursor: pointer;
   }
   
   img {
    vertical-align: text-bottom;
    width: 15px;
    height: 15px;
    margin-right: 6px;
    cursor: pointer;
  }

  span{
font-size: 12px;
margin-left: 6px;
cursor: pointer;
  }
`

export const PostDate = styled.div`
  font-size: 12px;
  margin-top: 16px;
`;


// PostDetail 스타일 컴포넌트

export const CommentBox = styled.div`
padding: 20px 16px;
  border-top: 1px solid #dbdbdb;
div{
  display: flex;
  justify-content: space-between;
  align-items: center;
    p{
      font-size: 14px;
    }
    a{
        margin-right: 12px;

        img{
          width: 36px;
          height: 36px;
        }
      }
    span{
        font-size: 10px;
    }
}

img{
  width: 20px;
  height: 20px;
}

`
export const CommentTxt =styled.div`
 
  font-size: 14px;
  margin:4px 0 15px 48px ;
  display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden

`
// 댓글 입력창 컴포넌트
export const InputBox = styled.form`
  border-top: 1px solid #dbdbdb;
   display: flex;
    justify-content: space-between;
    align-items: center;
    width: 390px;
    bottom: 0;
    position: fixed;
    padding: 12px 16px;
    background-color: #fff;
    border-top: 1px solid #DBDBDB ;
    z-index: 1;

    img{
      vertical-align: top;
      width:36px ;
      height: 36px;
      margin-right: 18px;
    }

    input{
      border: none;
    outline: none;
    font-size: 14px;
    margin-top: 10px;
    }

    button{
      color: #C4C4C4;
    }
`