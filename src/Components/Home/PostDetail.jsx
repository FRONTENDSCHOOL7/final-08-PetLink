import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import * as S from '../Home/PostList.style';
import moreIcon from '../../assets/image/icon-more-vertical.png';
import { Container, SubContainer } from '../../Styles/reset.style';
import HeaderLayouts from '../Common/Header/Header';
import heartIcon from "../../assets/image/icon-heart.png";
import { Overlay } from '../Product/ProductDetail.style';
import BottomModal from '../Common/Modal/BottomModal';
import redHeartIcon from '../../assets/image/icon-heart-red.png';
import commentIcon from '../../assets/image/icon-comment.png';
import CommentList, { WriteComment } from './CommentList';
import axios from 'axios';


function formatDate(dateString) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export default function PostDetail(props) {
  const defaultUserImg = "https://api.mandarin.weniv.co.kr/1698653743844.jpg";
  const [liked, setLiked] = useState(false);
  const [likeNum, setLikeNum] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportOptions, setReportOptions] = useState([]);
  const [comment, setComment] = useState(''); 
  const [commentToShow, setCommentToShow] = useState(''); // 추가: 화면에 보이는 댓글 상태
  const location = useLocation();
  const { selectedPost } = location.state;
  const [userAccountName, setUserAccountName] = useState(false);
  const [isMyPost, setIsMyPost] = useState(false); // 추가: 현재 사용자의 게시물 여부
const [commentLoading, setCommentLoading ] = useState(false)
  const { postId } = useParams();
  const navigate = useNavigate();
// 



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
      navigate('/home');
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
        { action: "수정하기", alertText: "수정하시겠습니까?" , onSelect: () => navigate(`/community/edit/${postId}`)},
        { action: "삭제하기", alertText: "삭제하시겠습니까?" , onSelect: () => deletePost(selectedPost._id ) },
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
      // setCommentToShow(comment);
      setComment('');
      //   const addComment = (newComment) => {
      //   setComments((prevComments) => [...prevComments, newComment]);
      // };
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
            <button onClick={() => onChangeModal(selectedPost.author?.accountname, isMyComment(selectedPost.author?.accountname))}><S.IconMore src={moreIcon} /></button>
          </S.UserInfo>
          <S.Content>
            <S.ContentTxt className='text'>{JSON.parse(selectedPost.content).contentText}</S.ContentTxt>
            {selectedPost.image && <S.ContentImg src={selectedPost.image} alt="포스팅 이미지" />}
            <S.PostIcons>
              <S.IconBtn onClick={handleLikeClick}>
                <S.IconImg src={liked ? redHeartIcon : heartIcon} alt='좋아요 버튼' />
                <S.Count>{likeNum}</S.Count>
              </S.IconBtn>
              <S.IconBtn >
                <S.IconImg src={commentIcon} alt='댓글 개수' />
                <S.Count>0</S.Count>
              </S.IconBtn>
            </S.PostIcons>
            <S.PostDate>{formatDate(selectedPost.createdAt)}</S.PostDate>
          </S.Content>
          </SubContainer>
        <S.Line/>
          <CommentList
            onChangeModal={onChangeModal}
            userImage={selectedPost.author?.image}
            username={selectedPost.author?.username}
            date={selectedPost.date}
            comment={commentToShow} // 변경: 입력된 댓글 내용을 CommentList로 전달
            isMyComment={isMyComment}
            commentLoading={commentLoading}
            />
        <WriteComment
          comment={comment}
          setComment={setComment}
          handlePostComment={handlePostComment} // 변경: handlePostComment 함수 추가
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