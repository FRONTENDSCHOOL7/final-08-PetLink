import React, { useEffect, useState } from 'react'
import * as S from './PostList.style';
import moreIcon from '../../assets/image/icon-more-vertical.png';
import { useParams } from 'react-router-dom';

export default function CommentList(props) {
  const defaultUserImg = "https://api.mandarin.weniv.co.kr/1698653743844.jpg";
    if (!props.comment) {
      return null;
    }
    return (
      <S.CommentBox>
        <S.UserInfo>
          <div>
            <a href='#'>
              <img src={props.userImage  || defaultUserImg} alt='사용자 프로필 이미지' />
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
  const { postId } = useParams();
  const defaultUserImg = "https://api.mandarin.weniv.co.kr/1698653743844.jpg";


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
        setUserImg(data.user.image);
      }
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const postComment = async () => {
    try {
 
      const response = await fetch(`https://api.mandarin.weniv.co.kr/post/${postId}/comments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          comment: {
            content: comment, 
          },
        }),
      });

      const responseData = await response.json();
console.log(responseData)
      if (responseData.comment) {
       
        setComment(responseData.comment.content);
      }
    } catch (error) {
      console.error("에러:", error);
    }
  };
  console.log(comment)
  
  return (
    <S.InputForm>
      <div>
        <img src={userImg  || defaultUserImg} alt="사용자 프로필" />
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
        onClick={()=>{
          handlePostComment()
          postComment()
        
        }} 
      >
        게시
      </button>
    </S.InputForm>
  );
}