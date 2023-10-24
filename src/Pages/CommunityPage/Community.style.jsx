import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  background-color: white;
  width: 390px;
  height: 100%;
`;

// Header
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

export const IconSearch = styled.img`
  width: 24px;
  height: 24px;
`;

// Community Category
export const CommunityCategory = styled.div`
  padding: 30px 13px;

  button {
    width: 87px;
    height: 24px;
    margin: 0 2px;
    font-weight: bold;
    background-color: #6C9BD1;
    color: #ffffff;
    border-radius: 30px;
    border-style: none;

    &:hover {
      background-color: #004E98;
    }
  }
`;

export const InfoShareButton = styled.button`
  background-color: #004E98;
`;

// Share Info Map
export const ShareInfoMap = styled.div`
  margin: 0 21px 28px;
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

export const IconShareInfoMap = styled.img`
  width: 349px;
  height: 258px;
`;

// Share Info Post
export const ShareInfoPost = styled.article`
  padding: 0 23px;
  margin-bottom: 20px;

  a {
    display: flex;
    align-items: center;
    width: 100%;
    color: inherit;
  }
`;

export const IconUserProfile = styled.img`
  margin-right: 12px;
  width: 42px;
  height: 42px;
`;

export const PostTitle = styled.div`
  width: 100%;

  h2 {
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 14px;
  }
`;

export const PostSubTxt = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #767676;
`;

export const PostReaction = styled.div`
  display: flex;
  gap: 10px;
`;

export const BtnAdd = styled.button`
  position: absolute;
  right: 20px;
  bottom: 20px;
  z-index: 1000;

  img {
    width: 51px;
    height: 51px;
  }
`;
