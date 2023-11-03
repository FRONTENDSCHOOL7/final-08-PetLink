import React from 'react';
import styled from 'styled-components';

const PostGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`;

const ImageGridItem = styled.div`
  /* 스타일 정의 */
`;

const ImageGrid = ({ posts }) => (
  <PostGridWrapper>
    {posts.filter(post => post.image).map((post) => (
      <ImageGridItem key={post.id}>
        <img src={post.image} alt="Post" />
      </ImageGridItem>
    ))}
  </PostGridWrapper>
);

export default ImageGrid;