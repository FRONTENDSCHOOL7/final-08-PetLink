import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import * as S from '../Home/PostList.style';
import moreIcon from '../../assets/image/icon-more-vertical.png';
import { Container } from '../../Styles/reset.style';
import HeaderLayouts from '../Common/Header/Header';
import { Overlay } from '../Product/ProductDetail.style';
import BottomModal from '../Common/Modal/BottomModal';
import redHeartIcon from '../../assets/image/icon-heart-red.png';
import commentIcon from '../../assets/image/icon-comment.png';
import CommentList, { WriteComment } from '../Home/CommentList';

export default function CommunityDetail() {
  const defaultUserImg = "https://api.mandarin.weniv.co.kr/1698653743844.jpg";
  const [likeNum, setLikeNum] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [commentToShow, setCommentToShow] = useState('');
  const [userId, setUserId] = useState(null);
  const location = useLocation();
  const { selectedPost } = location.state || {};

  useEffect(() => {
    // 사용자 ID를 불러오는 함수
    const fetchMyProfile = async () => {
      try {
        const response = await axios.get('https://api.mandarin.weniv.co.kr/user/myinfo', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUserId(response.data.user._id);
      } catch (error) {
        console.error('There was an error fetching the user info!', error);
      }
    };

    fetchMyProfile();
  }, []);

  const reportOptions = [
    {action: "신고하기", alertText: "게시글을 신고하시겠습니까?"},
  ];

  // 게시글 작성자와 로그인한 사용자가 동일한지 여부
  const isPostOwner = userId === selectedPost.author?._id;

  // 수정/삭제 모달 옵션
  const postOwnerOptions = [
    {action: "수정하기", alertText: "게시글을 수정하시겠습니까?"},
    {action: "삭제하기", alertText: "게시글을 삭제하시겠습니까?"},
  ];

  const onChangeModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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
        <h4 style={{ marginBottom: '15px' }}>
          {JSON.parse(selectedPost.content).title}
        </h4>
        <p className='text'>{JSON.parse(selectedPost.content).contentText}</p>
        {selectedPost.image && <img src={selectedPost.image} alt="포스팅 이미지" />}
        <S.PostIcons>
          <button onClick={() => setLikeNum(prev => prev + 1)}>
            <img src={redHeartIcon} alt='좋아요 버튼' />
            <span>{likeNum}</span>
          </button>
          <button onClick={() => setIsModalOpen(true)}>
            <img src={commentIcon} alt='댓글 개수' />
            <span>0</span> {/* 댓글 개수를 상태로 관리하려면 해당 로직도 추가해야 합니다. */}
          </button>
        </S.PostIcons>
      </S.Content>
      {isModalOpen && (
          <>
            <Overlay onClick={() => setIsModalOpen(false)} />
            <BottomModal setIsModalOpen={setIsModalOpen} reports={isPostOwner ? postOwnerOptions : reportOptions}/>
          </>
        )}
      <CommentList
        onChangeModal={onChangeModal}
        userImage={selectedPost.author?.image}
        username={selectedPost.author?.username}
        date={selectedPost.date}
        comment={commentToShow}
      />
      <WriteComment
        comment={comment}
        setComment={setComment}
        handlePostComment={handlePostComment}
      />
    </Container>
  );
}
