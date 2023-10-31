import React, { useEffect, useState } from 'react'
import * as S from './PostList.style';
import profileIcon from '../../assets/image/icon-basic-profile.png';
import moreIcon from '../../assets/image/icon-more-vertical.png';

export default function CommentList(props) {
    if (!props.comment) {
      return null;
    }
    return (
      <S.CommentBox>
        <S.UserInfo>
          <div>
            <a href='#'>
              <img src={props.userImage || profileIcon} alt='사용자 프로필 이미지' />
            </a>
            <p>{props.username} <span>· {props.date}</span></p>
          </div>
          <button onClick={props.onChangeModal}>
            <img src={moreIcon} alt='신고하기 모달창 불러오기' />
          </button>
        </S.UserInfo>
        <S.CommentTxt>{props.comment}</S.CommentTxt>
      </S.CommentBox>
    );
  }
  
  export function WriteComment({ comment, setComment, handlePostComment }) {
  const [userImg, setUserImg] = useState(null);

  useEffect(() => {
    fetchMyProfile();
  }, []);

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
        setUserImg(
          data.user.image || "https://api.mandarin.weniv.co.kr/Ellipse.png"
        );
      }
    } catch (error) {
      console.error("에러:", error);
    }
  };

  return (
    <S.InputForm>
      <div>
        <img src={userImg} alt="사용자 프로필" />
        <input
          type="text"
          placeholder="댓글 입력하기..."
          onChange={(e) => setComment(e.target.value)}
          value={comment || ''}
        />
      </div>
      <button
        type="submit"
        disabled={!comment || comment.trim().length === 0}
        onClick={handlePostComment} 
      >
        게시
      </button>
    </S.InputForm>
  );
}