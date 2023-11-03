import styled from 'styled-components';

const PostItemWrapper = styled.div`
  margin: 20px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .post-content {
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* number of lines to show */
    line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .post-image-container {
    width: 100%; /* Container width - adjust as needed */
    height: 0; /* initial height */
    padding-top: 100%; /* 1:1 Aspect Ratio */
    position: relative; /* for absolute positioning the image */
    margin-top: 8px;
  }

  .post-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
`;

const PostItem = ({ post }) => (
  <PostItemWrapper>
    <div className="post-content">{post.content}</div>
    {post.image && (
      <div className="post-image-container">
        <img className="post-image" src={post.image} alt="Post" />
      </div>
    )}
    {/* ... 기타 게시글 정보 ... */}
  </PostItemWrapper>
);

export default PostItem;