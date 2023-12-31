import React, { useState, useEffect } from 'react';
import { GlobalStyle, Container, SubContainer } from '../../Styles/reset.style';
import { 
  CommunityCategory, IconMapMark, IconShareInfoMap, IconUserProfile,
  MyLocation, PostReaction, PostUserName, PostTitle, ShareInfoMap, ShareInfoPost, BtnAdd, PostSubInfo, ProfileInfo, UserProfile, ProfileImg, ProfileTxt, ProfileName, ProfileId
} from './Community.style';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TabMenu from '../../Components/Common/TabMenu/TabMenu';
import HeaderLayouts from '../../Components/Common/Header/Header';
import axios from 'axios';

import iconMap from '../../assets/image/icon-map.png';
import shareInfoMap from '../../assets/image/img-share-info-map.png';
import walkingCrewMap from '../../assets/image/img-walking-crew-map.png';
import missingReportMap from '../../assets/image/img-missing-report-map.png';
import userProfile from '../../assets/image/icon-basic-profile.png';
import userProfile2 from '../../assets/image/icon-test-user-profile.png';
import userProfile3 from '../../assets/image/icon-test-user-profile2.png';
import addBtn from '../../assets/image/icon-add.png';
import Loading from '../../Components/Common/Modal/Loading';

function Community() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('정보 공유');
  const [posts, setPosts] = useState([]);

  const isValidJSON = (str) => {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
};

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('https://api.mandarin.weniv.co.kr/post/?limit=999&skip=0', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        console.log("API Response:", res.data);

        const fetchedPosts = Array.isArray(res.data.posts) ? res.data.posts : [];

        setPosts(fetchedPosts.filter(post => {
          if (!isValidJSON(post.content)) {
            // console.warn("Invalid JSON detected:", post.content);
            return false;
          }
          
          const postContent = JSON.parse(post.content);
          return postContent.category === activeCategory;
        }));
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, [activeCategory]);

  const handleBtnAddClick = () => {
    navigate('/community/upload');
  };

  const mapImages = {
    '정보 공유': shareInfoMap,
    '산책 크루': walkingCrewMap,
    '반려 돌보미': shareInfoMap,
    '실종 신고': missingReportMap,
  };

  // const contentData = {
  //   '정보 공유': {
  //     mapImage: shareInfoMap,
  //     posts: [
  //     {
  //       profileImage: userProfile,
  //       title: '광화문 24시 동물병원 추천!',
  //       author: '김펫피',
  //       likes: 0,
  //       comments: 0
  //     },
  //     {
  //       profileImage: userProfile2, // 이미지와 내용을 원하는 대로 수정하세요.
  //       title: '종각역 애견카페 추천드려요!',
  //       author: '애견카페러버',
  //       likes: 5,
  //       comments: 2
  //     },
  //     {
  //       profileImage: userProfile3, // 이미지와 내용을 원하는 대로 수정하세요.
  //       title: '시청역 강아지 동반 음식점',
  //       author: '펫피플',
  //       likes: 3,
  //       comments: 1
  //     }
  //   ]
  //   },

  //   '산책 크루': {
  //     mapImage: walkingCrewMap,  // 이미지 경로를 수정해주세요.
  //     posts: [
  //     {
  //       profileImage: userProfile2,
  //       title: '내일 오후 8시 광화문 산책 같이하실 분~',
  //       author: '산책매니아',
  //       likes: 0,
  //       comments: 0
  //     },
  //     {
  //       profileImage: userProfile3,
  //       title: '대형견 산책 함께 하실 분~',
  //       author: '리트리버',
  //       likes: 0,
  //       comments: 0
  //     },
  //     {
  //       profileImage: userProfile,
  //       title: '힙지로 산책 크루 모집합니다!',
  //       author: '홍길동',
  //       likes: 0,
  //       comments: 0
  //     }
  //   ]
  //   },
    
  //   '반려 돌보미': {
  //     mapImage: shareInfoMap,  // 이미지 경로를 수정해주세요.
  //     posts: [
  //     {
  //       profileImage: userProfile3,
  //       title: '광화문/종각/시청/을지로 반려동물 대신 봐드려요~',
  //       author: '김시루',
  //       likes: 0,
  //       comments: 0
  //     },
  //     {
  //       profileImage: userProfile,
  //       title: '내일 하루만 강아지 돌봐주실 분ㅠ',
  //       author: '박감자',
  //       likes: 0,
  //       comments: 0
  //     },
  //     {
  //       profileImage: userProfile2,
  //       title: '내일 하루만 강아지 돌봐주실 분ㅠ',
  //       author: '김뽀삐',
  //       likes: 0,
  //       comments: 0
  //     }
  //   ]
  //   },

  //   '실종 신고': {
  //     mapImage: missingReportMap,  // 이미지 경로를 수정해주세요.
  //     posts: [
  //     {
  //       profileImage: userProfile3,
  //       title: '강아지를 찾습니다ㅠㅠ(광화문 근처)',
  //       author: '중구시민',
  //       likes: 0,
  //       comments: 0
  //     },
  //     {
  //       profileImage: userProfile2,
  //       title: '시청역 근처에서 돌아다니는 시츄 보신 분!!',
  //       author: '김시츄',
  //       likes: 0,
  //       comments: 0
  //     }
  //   ]
  //   },
  // };

  const currentMapImage = mapImages[activeCategory];

  
  return (
    <>
      <GlobalStyle />
      <Container>
        <HeaderLayouts title="커뮤니티" logo={true} search />
        <SubContainer>
          <CommunityCategory>
          <button className={activeCategory === '정보 공유' ? 'active' : ''} 
          onClick={() => setActiveCategory('정보 공유')}>정보 공유</button>

          <button className={activeCategory === '산책 크루' ? 'active' : ''}
          onClick={() => setActiveCategory('산책 크루')}>산책 크루</button>

          <button className={activeCategory === '반려 돌보미' ? 'active' : ''}
          onClick={() => setActiveCategory('반려 돌보미')}>반려 돌보미</button>
          
          <button className={activeCategory === '실종 신고' ? 'active' : ''}
          onClick={() => setActiveCategory('실종 신고')}>실종 신고</button>
          </CommunityCategory>
          

          {posts.length === 0 ? (
            <Loading/>
          ) : (
            <>
              <ShareInfoMap>
              <MyLocation>
                <IconMapMark src={iconMap} alt="위치표시" />
                <p>서울시 중구</p>
              </MyLocation>
              {/* <IconShareInfoMap src={currentMapImage} alt="지도 이미지" /> */}
              <IconShareInfoMap>
                <img src={currentMapImage} alt="지도 이미지" />
              </IconShareInfoMap>
            </ShareInfoMap>
            
              {posts.map((post, index) => (
              
                // 유저 프로필 이미지
                <ProfileInfo key={index}>
                  <UserProfile>
                    <Link to={`/profile/${post.author.accountname}`} state={{ selectedPost: post }}>
                      <ProfileImg src={post.author.image} alt="user-profile" />
                    </Link>
  
                  {/* 게시글 제목, 유저 네임 */}
                  <Link to={`/community/${post._id}`} state={{ selectedPost: post }}>
                      <ProfileTxt>
                        <PostTitle>
                          <h2>{JSON.parse(post.content).title}</h2>
                        </PostTitle>
                        <ProfileId>
                          {post.author.username}
                        </ProfileId>
                      </ProfileTxt>
                    </Link>
                  </UserProfile>
  
                  {/* 이슈: 'ProfileTxt'과 'PostReaction' 사이에 여백이 존재하여, 여백에서는 게시글로 이동할 수 있는 마우스 포인터가 비활성화 됩니다. 이슈 발생 이유는 프로필을 클릭했을 때 프로필 페이지로 이동시키기 위해 Link를 분리하면서 레이아웃 구조를 재수정하면서 발생되었습니다.  ProductDetail.style을 참고하여 적용하였고,임시로 PostReaction에 Link를 추가하였습니다. 리팩토링 때 수정 필요한 부분입니다.  */}
                  <Link to={`/community/${post._id}`} state={{ selectedPost: post }}>
                    {/* 좋아요, 댓글 */}
                        <PostReaction>
                          <p>좋아요 {post.heartCount}</p>
                          <p>댓글 {post.comments.length}</p>
                        </PostReaction>
                  </Link>
                </ProfileInfo>
              ))}
            </>
          )}
          
          <BtnAdd onClick={handleBtnAddClick}>
            <img src={addBtn} alt="추가버튼" />
          </BtnAdd>
        </SubContainer>
        <TabMenu />
      </Container>
    </>
  );
}

export default Community;
