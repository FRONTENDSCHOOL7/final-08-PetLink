import React, { useState } from 'react'
import *as S from './PostList.style'
import logoTxt from '../../assets/image/logo-color_txt.png'
import searchIcon from '../../assets/image/icon-search.png'
import profileIcon from '../../assets/image/icon-basic-profile.png'
import moreIcon from '../../assets/image/icon- more-vertical.png'
import redHeartIcon from '../../assets/image/icon-heart-red.png'
import commentIcon from '../../assets/image/icon-comment.png'

export default function PostList({handlePage}) {

    const [likeNum, setLikeNum] = useState(0)
  
  const onChangeNum = ()=>{
  setLikeNum(likeNum+1)
  }
  
  return (

         <S.PostLayout>
            <PostHeader/>
            <PostContents handlePage={handlePage}/>
         </S.PostLayout>
     
  )
}


 export function PostHeader(){
    return(
   
        <S.HomeHeader>
            <img src={logoTxt} alt='반결고리 로고'/>
            <a href="#"><img src={searchIcon} aria-label='검색하기'/></a>
          </S.HomeHeader>
  
    )
  }

  export function PostUserInfo(props){
    return(
      <S.UserInfo >
       <S.UserProfile>
        <a href='#'><img src={profileIcon} alt='사용자 프로필 이미지'/></a>
        <S.UserName >
            <p >애월읍에서 강아지들에게 유명한 곳</p>
            <span> @활동명</span>
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
                <a href='#'>
                    <p className='text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore tenetur quaerat ut fugit sequi. Temporibus illo nihil facere tempora deserunt?</p>
                    <img src="https://via.placeholder.com/304x228" alt="포스팅 이미지"  />
                </a>
                <S.PostIcons>
                  <button aria-label='좋아요 누르기' onClick={props.onChangeNum}>
                    <img src={redHeartIcon} alt='하트 아이콘'/>
                    <span>1</span>
                  </button>
                  <a aria-label='댓글 남기기' onClick={props.handlePage} >
                    <img src={commentIcon} alt='채팅 아이콘' />
                  <span>1</span>
                  </a>
                </S.PostIcons>
        
                <S.PostDate>2023년 10월 21일</S.PostDate>
              
              </S.Content>
          </li>
        </S.PostList>
        
        )
        }
        
