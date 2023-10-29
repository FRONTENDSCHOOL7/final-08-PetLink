import React, { useEffect, useState } from 'react';
import * as S from '../Home/PostList.style';
import moreIcon from '../../assets/image/icon-more-vertical.png';
import profileIcon from '../../assets/image/icon-basic-profile.png';
import PostList, { PostListItem } from '../Home/PostList';
import { useLocation } from 'react-router-dom'; // useLocation을 불러옵니다
import { Container } from '../../Styles/reset.style';
import HeaderLayouts from '../Common/Header/Header';
import { Overlay } from '../Product/ProductDetail.style';
import BottomModal from '../Common/Modal/BottomModal';
import redHeartIcon from '../../assets/image/icon-heart-red.png';
import commentIcon from '../../assets/image/icon-comment.png';
import axios from 'axios';


export default function PostDetail() {
  const [likeNum, setLikeNum] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComment] = useState('');
   // useLocation을 사용하여 현재 위치 정보를 가져옵니다.
   const location = useLocation();
   const selectedPost = location.state.selectedPost;


  const onChangeModal = () => {
    setIsModalOpen(true);
  };


  const sendCommentToServer = async (commentContent, token) => {
    try {
      const apiUrl = `https://api.mandarin.weniv.co.kr/post/${selectedPost.id}/comments`;
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json; charset=utf-8', // 문자 인코딩 지정
      };
      const commentData = {
        comment: {
          content: commentContent,
        },
      };

      const response = await axios.post(apiUrl, JSON.stringify(commentData), { headers });

      if (response.status === 200) {
        console.log('댓글이 성공적으로 서버로 전송되었습니다.');
      } else {
        console.error('댓글 서버로 전송 중 오류:', response.data);
      }
    } catch (error) {
      console.error('댓글 서버로 전송 중 오류:', error);
    }
  };

  const submitComment = (e) => {
    e.preventDefault();
    sendCommentToServer(comment, '여기에 토큰'); // 토큰을 적절히 제공해야 합니다.
  };






  if (!selectedPost) {
    // 선택한 게시글이 없을 때의 처리
    return <div>게시글을 불러오는 중...</div>;
  }
    return (
      <Container>
          <HeaderLayouts back search/>
 <S.UserInfo>
        <S.UserProfile>
          <img src={profileIcon} alt='사용자 프로필 이미지' />
          <S.UserName>
            <p>{selectedPost?.author?.username}</p>
            <p>{selectedPost?.author?.accountname}</p>
          </S.UserName>
        </S.UserProfile>
      </S.UserInfo>
      <S.Content>
        <p className='text'>{selectedPost?.content}</p>
        {selectedPost?.image && <img src={selectedPost?.image} alt="포스팅 이미지" />}
      </S.Content>
      <S.PostIcons>
        <button onClick={() => setLikeNum(likeNum + 1)}>
          <img src={redHeartIcon} alt='좋아요 버튼' />
          <span>{likeNum}</span>
        </button>
        <button onClick={onChangeModal}>
          <img src={commentIcon} alt='댓글 개수' />
        </button>
      </S.PostIcons>
          {isModalOpen && (
            <>
              <Overlay onClick={() => setIsModalOpen(false)} />
              <BottomModal reportTxt={["신고"]} setIsModalOpen={setIsModalOpen} />
            </>
      )}
      <WriteComment comment={comment} setComment={setComment} submitComment={submitComment} />
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

export function WriteComment({ comment, setComment, submitComment }){

  const inputComment= (e)=>{
    setComment(e.target.value)
  }

    return(
      <S.InputForm onSubmit={submitComment}>
              <div >
                <img src={profileIcon} alt="사용자 프로필"/>
                <input type="text" id="comment-input" placeholder="댓글 입력하기..." onChange={inputComment} value={comment || ''} />
              </div>
              <button type="submit" disabled={!comment || comment.length === 0}>게시</button>
      </S.InputForm>
    )
  }
