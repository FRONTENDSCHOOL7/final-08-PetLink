import React, { useState } from 'react'
import './homePage.css'
import icoMore from '../../assets/images/icon- more-vertical.png'
import icoProfile from '../../assets/images/icon-basic-profile.png'
import icoHeart from '../../assets/images/icon-heart.png'
import icoRedHeart from '../../assets/images/icon-red-heart.png'
import icoComment from '../../assets/images/icon-comment.png'
import logoTxt from '../../assets/images/logo-color_txt.png'
import icoSearch from '../../assets/images/icon-search.png'
import icoBack from '../../assets/images/icon-arrow-left.png'


export default function HomePage() {

  const [likeNum, setLikeNum] = useState(0)
  const [modal, setShowModal] = useState(false)


const onChangeNum = ()=>{
setLikeNum(likeNum+1)
}

const onChangeModalShow = ()=>{
  setShowModal(true)
}
  return (
<>
        <div className='home-post-wrapp'>
    {/* header component 하기 */}
        <header className='home-nav-top'>
          <img src={logoTxt} alt='반결고리'/>
          <a href="#"><img src={icoSearch} aria-label='검색하기'/></a>
        </header>

        
    {/* Post content component 하기 */}
    <div className='post-container'>
      <ul className='post-list'> 
          <li className='post-item'>
             <div className='user-info'>
                <div className="user-profile">
                  <a href='#'><img src={icoProfile} alt='사용자 프로필 이미지'/></a>
                  <div className="user-detail">
                      <span className='title'>애월읍에서 강아지들에게 유명한 곳</span>
                      <span className='user-id'> @활동명</span>
                  </div> 
                </div>
                <button onClick={onChangeModalShow} ><img className="icon-more" src={icoMore} alt='신고하기 모달창 불러오기'/></button>
             {
              modal == true ? <ComplainModal/> :null      
             }
             </div>
       
          
        <div className='content'> 
          <p className='text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore tenetur quaerat ut fugit sequi. Temporibus illo nihil facere tempora deserunt?</p>
          <img src="https://via.placeholder.com/304x228" alt="포스팅 이미지"  />
          
          <div className='post-icons'>
              <button aria-label='좋아요 누르기' onClick={onChangeNum}>
                <img src={icoRedHeart} alt='하트 아이콘'/>
                <span>{likeNum}</span>
              </button>
              <button aria-label='댓글 남기기' >
                <img src={icoComment} alt='채팅 아이콘'/>
              <span>12</span>
              </button>
          </div>
          <div className='post-date'><span>2023년 10월 21일</span></div>
        </div>
         {/* <CommentList/>
         <Comment/> */}
         </li>
      </ul>
    </div>
        </div>
</>

  )
}

{/* 신고하기 모달 */}
function ComplainModal (){
      <div className='bottomsheet-complain'>
            <div className='bar'></div>
            <span >신고하기</span>
       </div>
}

function NavHeaderSearch(){
  return(
    <div>
    <header className='home-nav-top'>
      <img src={icoBack} alt='뒤로가기'/>
      <a href="#"><img src={icoSearch} aria-label='검색하기'/></a>
    </header>
</div>
  )
}

function CommentList(){
 return(
 <div className='comment-list'>
    <div className='user-info'>
                  <div className="user-profile">
                    <a href='#'><img src={icoProfile} alt='사용자 프로필 이미지'/></a>
                    <div className="user-detail">
                        <span className='user-id'> @활동명</span>
                    </div> 
                  </div>
                  <button  ><img className="icon-more" src={icoMore} alt='신고하기 모달창 불러오기'/></button>
    </div>
   <div className='content'> 
     <p className='text-comment'>댓글입니다. </p>
   </div>
 </div>
 )
}

function Comment(){
  return(
    <div className='comment'>
           <input type="text" id="commemt-input" placeholder="댓글 입력하기..."/>
           <div class="img-cover">
              <img class="profile-img" src={icoProfile} alt="사용자 프로필"/>
                </div>
            <button type="submit" class="btn-comment" disabled>게시</button>
    </div>
  )
}
