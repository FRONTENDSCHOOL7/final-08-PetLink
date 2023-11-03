import React, { useEffect, useState } from 'react';
import * as S from './PostList.style';
import moreIcon from '../../assets/image/icon-more-vertical.png';
import { Link, useParams, useLocation } from 'react-router-dom';

export default function CommentList(props) {
  const defaultUserImg = "https://api.mandarin.weniv.co.kr/1698653743844.jpg";
  const [comments, setComments] = useState([]);
  const [userImg, setUserImg] = useState(null);
  const { postId } = useParams();
  const location = useLocation();
  const selectedPost = location.state?.selectedPost;
  const currentUserId = props.currentUserId;

  useEffect(() => {
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

        // if (data) {
        //   setUserImg(data.user.image);
        //   setCurrentUserId(data.user._id);
        // }
      } catch (error) {
        console.error("에러:", error);
      }
    };

    const fetchComments = async (id) => {
      try {
        const response = await fetch(`https://api.mandarin.weniv.co.kr/post/${id}/comments`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (data) {
          setComments(data.comments);
        }
      } catch (error) {
        console.error("댓글 가져오기 에러:", error);
      }
    };

    fetchMyProfile();

    const validPostId = postId || selectedPost?.id;
    if (validPostId) {
      fetchComments(validPostId);
    } else {
      console.log('postId is undefined!');
    }

  }, [postId, selectedPost]);

  useEffect(() => {
    console.log('Comments:', comments);
  }, [comments]);

  const handleCommentOptionClick = (comment) => {
    console.log('Current User ID:', currentUserId); // 현재 사용자 ID를 확인
    console.log('Comment Author ID:', comment.author._id); 

    const reportOptions = [
      { action: "신고하기", alertText: "댓글을 신고하시겠습니까?" },
    ];
  
    const commentOwnerOptions = [
      { action: "수정하기", alertText: "댓글을 수정하시겠습니까?" },
      { action: "삭제하기", alertText: "댓글을 삭제하시겠습니까?" },
    ];
  
    // === 연산자를 사용하여 형 변환 없이 엄격한 비교를 합니다.
    if (currentUserId === comment.author._id) {
      props.onChangeModal(commentOwnerOptions, comment);
    } else {
      props.onChangeModal(reportOptions, comment);
    }
  };

  if (!selectedPost) {
    return null;
  }

  return (
    <S.CommentBox>
      {Array.isArray(comments) ? comments.map((comment) => (
        <React.Fragment key={comment.id}>
          <S.UserInfo>
            <div>
              <Link to={`/profile/${comment.author.accountname}`}>
                <img src={comment.author.image || defaultUserImg} alt='사용자 프로필 이미지' />
              </Link>
              <p>{comment.author.username} <span>· {comment.createdAt}</span></p>
            </div>
            <button onClick={() => handleCommentOptionClick(comment)}>
              <img src={moreIcon} alt='더보기' />
            </button>
          </S.UserInfo>
          <S.CommentTxt>{comment.content}</S.CommentTxt>
        </React.Fragment>
      )) : <p>댓글이 없습니다.</p>}
    </S.CommentBox>
  );
}

  
  export function WriteComment({ comment, setComment, handlePostComment ,addComment }) {
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
      if (typeof comment !== 'string') {
        comment = '';
      }

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

      if (responseData.comment  && responseData.comment.content) {
        setComment(responseData.comment.content);
      }
    } catch (error) {
      console.error("댓글 가져오기 에러:", error);
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