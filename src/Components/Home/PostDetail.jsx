import React from 'react'
import *as S from './PostList.style'
import moreIcon from '../../assets/image/icon- more-vertical.png'
import profileIcon from '../../assets/image/icon-basic-profile.png'
import searchIcon from '../../assets/image/icon-search.png'
import BackIcon from '../../assets/image/icon-arrow-left.png'
import { PostContents } from './PostList'



export default function PostDetail(props) {
    return (
      <S.PostLayout>
          <PostDetailHeader/>
          <PostContents />
          <CommentList/>
          {/* <WriteComment/> */}
      </S.PostLayout>
    )
  }


export function PostDetailHeader(){
    return(
   
        <S.HomeHeader>
            <img src={BackIcon} alt='뒤로가기' width={22} height={22}/>
            <a href="#"><img src={searchIcon} aria-label='검색하기'/></a>
          </S.HomeHeader>
  
    )
  }

export const CommentList = () => {
    return (
      <S.CommentBox>
        <S.UserInfo>
     <div>
            <a href='#'><img src={profileIcon} alt='사용자 프로필 이미지' /></a>
              <p>서귀포시 무슨 농장 <span>· 5분 전</span></p>
              
     </div>
        <button ><img src={moreIcon} alt='신고하기 모달창 불러오기'/></button>
        </S.UserInfo>
        <S.CommentTxt>게시글 답글 ~~ !! 최고최고</S.CommentTxt>
      </S.CommentBox>
    );
  };

function WriteComment(){
    return(
      <S.InputBox>
             <div >
                <img src={profileIcon} alt="사용자 프로필"/>
                 <input type="text" id="commemt-input" placeholder="댓글 입력하기..."/>
             </div>
              <button type="submit"  disabled>게시</button>
      </S.InputBox>
    )
  }
  


