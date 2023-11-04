import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { Overlay } from '../Product/ProductDetail.style';
import BottomModal from '../Common/Modal/BottomModal';
import moreIcon from '../../assets/image/icon-more-vertical.png';
import HeartIcon from '../../assets/image/icon-heart.png';
import userImg from '../../assets/image/icon-basic-profile.png';
import onAllbumIcon from '../../assets/image/icon-post-album-on.png';
import offAllbumIcon from '../../assets/image/icon-post-album-off.png';
import onListIcon from '../../assets/image/icon-post-list-on.png';
import offListIcon from '../../assets/image/icon-post-list-off.png';
import commentIcon from '../../assets/image/icon-comment.png';
import { Container } from '../../Styles/reset.style';

const MyFeed = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlbumActive, setIsAlbumActive] = useState(true);
  const [isListActive, setIsListActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10; // Set the posts per page as needed
  const { accountname } = useParams();

  // 토글버튼 리스트 엘범형
  const toggleAlbum = () => {
    setIsAlbumActive(true);
    setIsListActive(false);
  };
  
  const toggleList = () => {
    setIsAlbumActive(false);
    setIsListActive(true);
  };

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.mandarin.weniv.co.kr/post/${accountname}/userpost`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-type': 'application/json',
          },
        }
      );
      setPosts(response.data.post.map(p => ({ ...p, images: p.images || [] })));
    } catch (error) {
      console.error('Failed to fetch posts', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (accountname) {
      fetchPosts();
    }
  }, [accountname]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
  <Layer>
    <ViewBtn active={isAlbumActive} onClick={toggleAlbum}>
      <BtnImg src={isAlbumActive ? onListIcon : offListIcon} alt="Album" />
    </ViewBtn>
    <ViewBtn active={isListActive} onClick={toggleList}>
      <BtnImg src={isListActive ? onAllbumIcon : offAllbumIcon} alt="List" />
    </ViewBtn>
  </Layer>
  
      {/* 리스트형 */}
      {isAlbumActive &&
        posts.map((post) => (
          <React.Fragment key={post.id}>
            <UserInfo>
              <UserProfile>
                <UserImg src={post.author.profileImage || userImg} alt='사용자 프로필 이미지' />
                <UserName>
                  <NameTxt>{post.author.username}</NameTxt>
                  <UserId>{post.author.accountname}</UserId>
                </UserName>
              </UserProfile>
              <MoreBtn onClick={() => setIsModalOpen(true)}>
                <IconMore src={moreIcon} />
              </MoreBtn>
            </UserInfo>
            <ContentBox>
                  {post.image && <ContentImg src={post.image} alt="Post" />}
              <ContentTxt className='text'>{post.content}</ContentTxt>
              {post.images && post.images.map((image, index) => (<ContentImg key={index} src={image.url} alt={`포스팅 이미지 ${index}`} />
              ))}
            </ContentBox>
            <ContentBox>
              <IconBox>
                <IconBtn>
                  <IconBtnImg src={HeartIcon} alt='하트 아이콘' />
                  <IconCount>{post.likesCount}</IconCount>
                </IconBtn>
                <IconBtn>
                  <IconBtnImg src={commentIcon} alt='댓글 아이콘' />
                  <IconCount>{post.commentsCount}</IconCount>
                </IconBtn>
              </IconBox>
              <PostDate>{new Date(post.createdAt).toLocaleDateString()}</PostDate>
            </ContentBox>
          </React.Fragment>
        ))
      }
      {/* 엘범형

      {isListActive && (
      <ListImages>
            {posts.map((post) => (
              <ListImage
                key={post.id}
                src={post.image}
                alt={`Post by ${post.author.username}`}
              />
            ))}
          </ListImages>
      )} */}

            {/* 엘범형 */}

            {isListActive && (
      <ListImages>
            {posts
            .filter(post => post.image || (post.images && post.images.length > 0)) // 이미지가 있는 포스트만 필터링
            .map((post) => (
              <ListImage
                key={post.id}
                src={post.image}
                alt={`Post by ${post.author.username}`}
              />
            ))}
          </ListImages>
      )}
  
      {/* 신고하기 모달 창 */}
      {isModalOpen && (
        <>
          <Overlay onClick={() => setIsModalOpen(false)} />
          <BottomModal setIsModalOpen={setIsModalOpen} reportTxt={["수정", "삭제"]} />
        </>
      )}
    </Container>

  );  
}

export default MyFeed

// 스타일 컴포넌트
export const Layer = styled.div`
    height: 44px;
    margin-top:27px ;
    padding: 10px;
    display: flex;
    justify-content:flex-end;
    gap: 16px;
    border-top: 1px solid #DBDBDB;
    border-bottom: 1px solid #DBDBDB;
    cursor: pointer;
`
export const ViewBtn = styled.button`
    width: 26px;
    height: 26px;
`
export const BtnImg = styled.img`
    width: 100%;
    height: 100%;
`
export const UserInfo = styled.div`
  margin:  20px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const UserProfile = styled.div`
  display: flex;
  gap: 12px;
`
export const UserImg = styled.img`
    width: 42px;
    height: 42px;
    border-radius: 50%;
    object-fit: cover;
    vertical-align: top;
`

export const UserName =styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-top: 4px;
    cursor: pointer;
`
export const UserId = styled.span`
    font-size:12px ;
    font-weight: 400;
`
export const NameTxt = styled.p`
    font-size:14px ;
    font-weight: 500;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`
export const MoreBtn = styled.button`
    width: 18px;
    height: 18px;
`
export const IconMore = styled.img`
  width: 18px;
  height: 18px;
  margin-top: 4px;
  cursor: pointer;
`

export const ContentBox = styled.div`
  margin: 0 16px 16px 54px;
`

export const ContentTxt = styled.p`
    font-size: 14px;
    font-weight: 400;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
`
export const ContentImg = styled.img`
    border-radius: 10px;
    width: 304px;
    object-fit: cover;
    margin-top: 16px;
`;

export const IconBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: start; 
    margin-top: 10px;
    gap: 17px;
`
export const IconBtn = styled.button`
    cursor: pointer;
`
export const IconBtnImg = styled.img`
      vertical-align: text-bottom;
    width: 15px;
    height: 15px;
    margin-right: 6px;
`

export const IconCount = styled.span`
    font-size: 12px;
    margin-left: 6px;
    cursor: pointer;
`
export const PostDate = styled.div`
  font-size: 12px;
  margin-top: 16px;
`;

// 엘범형 스타일

const ListImages = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin:16px;
  max-width: 100%;
  `;
  
  const ListImage = styled.img`
  width: 114px;
  height: 114px;
  object-fit: cover;
`;