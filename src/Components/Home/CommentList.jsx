import React, { useEffect, useState } from 'react'
import * as S from './PostList.style';
import moreIcon from '../../assets/image/icon-more-vertical.png';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Container } from '../../Styles/reset.style';

function formatDate(dateString) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export default function CommentList(props) {
  const defaultUserImg = "https://api.mandarin.weniv.co.kr/1698653743844.jpg";
  const [comments, setComments] = useState([]);
  const [userImg, setUserImg] = useState(null);
  const { postId } = useParams();
  const location = useLocation();
  const selectedPost = location.state?.selectedPost;
  const [userAccountName, setUserAccountName] = useState(false);
  const [isMyPost, setIsMyPost] = useState(false); // 추가: 현재 사용자의 게시물 여부
  
  useEffect(() => {
    fetchMyProfile();
    if (selectedPost) {
      fetchComments(selectedPost.id);
    }
  }, [selectedPost]);

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
        const userAccountName = data.user.accountname
        setUserAccountName(userAccountName)
        setIsMyPost(userAccountName === selectedPost.author?.accountname);
      }
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`https://api.mandarin.weniv.co.kr/post/${postId}/comments`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-type": "application/json",
        },
      });
      const data = await response.json();

      if (data) {
        setComments(data.comments.reverse()); // 가져온 댓글 데이터를 설정
      }
    } catch (error) {
      console.error("댓글 가져오기 에러:", error);
    }
  };
  const addComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  if (!selectedPost) {
    return null;
  }
    return (
      <S.CommentBox>
       {comments.map((comment)=>(
       <>
           <S.UserInfo  key={comment}>
     
             <Link to={`/profile/${comment.author.accountname}`}>
          <S.UserProfile>
                 <S.CommentImg src={comment.author.image  || defaultUserImg} alt='사용자 프로필 이미지' />
               <S.NameTxt>{comment.author.username} </S.NameTxt>
               <S.Account>· {formatDate(comment.createdAt)}</S.Account>
          </S.UserProfile>
             </Link>
    
           <button onClick={() => props.onChangeModal(comment, props.isMyComment(comment.author.accountname))}>
             <S.IconMore src={moreIcon} alt='신고하기 모달창 불러오기' />
           </button>
         </S.UserInfo>
         <S.CommentTxt>{comment.content}</S.CommentTxt>
       </>
       ))}
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
  // console.log(comment)

  return (
   <Container>
      <S.InputForm>
        <div>
          <S.InputImg src={userImg  || defaultUserImg} alt="사용자 프로필" />
          <S.CommentInput
            type="text"
            placeholder="댓글 입력하기..."
            onChange={(e) => setComment(e.target.value)}
            value={comment || ''}
          />
        </div>
        <S.InputBtn
          type="submit"
          disabled={!comment || comment.trim().length === 0}
          onClick={()=>{
            handlePostComment()
            postComment()
        
          }} 
        >
          게시
        </S.InputBtn>
      </S.InputForm>
   </Container>
  );
}