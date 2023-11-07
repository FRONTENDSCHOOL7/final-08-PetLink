import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import * as S from '../Home/PostList.style';
import moreIcon from '../../assets/image/icon-more-vertical.png';
import { Container, SubContainer } from '../../Styles/reset.style';
import HeaderLayouts from '../Common/Header/Header';
import heartIcon from "../../assets/image/icon-heart.png";
import { Overlay } from '../Product/ProductDetail.style';
import BottomModal from '../Common/Modal/BottomModal';
import redHeartIcon from '../../assets/image/icon-heart-red.png';
import commentIcon from '../../assets/image/icon-comment.png';
import CommentList, { WriteComment } from '../Home/CommentList';


function formatDate(dateString) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

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
  const [commentLoading, setCommentLoading ] = useState(false)
  const { postId } = useParams();
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

    // myPost와 action이 같아서 값이 bottomModal로 전달되어, 댓글 삭제/수정을 하면 게시글 수정/삭제 기능이 동작되고 있음. 둘의 기능을 분리시키기 위해 임시방편으로 action을 변경하였음.
    // (기존) 수정하기,삭제하기,신고하기 (변경) 댓글 수정, 댓글 삭제, 댓글 신고
    if (isMyComment) {
      modalOptions = [
        { action: "댓글 수정", alertText: "수정 하시겠습니까?" },
        { action: "댓글 삭제", alertText: "삭제 하시겠습니까?" },
      ];
    } else {
      modalOptions = [
        { action: "댓글 신고", alertText: "신고 하시겠습니까?" },
      ];
    }

    setIsModalOpen(true);
    setReportOptions(modalOptions);
  };

  const myPost = ( postAuthorAccountName) => {
    return userAccountName === postAuthorAccountName;
  };

  const postOpenModal = (myPost) => {
    let modalOptions = [];

    if (myPost) {
      modalOptions = [
        { action: "수정하기", alertText: "수정 하시겠습니까?", onSelect: () => navigate(`/community/edit/${postId}`)},
        { action: "삭제하기", alertText: "삭제 하시겠습니까?", onSelect: () => deletePost(selectedPost._id) },
      ];
    } else {
      modalOptions = [
        { action: "신고하기", alertText: "신고 하시겠습니까?" },
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
      <SubContainer style={{marginBottom:"0"}}>
      <S.UserInfo>
      <Link to={`/profile/${selectedPost.author.accountname}`}>
          <S.UserProfile>
            <S.UserImg src={selectedPost.author?.image || defaultUserImg} alt='사용자 프로필 이미지' />
            <div>
              <S.NameTxt>{selectedPost.author?.username}</S.NameTxt>
              <S.Account>{selectedPost.author?.accountname}</S.Account>
            </div>
          </S.UserProfile>
      </Link>
        <button onClick={() => postOpenModal(myPost(selectedPost.author?.accountname))}><S.IconMore src={moreIcon} /></button>
      </S.UserInfo>
      <S.Content>
        <h4 style={{ marginBottom: '15px' }}>
          {JSON.parse(selectedPost.content).title}
        </h4>
        <CommunityContentTxt className='text'>{JSON.parse(selectedPost.content).contentText}</CommunityContentTxt>
        {selectedPost.image && <S.ContentImg src={selectedPost.image} alt="포스팅 이미지" />}
        <S.PostIcons>
            <S.IconBtn onClick={handleLikeClick}>
              <S.IconImg src={liked ? redHeartIcon : heartIcon} alt='좋아요 버튼' />
              <S.Count>{likeNum}</S.Count>
            </S.IconBtn>
            <S.IconBtn>
              <S.IconImg src={commentIcon} alt='댓글 개수' />
              <S.Count>0</S.Count>
            </S.IconBtn>
          </S.PostIcons>
          <S.PostDate>{formatDate(selectedPost.createdAt)}</S.PostDate>
        </S.Content>
      </SubContainer>
    <Line/>
      <CommentList
        onChangeModal={onChangeModal}
        userImage={selectedPost.author?.image}
        username={selectedPost.author?.username}
        date={selectedPost.date}
        comment={commentToShow}
        isMyComment={isMyComment}
        commentLoading={commentLoading}
      />
      <WriteComment
        comment={comment}
        setComment={setComment}
        handlePostComment={handlePostComment}
        setCommentLoading={setCommentLoading}
      />
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
    </Container>
  );
}


// Community Styled 컴포넌트
// PostList.style에서 CommunityDetail에만 필요한 스타일은 별도로 추가.
export const CommunityContentTxt = styled.p`
    font-size: 14px;
    font-weight: 400;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    margin: 5px 0 10px 0;
`

export const Line = styled.div`
  position:absolute;
 /* display: flex; */
  width: 100%;
  max-width: 390px;
  transform: translateY(-40px);
  border-top: 1px solid #DBDBDB;
  margin-top: 20px;

   // 768px 이상의 화면에서는 max-width를 100%로 설정
    @media (min-width: 768px) {
    max-width: 768px;
  }
`