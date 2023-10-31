import React, { useEffect, useState } from 'react';
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
import CommentList, { WriteComment } from './CommentList';

export default function PostDetail(props) {
  const [likeNum, setLikeNum] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComment] = useState(''); 
  const [commentToShow, setCommentToShow] = useState(''); // 추가: 화면에 보이는 댓글 상태
  const location = useLocation();
  const { selectedPost } = location.state;

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
          <img src={selectedPost.author?.image || "https://api.mandarin.weniv.co.kr/Ellipse.png"} alt='사용자 프로필 이미지' />
          <S.UserName>
            <p>{selectedPost.author?.username}</p>
            <p>{selectedPost.author?.accountname}</p>
          </S.UserName>
        </S.UserProfile>
        <button onClick={onChangeModal}><S.IconMore src={moreIcon} /></button>
      </S.UserInfo>
      <S.Content>
        <p className='text'>{selectedPost.content}</p>
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
          <BottomModal reportTxt={["신고"]} setIsModalOpen={setIsModalOpen} />
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

// export function CommentList(props) {
//   if (!props.comment) {
//     return null; // Do not render if there's no comment
//   }
//   return (
//     <S.CommentBox>
//       <S.UserInfo>
//         <div>
//           <a href='#'>
//             <img src={props.userImage || profileIcon} alt='사용자 프로필 이미지' />
//           </a>
//           <p>{props.username} <span>· {props.date}</span></p>
//         </div>
//         <button onClick={props.onChangeModal}>
//           <img src={moreIcon} alt='신고하기 모달창 불러오기' />
//         </button>
//       </S.UserInfo>
//       <S.CommentTxt>{props.comment}</S.CommentTxt>
//     </S.CommentBox>
//   );
// }

// export function WriteComment({ comment, setComment, handlePostComment }) {
//   const [userImg, setUserImg] = useState(null);

//   useEffect(() => {
//     fetchMyProfile();
//   }, []);

//   const fetchMyProfile = async () => {
//     try {
//       const response = await fetch(`https://api.mandarin.weniv.co.kr/user/myinfo`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-type": "application/json",
//         },
//       });
//       const data = await response.json();

//       if (data) {
//         setUserImg(
//           data.user.image || "https://api.mandarin.weniv.co.kr/Ellipse.png"
//         );
//       }
//     } catch (error) {
//       console.error("에러:", error);
//     }
//   };

//   return (
//     <S.InputForm>
//       <div>
//         <img src={userImg} alt="사용자 프로필" />
//         <input
//           type="text"
//           placeholder="댓글 입력하기..."
//           onChange={(e) => setComment(e.target.value)}
//           value={comment || ''}
//         />
//       </div>
//       <button
//         type="submit"
//         disabled={!comment || comment.trim().length === 0}
//         onClick={handlePostComment} // 게시 버튼을 클릭할 때만 handlePostComment 함수 호출
//       >
//         게시
//       </button>
//     </S.InputForm>
//   );
// }
