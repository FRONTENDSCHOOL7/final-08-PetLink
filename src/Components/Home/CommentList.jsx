import React, { useEffect, useState } from 'react'
import * as S from './PostList.style';
import moreIcon from '../../assets/image/icon-more-vertical.png';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Container, SubContainer } from '../../Styles/reset.style';
import axios from 'axios';
import { Overlay } from '../Product/ProductDetail.style';
import BottomModal from '../Common/Modal/BottomModal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportOptions, setReportOptions] = useState([]);
// 댓글 삭제 함수
const deleteComment = async (postId, commentId) => {
  try {
    console.log('Delete comment for post:', postId, 'comment:', commentId);

    const deleteResponse = await axios.delete(`https://api.mandarin.weniv.co.kr/post/${postId}/comments/${commentId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });

      alert('댓글이 삭제되었습니다.');
   
  } catch (error) {
    console.error('댓글 삭제 중 에러:', error);
  }
};


const isMyComment = (commentAuthorAccountName) => {
  return userAccountName === commentAuthorAccountName;
};

const onChangeModal = (comment, isMyComment) => {
  console.log("userAccountName:", userAccountName)
  console.log("comment", comment)
  let modalOptions = [];

  if (isMyComment) {
    modalOptions = [
      { action: "수정하기", alertText: "수정하시겠습니까?" },
      { action: "삭제하기", alertText: "삭제하시겠습니까?" , onSelect: () => deleteComment(selectedPost.id, comment._id) },
    ];
  } else {
    modalOptions = [
      { action: "신고하기", alertText: "신고하시겠습니까?" },
    ];
  }

  setIsModalOpen(true);
  setReportOptions(modalOptions);
};



  useEffect(() => {
    fetchMyProfile();
    if (selectedPost) {
      fetchComments(selectedPost.id);
    }
  }, [selectedPost]);

useEffect(()=>{
if(!props.commentLoading){
    fetchComments(selectedPost.id);
}
},[props.commentLoading])

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
 
    
console.log(data)
      if (data) {
        setComments(data.comments.reverse()); // 가져온 댓글 데이터를 설정
      }
    } catch (error) {
      console.error("댓글 가져오기 에러:", error);
    }
  };


  if (!selectedPost) {
    return null;
  }

    //  const addComment = (newComment) => {
    //     setComments((prevComments) => [...prevComments, newComment]);
    //   };

    return (
   
  <>
         <SubContainer>
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
                
                       <button onClick={() => onChangeModal(comment.author?.accountname, isMyComment(comment.author.accountname))}>
                         <S.IconMore src={moreIcon} alt='신고하기 모달창 불러오기' />
                       </button>
                     </S.UserInfo>
                     <S.CommentTxt>{comment.content}</S.CommentTxt>
                   </>
              ))}
             </S.CommentBox>
         </SubContainer>
             {isModalOpen && (
                    <>
                      <Overlay onClick={() => setIsModalOpen(false)} />
                      <BottomModal 
                      setIsModalOpen={setIsModalOpen} 
                      reports={reportOptions}
                      onDelete={() => deleteComment(props.comment.id)}
                      />
                    </>
                  )}
  </>

    );
  }
  
  export function WriteComment({ comment, setComment, handlePostComment ,addComment , setCommentLoading}) {
  const [userImg, setUserImg] = useState(null);
  const { postId } = useParams();
  const defaultUserImg = "https://api.mandarin.weniv.co.kr/1698653743844.jpg";
  const [isLoading, setIsLoading] = useState(false);
 


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
    setIsLoading(true); // 로딩 상태를 활성화
    try {
      if (typeof comment !== 'string') {
        comment = '';
      }
setCommentLoading(true)

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
       addComment(responseData.comment); // 댓글 목록에 추가
        setComment(''); // 입력된 댓글 초기화
      }
    } catch (error) {
      console.error("댓글 가져오기 에러:", error);
    }finally {
      setIsLoading(false); // 로딩 상태를 비활성화
      setCommentLoading(false)
    }
  };
  // console.log(comment)

  return (
   <>
      <S.InputForm>
        <>
          <S.InputImg src={userImg  || defaultUserImg} alt="사용자 프로필" />
          <S.CommentInput
            type="text"
            placeholder="댓글 입력하기..."
            onChange={(e) => setComment(e.target.value)}
            value={comment || ''}
          />
        </>
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
   </>
  );
}