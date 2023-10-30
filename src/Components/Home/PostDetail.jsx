import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as S from '../Home/PostList.style';
import moreIcon from '../../assets/image/icon-more-vertical.png';
import profileIcon from '../../assets/image/icon-basic-profile.png';
import { Container } from '../../Styles/reset.style';
import HeaderLayouts from '../Common/Header/Header';
import { Overlay } from '../Product/ProductDetail.style';
import BottomModal from '../Common/Modal/BottomModal';
import redHeartIcon from '../../assets/image/icon-heart-red.png';
import commentIcon from '../../assets/image/icon-comment.png';

export default function PostDetail() {
  const [likeNum, setLikeNum] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComment] = useState(''); 

  const location = useLocation();
  const { selectedPost } = location.state;

  if (!selectedPost) {
    return <div>게시글을 불러오는 중...</div>;
  }

  return (
    <Container>
      <HeaderLayouts back search />
      <S.UserInfo>
        <S.UserProfile>
          <img src={profileIcon} alt='사용자 프로필 이미지' />
          <S.UserName>
            <p>{selectedPost.author?.username}</p>
            <p>{selectedPost.author?.accountname}</p>
          </S.UserName>
        </S.UserProfile>
      </S.UserInfo>
      <S.Content>
        <p className='text'>{selectedPost.content}</p>
        {selectedPost.image && <img src={selectedPost.image} alt="포스팅 이미지" />}
      </S.Content>
      <S.PostIcons>
        <button onClick={() => setLikeNum(prev => prev + 1)}>
          <img src={redHeartIcon} alt='좋아요 버튼' />
          <span>{likeNum}</span>
        </button>
        <button onClick={() => setIsModalOpen(true)}>
          <img src={commentIcon} alt='댓글 개수' />
        </button>
      </S.PostIcons>
      {isModalOpen && (
        <>
          <Overlay onClick={() => setIsModalOpen(false)} />
          <BottomModal reportTxt={["신고"]} setIsModalOpen={setIsModalOpen} />
        </>
      )}
      <WriteComment comment={comment} setComment={setComment} />
    </Container>
  );
}

export function CommentList({ onChangeModal }) {
  return (
    <S.CommentBox>
      <S.UserInfo>
        <div>
          <a href='#'>
            <img src={profileIcon} alt='사용자 프로필 이미지' />
          </a>
          <p>서귀포시 무슨 농장 <span>· 5분 전</span></p>
        </div>
        <button onClick={onChangeModal}>
          <img src={moreIcon} alt='신고하기 모달창 불러오기' />
        </button>
      </S.UserInfo>
      <S.CommentTxt>게시글 답글 ~~ !! 최고최고</S.CommentTxt>
    </S.CommentBox>
  );
}

export function WriteComment({ comment, setComment }) {
  return (
    <S.InputForm>
      <div>
        <img src={profileIcon} alt="사용자 프로필" />
        <input 
          type="text" 
          id="comment-input" 
          placeholder="댓글 입력하기..." 
          onChange={e => setComment(e.target.value)} 
          value={comment || ''} 
        />
      </div>
      <button type="submit" disabled={!comment || comment.trim().length === 0}>게시</button>
    </S.InputForm>
  );
}