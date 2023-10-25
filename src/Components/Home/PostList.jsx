import React, { useEffect, useState } from 'react'
import *as S from './PostList.style'
import profileIcon from '../../assets/image/icon-basic-profile.png'
import moreIcon from '../../assets/image/icon- more-vertical.png'
import redHeartIcon from '../../assets/image/icon-heart-red.png'
import commentIcon from '../../assets/image/icon-comment.png'
import { Link, json } from 'react-router-dom'
import TabMenu from '../Common/TabMenu/TabMenu'
import { Container } from '../../Styles/reset.style'
import HeaderLayouts from '../Common/Header/Header'
import ProfilePage from '../../Pages/ProfilePage/Profile'
import { async } from 'q'
import axios from 'axios'
import { userInfo } from 'os'

export default function PostList({handlePage}) {
   const [likeNum, setLikeNum] = useState(0)
   const onChangeNum = ()=>{
  setLikeNum(likeNum+1)
  }

// 유저 정보
const reqUrl = "https://api.mandarin.weniv.co.kr/user/myinfo";
const token =  localStorage.getItem('token')
  const userData = {
    "Authorization" : `Bearer ${token}`,
    "Content-type" : "application/json"
  }
useEffect(()=>{
  const userInfo = async () =>{
    try{
     const res = await axios.get('reqUrl',userData)
     .then((result)=>{
        console.log(result)
      })
    }catch(err){
      console.log('erro입니다.')
    }
  
      }
      userInfo()
}, [])




// URL : https://api.mandarin.weniv.co.kr/
//   GET /post/feed
//   GET /post/feed/?limit=Number&skip=Number
//   {
//     "Authorization" : "Bearer {token}",
//     "Content-type" : "application/json"
//   }
//   const url = 'https://api.mandarin.weniv.co.kr/'
//   const reqData = {
//     "Authorization" : "Bearer {token}",
//     "Content-type" : "application/json"
//   }
//   const token = 'your_user_token'; 
//   // const [followedUserExists, setFollowedUserExists] = useState(false);

// useEffect(()=>{
//   const fetchUserData = async () => {
//     try {
//       const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-type': 'application/json',
//         },
//         body: JSON.stringify(reqData)
//       });
//       if (!response.ok) {
//         throw new Error('서버에서 데이터를 가져오는 중에 문제가 발생했습니다.');
//       }

//       const data = await response.json();

//       // 팔로우한 사용자가 있는지 여부 확인
//       // const userExists = data.posts.length > 0;
//       // setFollowedUserExists(userExists);
//     } catch (error) {
//       console.error('회원 정보를 가져오는 중에 오류가 발생했습니다:', error);
//     }
//   };

//   fetchUserData();
// }, [url]);



// async function PostFeedReq(){
//   const url = 'https://api.mandarin.weniv.co.kr/'
//   const reqData = {
//     "Authorization" : "Bearer {token}",
//     "Content-type" : "application/json"
//   }

//   try {
//     const res = await fetch(url+'/post/feed/?limit=Number&skip=Number' ,{
//       method : 'GET',
//       headers:{
//         "Content-type" : "application/json"
//     },
//       body: JSON.stringify(reqData)
//     })
//     const result = await res.json()
//     console.log(json)
//   }catch(err){
//     console.log(err)
//   }
// }


  return (
      <>
           <Container>
              <HeaderLayouts logo search />
              <PostContents handlePage={handlePage} likeNum={likeNum} onChangeNum={onChangeNum}/>
           </Container>
              <TabMenu/>
      </>
     
  )
}


  export function PostUserInfo(props){
    return(
      <S.UserInfo >
       <S.UserProfile>
        <a href='#'><img src={profileIcon} alt='사용자 프로필 이미지'/></a>
        <S.UserName >
            <p >애월읍에서 강아지들에게 유명한 곳</p>
            <span> {userInfo.accountname}</span>
        </S.UserName> 
      </S.UserProfile>
      <button ><S.IconMore src={moreIcon} alt='신고하기 모달창 불러오기'/></button>
    </S.UserInfo>
    )
    }



export  function PostContents(props){
        return(
          <S.PostList> 
            <li >
              <PostUserInfo/>
              <S.Content> 
                <a href='/post/detail'>
                    <p className='text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore tenetur quaerat ut fugit sequi. Temporibus illo nihil facere tempora deserunt?</p>
                    <img src="https://via.placeholder.com/304x228" alt="포스팅 이미지"  />
                </a>
                <S.PostIcons>
                  <button onClick={props.onChangeNum}>
                    <img src={redHeartIcon} alt='하트 아이콘'/>
                    <span>{props.likeNum}</span>
                  </button>
                  <Link to='/post/detail' aria-label='댓글 남기기'  >
                    <img src={commentIcon} alt='채팅 아이콘' />
                  <span>1</span>
                  </Link>
                </S.PostIcons>
        
                <S.PostDate>2023년 10월 21일</S.PostDate>
              
              </S.Content>
          </li>
        </S.PostList>
        
        )
        }
        
