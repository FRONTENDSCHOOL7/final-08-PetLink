import React, { useState, useEffect } from 'react';
import { GlobalStyle, Container, SubContainer } from '../../Styles/reset.style';
import { 
  CommunityCategory, IconMapMark, IconShareInfoMap,
  MyLocation, PostReaction, PostTitle, ShareInfoMap, BtnAdd, ProfileInfo, UserProfile, ProfileImg, ProfileTxt, ProfileId
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
import addBtn from '../../assets/image/icon-add.png';
import Loading from '../../Components/Common/Modal/Loading';

function Community() {
  // 페이지 네비게이션(이동)제어
  const navigate = useNavigate();
  // 현재 활성화 된 카테고리를 관리하는 state
  const [activeCategory, setActiveCategory] = useState('정보 공유');
  // 게시글 데이터를 저장하는 state
  const [posts, setPosts] = useState([]);

  // JSON 형식의 문자열이 유효한지 검사하는 함수
  // 서버로부터 받은 데이터가 항상 예상한 형식이라는 보장이 없기 때문에 해당 함수를 사용함으로써 잠재적 오류를 예방하고, 데이터가 유효한 JSON형식인 경우에만 파싱 및 처리 진행할 수 있음
  const isValidJSON = (str) => {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
};

 // 컴포넌트가 마운트되거나 'activeCategory'상태가 변경될 때 실행될 useEffect훅
  useEffect(() => {
    // 게시글 데이터를 비동기적으로 가져오는 함수
    const fetchPosts = async () => {
      // 로컬 스토리지에서 'token'을 가져옴
      const token = localStorage.getItem('token');
      try {
        // axios를 사용해 API 요청을 통해 게시글 데이터 가져오기
        const res = await axios.get('https://api.mandarin.weniv.co.kr/post/?limit=999&skip=0', {
          headers: {
            Authorization: `Bearer ${token}`, // header에 인증 토큰 추가
            'Content-Type': 'application/json', // 콘텐츠 타입을 JSON으로 설정
          },
        });
        
        console.log("API Response:", res.data); // 콘솔에 API응답 로깅

        // 응답 데이터에서 'posts' 배열 추출 (없을 경우 빈 배열 반환)
        const fetchedPosts = Array.isArray(res.data.posts) ? res.data.posts : [];

        // 유효한 JSON인 게시글만 필터링하여 상태에 저장
        setPosts(fetchedPosts.filter(post => {
          if (!isValidJSON(post.content)) {
            // 유효하지 않은 JSON인 경우 필터링에서 제외
            return false;
          }
          
          const postContent = JSON.parse(post.content); // 문자열을 JSON객체로 변환
          return postContent.category === activeCategory; // 현재 카테고리에 해당하는 게시글만 반환
        }));
      } catch (err) {
        console.error(err); // 오류 발생 시 콘솔에 오류 로깅
      }
    };

    fetchPosts(); // fetchPosts 함수 실행
  }, [activeCategory]); // 'activeCategory'가 변경될 때 마다 useEffect 훅 재실행

  // '추가'버튼 클릭 핸들러
  const handleBtnAddClick = () => {
    navigate('/community/upload');
  };

  // 카테고리별 지정된 지도 이미지를 매핑하는 객체
  const mapImages = {
    '정보 공유': shareInfoMap,
    '산책 크루': walkingCrewMap,
    '반려 돌보미': shareInfoMap,
    '실종 신고': missingReportMap,
  };

  // 현재 활성화 된 카테고리에 해당하는 지도 이미지를 가져옴
  const currentMapImage = mapImages[activeCategory];

  // 컴포넌트의 반환 부분(JSX)
  return (
    <>
      <GlobalStyle />
      <Container>
        <HeaderLayouts title="커뮤니티" logo={true} search />
        <SubContainer>
          <CommunityCategory>
            {/* 각 카테고리별 버튼. 현재 카테고리에 따라 'active'클래스 적용 */}
          <button className={activeCategory === '정보 공유' ? 'active' : ''} 
          onClick={() => setActiveCategory('정보 공유')}>정보 공유</button>

          <button className={activeCategory === '산책 크루' ? 'active' : ''}
          onClick={() => setActiveCategory('산책 크루')}>산책 크루</button>

          <button className={activeCategory === '반려 돌보미' ? 'active' : ''}
          onClick={() => setActiveCategory('반려 돌보미')}>반려 돌보미</button>
          
          <button className={activeCategory === '실종 신고' ? 'active' : ''}
          onClick={() => setActiveCategory('실종 신고')}>실종 신고</button>
          </CommunityCategory>
          
          {/* 게시글이 없을 경우 로딩 컴포넌트 표시 */}
          {posts.length === 0 ? (
            <Loading/>
          ) : (
            <>
            {/* 커뮤니티 메인화면 중 사용자 위치 및 지도 표시 영역 */}
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
            
              {/* 게시글 목록을 순회하여 각 게시글 렌더링 */}
              {posts.map((post, index) => (
              
                // 유저 프로필 이미지
                // / ProfileInfo에 onClick 이벤트를 추가하여 전체 영역을 클릭 가능하게 함(게시글 클릭 시, 게시글 상세 페이지로 이동)
                <ProfileInfo key={index} onClick={() => navigate(`/community/${post._id}`, { state: { selectedPost: post } })}>
                  <UserProfile>
                    {/* UserProfile 내부의 Link에 event.stopPropagation을 추가하여 ProfileInfo의 onClick 이벤트가 실행되지 않도록 하며(이벤트 버블링 방지), 유저 프로필 이미지 클릭 시, 해당 유저 프로필로 이동됨 */}
                    <Link to={`/profile/${post.author.accountname}`} 
                      state={{ selectedPost: post }} 
                      onClick={(e) => e.stopPropagation()}>
                      <ProfileImg src={post.author.image} alt="user-profile" />
                    </Link>
  
                  {/* 게시글 제목, 유저 네임 */}
                      <ProfileTxt>
                        <PostTitle>
                          <h2>{JSON.parse(post.content).title}</h2>
                        </PostTitle>
                        <ProfileId>
                          {post.author.username}
                        </ProfileId>
                      </ProfileTxt>
                  </UserProfile>
  
                    {/* 좋아요, 댓글 */}
                        <PostReaction>
                          <p>좋아요 {post.heartCount}</p>
                          <p>댓글 {post.comments.length}</p>
                        </PostReaction>
                </ProfileInfo>
              ))}
            </>
          )}
          {/* 게시글 추가 버튼 */}
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
