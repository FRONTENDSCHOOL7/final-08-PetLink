import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as S from '../Home/PostList.style';
import moreIcon from '../../assets/image/icon-more-vertical.png';
import { Container } from '../../Styles/reset.style';
import HeaderLayouts from '../Common/Header/Header';
import { Overlay } from '../Product/ProductDetail.style';
import BottomModal from '../Common/Modal/BottomModal';
import redHeartIcon from '../../assets/image/icon-heart-red.png';
import commentIcon from '../../assets/image/icon-comment.png';
import CommentList, { WriteComment } from '../Home/CommentList';

export default function PostDetail(props) {
  const defaultUserImg = "https://api.mandarin.weniv.co.kr/1698653743844.jpg";
  const [likeNum, setLikeNum] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComment] = useState(''); 
  const [commentToShow, setCommentToShow] = useState(''); // 추가: 화면에 보이는 댓글 상태
  const location = useLocation();
  const { selectedPost } = location.state || {};

  const reportOptions = [
    {action: "신고하기", alertText: "신고하시겠습니까?"},
  ]
  
  const onChangeModal = () => {
    setIsModalOpen(true);
  };

  // 추가: 댓글 입력 시 화면에 보이도록 처리
  const handlePostComment = () => {
    if (comment.trim() !== '') {
      setCommentToShow(comment);
      setComment('');
    }
  };

  if (!selectedPost) {
    return <div>게시글을 불러오는 중...</div>;
  }

  return (
    <Container>
      <HeaderLayouts back search />
      <S.UserInfo>
        <S.UserProfile>
          <img src={selectedPost.author?.image || defaultUserImg} alt='사용자 프로필 이미지' />
          <S.UserName>
            <p>{selectedPost.author?.username}</p>
            <p>{selectedPost.author?.accountname}</p>
          </S.UserName>
        </S.UserProfile>
        <button onClick={onChangeModal}><S.IconMore src={moreIcon} /></button>
      </S.UserInfo>
      <S.Content>
        {/* 게시글 상세페이지에서 제목 보여줄지 논의필요 */}
        <h4>{JSON.parse(selectedPost.content).title}</h4>
        <p className='text'>{JSON.parse(selectedPost.content).contentText}</p>
        {selectedPost.image && <img src={selectedPost.image} alt="포스팅 이미지" />}
        <S.PostIcons>
          <button onClick={() => setLikeNum(prev => prev + 1)}>
            <img src={redHeartIcon} alt='좋아요 버튼' />
            <span>{likeNum}</span>
          </button>
          <button onClick={() => setIsModalOpen(true)}>
            <img src={commentIcon} alt='댓글 개수' />
            <span>0</span>
          </button>
        </S.PostIcons>
      </S.Content>
      {isModalOpen && (
        <>
          <Overlay onClick={() => setIsModalOpen(false)} />
          <BottomModal setIsModalOpen={setIsModalOpen} reports={reportOptions}/>
        </>
      )}
      <CommentList
        onChangeModal={onChangeModal}
        userImage={selectedPost.author?.image}
        username={selectedPost.author?.username}
        date={selectedPost.date}
        comment={commentToShow} // 변경: 입력된 댓글 내용을 CommentList로 전달
      />
      <WriteComment
        comment={comment}
        setComment={setComment}
        handlePostComment={handlePostComment} // 변경: handlePostComment 함수 추가
      />
    </Container>
  );
}