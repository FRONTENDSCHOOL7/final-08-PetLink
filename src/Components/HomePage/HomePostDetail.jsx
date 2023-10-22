import React from 'react'
import './homePage.css'
import icoMore from '../../assets/images/icon- more-vertical.png'
import icoProfile from '../../assets/images/icon-basic-profile.png'
import icoHeart from '../../assets/images/icon-heart.png'
import icoRedHeart from '../../assets/images/icon-red-heart.png'
import icoComment from '../../assets/images/icon-comment.png'
import icoSearch from '../../assets/images/icon-search.png'
import icoBack from '../../assets/images/icon-arrow-left.png'
import { PostContents } from './HomePage'




// function CommentList(){
//     return(
//     <div className='comment-list'>
//        <div className='user-info'>
//                      <div className="user-profile">
//                        <a href='#'><img src={icoProfile} alt='사용자 프로필 이미지'/></a>
//                        <div className="user-detail">
//                            <span className='user-id'> @활동명</span>
//                        </div> 
//                      </div>
//                      <button  ><img className="icon-more" src={icoMore} alt='신고하기 모달창 불러오기'/></button>
//        </div>
//       <div className='content'> 
//         <p className='text-comment'>댓글입니다. </p>
//       </div>
//     </div>
//     )
//    }
   

// function CommentList(){
//     return(
//         <div className='comment-box'>
// <div className='user-info'>
//                      <div className="user-profile">
//                        <a href='#'><img src={icoProfile} alt='사용자 프로필 이미지'/></a>
//                        <div className="user-detail">
//                            <span className='user-id'> @활동명</span>
//                        </div> 
//                      </div>
//                      <button  ><img className="icon-more" src={icoMore} alt='신고하기 모달창 불러오기'/></button>
//        </div>
//       <div className='content'> 
//         <p className='text-comment'>댓글입니다. </p>
//       </div>
//         </div>
//     )
// }

export function CommentHeader(){
    <header className='home-nav-top'>
    <img src={icoBack} alt='반결고리'/>
    <a href="#"><img src={icoSearch} aria-label='검색하기'/></a>
  </header>
}

export const CommentList = () => {
    return (
      <div className="comment-box">
        <div className="user-infos">
        <a href='#'><img src={icoProfile} alt='사용자 프로필 이미지'/></a>
          <div className="text-wrapper">서귀포시 무슨 농장</div>
          <div className="time">· 5분 전</div>
        </div>
        <button ><img className="icon-more" src={icoMore} alt='신고하기 모달창 불러오기'/></button>
        <p className="p">게시글 답글 ~~ !! 최고최고</p>
      </div>
    );
  };

function WriteComment(){
    return(
      <form className='input-comment'>
             <div >
                    <img class="profile-img" src={icoProfile} alt="사용자 프로필"/>
                 <input type="text" id="commemt-input" placeholder="댓글 입력하기..."/>
             </div>
              <button type="submit" class="btnDisabled" disabled>게시</button>
      </form>
    )
  }
  

export default function HomePostDetail() {
  return (
    <div className='home-post-wrapp'>
        <CommentHeader/>
        <PostContents/>
        <CommentList/>
        <WriteComment/>
    </div>
  )
}
