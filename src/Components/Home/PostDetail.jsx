import React, { useEffect, useState } from 'react'
import *as S from '../Home/PostList.style'
import moreIcon from '../../assets/image/icon- more-vertical.png'
import profileIcon from '../../assets/image/icon-basic-profile.png'
import PostList, { PostListItem } from '../Home/PostList'
import { useNavigate } from 'react-router-dom'
import { Container } from '../../Styles/reset.style'
import HeaderLayouts from '../Common/Header/Header'
import { Overlay } from '../Product/ProductDetail.style'
import BottomModal from '../Common/Modal/BottomModal'


export default function PostDetail(props) {
  const [likeNum, setLikeNum] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const navigate = useNavigate()
  const selectedPost = props.location?.state?.selectedPost || null;
  const handleBack = ()=>{
    navigate(-1)
  }

  const onChangeModal = ({ post }) => { 
    setIsModalOpen(true);
  }
    return (
      <Container>
          <HeaderLayouts back search/>
                <PostListItem post={selectedPost}/>

          <CommentList onChangeModal={onChangeModal}/>
          <WriteComment/>

          {isModalOpen && (
            <>
              <Overlay onClick={() => setIsModalOpen(false)} />
              <BottomModal reportTxt={["신고"]} setIsModalOpen={setIsModalOpen} />
            </>
      )}
      </Container>
    )
  }


export const CommentList = (props) => {
    return (
      <S.CommentBox>
        <S.UserInfo>
      <div>
            <a href='#'><img src={profileIcon} alt='사용자 프로필 이미지' /></a>
              <p>서귀포시 무슨 농장 <span>· 5분 전</span></p>
              
      </div>
        <button onClick={props.onChangeModal}><img src={moreIcon} alt='신고하기 모달창 불러오기'/></button>
        </S.UserInfo>
        <S.CommentTxt>게시글 답글 ~~ !! 최고최고</S.CommentTxt>
      </S.CommentBox>
    );
  };

function WriteComment(){
  const [comment, setComment] = useState('')
  const inputComment= (e)=>{
    setComment(e.target.value)
  }
  const submitComment= (e)=>{
e.preventDefault()
// SendComment()
  }
    return(
      <S.InputForm onSubmit={submitComment}>
              <div >
                <img src={profileIcon} alt="사용자 프로필"/>
                <input type="text" id="commemt-input" placeholder="댓글 입력하기..." onChange={inputComment}/>
              </div>
              <button type="submit" disabled={comment.length === 0}>게시</button>
      </S.InputForm>
    )
  }