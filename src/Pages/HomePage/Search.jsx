import React, { useEffect, useState } from 'react'
import { Container } from '../../Styles/reset.style'
import { UserInfo, UserName, UserProfile } from '../../Components/Home/PostList.style'
import backIcon from '../../assets/image/icon-arrow-left.png'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { HeaderButton, HeaderLayout, SearchInput } from '../../Components/Common/Header/Header.style'


export default function Search() { 
  const navigate = useNavigate()
  const handleBack = ()=>{
 navigate(-1)
   }
   const defaultUserImg = "https://api.mandarin.weniv.co.kr/1698653743844.jpg";
   const [keyword, setKeyword] = useState('')
   const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Enter 키를 누르면 검색 함수 호출
      performSearch();
    }
  };

  //  API 통신
  const [userData, setUserData] = useState(null);
  // const [data, setData] = useState(null); 
   const [accountname, setAccountName] = useState('');
   const [username, setUserName] = useState('');
   const [imgUrl, setImgUrl] = useState(null)
   const url = `https://api.mandarin.weniv.co.kr/user/searchuser/?keyword=${keyword}`

   useEffect(() => {
    if (keyword) {
      performSearch();
    }
  }, []);


  const performSearch = async()=>{
    try{
const res = await fetch(url,{
  method: 'GET',
  headers: {
    "Authorization" :  `Bearer ${localStorage.getItem('token')}`,
    "Content-type" : "application/json"
  }
})

const apidata = await res.json()
console.log("API 응답" , apidata)

if (apidata.length > 0) {
  setUserData(apidata);
  setUserName(apidata.user.username || '');
  setAccountName(apidata.user.accountname || '');
  setImgUrl(apidata.user.image || 'https://api.mandarin.weniv.co.kr/Ellipse.png'); 
}else {
  // 검색 결과가 없는 경우
  setUserData(null);
}
    }
    catch(error){
      console.error('에러:', error);
    }
  }


  return (
    <Container>
    <HeaderLayout>
      <HeaderButton onClick={handleBack}><img src={backIcon} alt="'뒤로가기'" /></HeaderButton>
      <SearchInput 
      type="text" 
      placeholder='계정 검색' 
      value={keyword} 
      onChange={(e)=>setKeyword(e.target.value)} 
      onKeyUp={handleKeyPress}
      />
    </HeaderLayout>
        <SearchResultBox>
          {userData ? (
            userData.map((user)=>(
              <UserInfo key={user._id}>
          <UserProfile>
              <Link to="#">
                <img src={user.image || defaultUserImg} alt='프로필 이미지'/>
                </Link>
              <UserName >
                  <p >{user.username}</p>
                  <span>{user.accountname}</span>
              </UserName> 
          </UserProfile>
            </UserInfo>
            )) 
          ):(
          <p>검색 결과가 없습니다.</p>
          )}
        </SearchResultBox>
    </Container>
  )
}



export const SearchResultBox = styled.div`
  padding: 20px 16px;
`

