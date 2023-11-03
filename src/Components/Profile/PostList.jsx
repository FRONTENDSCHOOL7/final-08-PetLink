import React from 'react';
import styled from 'styled-components';
import PostItem from './PostItem';

const PostListWrapper = styled.div`
  /* 스타일 정의 */
`;

const PostList = ({ posts }) => (
  <PostListWrapper>
    {posts.map((post) => (
      <PostItem key={post.id} post={post} />
    ))}
  </PostListWrapper>
);

export default PostList;
