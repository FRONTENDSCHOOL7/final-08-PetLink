import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components'

// Global Styles
export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700&display=swap');
  html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font-family: 'Nanum Gothic', sans-serif;
	vertical-align: baseline;
	text-decoration: none;
}

body, html {
	background-color: #d4e8ff;
	height: 100%;
	display: flex;
	justify-content: center;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
`;

export const Container = styled.div`
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
