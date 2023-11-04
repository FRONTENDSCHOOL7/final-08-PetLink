import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as S from '../Home/PostList.style';
import moreIcon from '../../assets/image/icon-more-vertical.png';
import { Container } from '../../Styles/reset.style';
import HeaderLayouts from '../Common/Header/Header';
import heartIcon from "../../assets/image/icon-heart.png";
import { Overlay } from '../Product/ProductDetail.style';
import BottomModal from '../Common/Modal/BottomModal';
import redHeartIcon from '../../assets/image/icon-heart-red.png';
import commentIcon from '../../assets/image/icon-comment.png';
import CommentList, { WriteComment } from '../Home/CommentList';

export default function CommunityDetail() {
  const defaultUserImg = "https://api.mandarin.weniv.co.kr/1698653743844.jpg";
  const [liked, setLiked] = useState(false);
  const [likeNum, setLikeNum] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportOptions, setReportOptions] = useState([]);
  const [comment, setComment] = useState('');
  const [commentToShow, setCommentToShow] = useState('');
  const location = useLocation();
  const { selectedPost } = location.state;
  const [userAccountName, setUserAccountName] = useState(false);
  const [isMyPost, setIsMyPost] = useState(false); // 추가: 현재 사용자의 게시물 여부

  const navigate = useNavigate();

  // 게시물 삭제 함수
  const deletePost = async (postId) => {
    console.log('deletePost is called with id:', postId)
    try {
      await axios.delete(`https://api.mandarin.weniv.co.kr/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      alert('삭제되었습니다.');
      navigate('/community');
    } catch (error) {
      // 에러 처리
    }
  };

  useEffect(()=>{
    fetchMyProfile()
  })
  const fetchMyProfile = async () => {
    try {
      const response = await fetch(`https://api.mandarin.weniv.co.kr/user/myinfo`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-type": "application/json",
        },
      });
      const data = await response.json();

      if (data) {
        const userAccountName = data.user.accountname
        setUserAccountName(userAccountName)
        setIsMyPost(userAccountName === selectedPost.author?.accountname);
        // console.log(userAccountName)
      }
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const isMyComment = (commentAuthorAccountName) => {
    return userAccountName === commentAuthorAccountName;
  };

  const onChangeModal = (comment, isMyComment) => {
    let modalOptions = [];

    if (isMyComment) {
      modalOptions = [
        { action: "수정하기", alertText: "수정하시겠습니까?" },
        { action: "삭제하기", alertText: "삭제하시겠습니까?" },
      ];
    } else {
      modalOptions = [
        { action: "신고하기", alertText: "신고하시겠습니까?" },
      ];
    }

    setIsModalOpen(true);
    setReportOptions(modalOptions);
  };




  // 추가: 댓글 입력 시 화면에 보이도록 처리
  const handlePostComment = () => {
    if (comment.trim() !== '') {
      setCommentToShow(comment);
      setComment('');
    }
  };

  const handleLikeClick = async () => {
    if (liked) {
      setLikeNum(likeNum - 1);
    } else {
      setLikeNum(likeNum + 1);
    }
    setLiked(!liked);
  };

  if (!selectedPost) {
    return <div>게시글을 불러오는 중...</div>;
  }

  return (
    <Container>
      <HeaderLayouts back search />
      <S.UserInfo>
      <Link to={`/profile/${selectedPost.author.accountname}`}>
          <S.UserProfile>
            <img src={selectedPost.author?.image || defaultUserImg} alt='사용자 프로필 이미지' />
            <S.UserName>
              <p>{selectedPost.author?.username}</p>
              <p>{selectedPost.author?.accountname}</p>
            </S.UserName>
          </S.UserProfile>
      </Link>
        <button onClick={() => onChangeModal(selectedPost.author?.accountname, isMyComment(selectedPost.author?.accountname))}><S.IconMore src={moreIcon} /></button>
      </S.UserInfo>
      <S.Content>
        <h4 style={{ marginBottom: '15px' }}>
          {JSON.parse(selectedPost.content).title}
        </h4>
        <p className='text'>{JSON.parse(selectedPost.content).contentText}</p>
        {selectedPost.image && <img src={selectedPost.image} alt="포스팅 이미지" />}
        <S.PostIcons>
          <button onClick={handleLikeClick}>
              <img src={liked ? redHeartIcon : heartIcon} alt='좋아요 버튼' />
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
            <BottomModal
              setIsModalOpen={setIsModalOpen}
              reports={reportOptions}
              onDelete={() => deletePost(selectedPost._id)}
            />
          </>
        )}
      <CommentList
        onChangeModal={onChangeModal}
        userImage={selectedPost.author?.image}
        username={selectedPost.author?.username}
        date={selectedPost.date}
        comment={commentToShow}
        isMyComment={isMyComment}
      />
      <WriteComment
        comment={comment}
        setComment={setComment}
        handlePostComment={handlePostComment}
      />
    </Container>
  );
}
