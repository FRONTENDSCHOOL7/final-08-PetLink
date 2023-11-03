import React, { useEffect, useState } from 'react'
import * as S from './PostList.style';
import moreIcon from '../../assets/image/icon-more-vertical.png';
import { Link, useLocation, useParams } from 'react-router-dom';

export default function CommentList(props) {
  const defaultUserImg = "https://api.mandarin.weniv.co.kr/1698653743844.jpg";
  const [comments, setComments] = useState([]);
  const [userImg, setUserImg] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null); // 로그인한 사용자의 ID를 저장하기 위한 상태
  const { postId } = useParams();
  const location = useLocation();
  const selectedPost = location.state?.selectedPost;

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

        if (data) {
          setUserImg(data.user.image);
          setCurrentUserId(data.user._id); // 사용자 ID를 상태에 저장
        }
      } catch (error) {
        console.error("에러:", error);
      }
    };

    fetchMyProfile();

     // 선택된 게시물에 대한 댓글을 가져옴
    const fetchComments = async (postId) => {
      const id = postId || selectedPost?.id;
      if (!postId) {
        console.log('postId is undefined!');
        return;
      }
      try {
        const response = await fetch(`https://api.mandarin.weniv.co.kr/post/${postId}/comments`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data) {
          setComments(data.comments); // 가져온 댓글 데이터를 상태에 저장
        }
      } catch (error) {
        console.error("댓글 가져오기 에러:", error);
      }
    };
  
    fetchComments(); // postId와 selectedPost 중 유효한 것을 사용하여 호출

  }, [postId, selectedPost]); // postId 또는 selectedPost가 변경될 때마다 실행

  // ... 컴포넌트의 나머지 부분 ...

  // 댓글 상태가 변화할 때마다 콘솔에 출력
  useEffect(() => {
    console.log('Comments:', comments);
  }, [comments]);


const fetchComments = async () => {
  try {
    const response = await fetch(`https://api.mandarin.weniv.co.kr/post/${postId}/comments`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (data) {
      setComments(data.comments); // 가져온 댓글 데이터를 상태에 저장
    }
  } catch (error) {
    console.error("댓글 가져오기 에러:", error);
  }
};

const addComment = (newComment) => {
  setComments((prevComments) => [newComment, ...prevComments]);
};

const handleCommentOptionClick = (comment) => {
  // 신고 모달 옵션
  const reportOptions = [
    { action: "신고하기", alertText: "댓글을 신고하시겠습니까?" },
  ];

  // 댓글 작성자와 로그인한 사용자가 동일한 경우의 옵션
  const commentOwnerOptions = [
    { action: "수정하기", alertText: "댓글을 수정하시겠습니까?" },
    { action: "삭제하기", alertText: "댓글을 삭제하시겠습니까?" },
  ];

  // 로그인한 사용자가 댓글 작성자와 동일한 경우 수정/삭제 옵션을 보여줌
  if (currentUserId === comment.author._id) {
    props.onChangeModal(commentOwnerOptions, comment);
  } else {
    // 그렇지 않으면 신고 옵션 모달을 보여줌
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