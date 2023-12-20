import styled from 'styled-components';


// 전체 컨테이너 스타일
export const Container = styled.div`
  position: relative;
  background-color: white;
  width: 390px;
  height: 100%;
  margin: auto;
`;

// 헤더 섹션 스타일
export const Header = styled.header`
  display: flex;
  padding: 16px 13px 12px 19px;
  justify-content: space-between;
  border-bottom: 1px solid #dbdbdb;

  h1 {
    color: #004E98;
    font-size: 20px;
    font-weight: 700;
  }
`;

// 검색 아이콘 스타일
export const IconSearch = styled.img`
  width: 24px;
  height: 24px;
`;

// 커뮤니티 카테고리 버튼 스타일
export const CommunityCategory = styled.div`
  /* padding: 30px 13px; */
  margin-bottom: 30px;
  display: flex;
  gap: 6px;
  padding: 0 10px;

  button {
    width: 85px;
    height: 24px;
    background-color: #6C9BD1;
    border-radius: 30px;
    font-size: 12px;
    color: white;
    font-weight: 700;

    &:hover,
    &.active {
      background-color: #004E98;
    }

    @media (min-width: 480px) {
      width: 95px; // 태블릿 크기 조정
      font-size: 12px;
    }

    @media (min-width: 768px) {
      width: 105px; // 데스크탑 크기 조정
      font-size: 14px;
    }
  }
`;

// Share Info Map
export const ShareInfoMap = styled.div`
  /* margin: 0 21px 28px; */
  padding: 0 10px;
`;

export const MyLocation = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 13px;

  p {
    font-size: 12px;
    font-weight: bold;
    padding-left: 7px;
  }
`;

export const IconMapMark = styled.img`
  width: 16px;
  height: 20px;
`;

export const IconShareInfoMap = styled.div`
  width: 100%;
  margin: 0 auto 30px;
  text-align: center;

  img {
    width: 80%;
    object-fit: fill; // contain이랑 고민 필요
  }
`;


// 게시글 부분 스타일

export const ProfileInfo = styled.div`
  height: 58px;
  padding: 0 10px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer; // 게시글 영역에 마우스 커서 올릴 시, 포인터로 변경됨 (클릭 시, 상세페이지 이동)
`

export const UserProfile = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`

export const ProfileImg = styled.img`
  border-radius: 42px;
  width: 42px;
  height: 42px;
`

export const ProfileTxt = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;

  @media (min-width: 768px) {
    max-width: 768px;
  }
`

export const PostTitle = styled.p`
  width: 100%;

h2 {
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 14px;
}
`

export const ProfileId = styled.p`
  font-size: 13px;
  color: #767676;
`

export const PostReaction = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
  font-size: 12px;
  color: #767676;
`;

// '추가'버튼 스타일
export const BtnAdd = styled.button`
  display: inline-block;
  position: fixed;
  bottom: 70px;
  right: calc((100% - 390px) / 2 + 16px);
  z-index: 100;

  img {
    width: 51px;
    height: 51px;
  }

    // 화면이 768px 이상일 때
    @media (min-width: 768px) {
    right: calc((100% - 768px) / 2 + 45px); // 화면 너비가 768px 이상일 때 가운데 정렬
  }
`
