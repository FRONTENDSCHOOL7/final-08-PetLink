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

// 커뮤니티 게시물에 대한 날짜 형식을 설정하는 함수
function formatDate(dateString) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// 컴포넌트의 state들을 정의함. 각 state는 컴포넌트의 다양한 데이터와 상태를 관리함
export default function CommunityDetail() {
  // 기본 사용자 이미지 URL을 설정함
  const defaultUserImg = "https://api.mandarin.weniv.co.kr/1698653743844.jpg";

  // 'liked'상태는 좋아요 여부를 나타내며, 'setLiked'는 이 상태를 업데이트하는 함수
  const [liked, setLiked] = useState(false);

  // 'likedNum' 상태는 좋아요의 수를 나타내며, 'setLikeNum'은 이를 업데이트하는 함수
  const [likeNum, setLikeNum] = useState(0);
  
  // 'isModalOpen' 상태는 모달 창의 개방 여부를 관리하며, 'setIsModalOpen'은 이 상태를 업데이트하는 함수
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 'reportOptions' 상태는 모달 창에 표시할 옵션들을 저장하며, 'setReportOptions'는 이를 업데이트 하는 함수
  const [reportOptions, setReportOptions] = useState([]);

  // 'comment' 상태는 사용자가 입력한 댓글을 저장하며, 'setComment'는 이를 업데이트 하는 함수
  const [comment, setComment] = useState('');

  // 'commentToShow' 상태는 화면에 표시될 댓글을 관리하며, 'setCommentToShow'는 이를 업데이트 하는 함수
  const [commentToShow, setCommentToShow] = useState('');

  // 'useLocation' 훅을 사용하여 현재 페이지의 URL 정보를 가져옴
  const location = useLocation();

  // 'location.state'에서 'selectedPost'를 추출함. 이는 이전 페이지에서 전달된 게시물 정보
  const { selectedPost } = location.state;

  // 'userAccountName' 상태는 현재 로그인한 사용자의 계정명을 저장하며, 'setUserAccountName'은 이를 업데이트 하는 함수
  const [userAccountName, setUserAccountName] = useState(false);

  // 'isMyPost' 상태는 현재 보고 있는 게시물이 로그인한 사용자의 것인지를 나타내며, 'setIsMyPost'는 이를 업데이트 하는 함수
  const [isMyPost, setIsMyPost] = useState(false); 

  // 'commentLoading'상태는 댓글 로딩 상태를 나타내며, 'setCommentLoading'은 이를 업데이트 하는 함수
  const [commentLoading, setCommentLoading ] = useState(false)

  // 'useParams' 훅을 사용하여 현재 페이지의 동적 경로 부분(여기서는 PostId)을 가져옴
  const { postId } = useParams();

  // 'useNavigate' 훅을 사용하여 프로그래밍 방식으로 라우팅(페이지 이동)을 제어함
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
    fetchMyProfile() // 컴포넌트 마운트 시 내 프로필 정보를 가져오는 함수 호출
  })

  // 현재 로그인한 사용자의 프로필 정보를 가져오는 함수 정의
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

  // 댓글이 현재 로그인한 사용자의 것인지 확인하는 함수 정의
  const isMyComment = (commentAuthorAccountName) => {
    return userAccountName === commentAuthorAccountName;
  };

  // 모달 창 옵션 변경 함수 정의
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

  // 게시물이 현재 로그인한 사용자의  것인지 확인하는 함수 정의
  const myPost = ( postAuthorAccountName) => {
    return userAccountName === postAuthorAccountName;
  };

  // 게시물에 대한 모달 창 열기 함수 정의
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



  // 댓글을 입력하면 화면에 보이도록하는 함수 정의
  const handlePostComment = () => {
    if (comment.trim() !== '') {
      setCommentToShow(comment);
      setComment('');
    }
  };


  // 좋아요 클릭 처리 함수 정의
  const handleLikeClick = async () => {
    if (liked) {
      setLikeNum(likeNum - 1);
    } else {
      setLikeNum(likeNum + 1);
    }
    setLiked(!liked);
  };

  // 선택된 게시물이 없는 경우 로딩 표시
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