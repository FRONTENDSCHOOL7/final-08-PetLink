import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function Bangyeolgori({ post, style }) {
  const [isBangyeolgori, setIsBangyeolgori] = useState(false);

  useEffect(() => {
    if (post) {
      const { intro } = post;
      if (intro && intro.includes("#Bangyeolgori")) {
        setIsBangyeolgori(true);
      } else {
        setIsBangyeolgori(false);
      }
    }
  }, [post]);

  if (isBangyeolgori) {
    // Bangyeolgori가 포함된 게시물인 경우 표시
    return (
      <div style={style}>
        <p>#Bangyeolgori</p>
      </div>
    );
  } else {
    // Bangyeolgori가 포함되지 않은 게시물인 경우 아무것도 표시하지 않음
    return null;
  }
}

Bangyeolgori.propTypes = {
  post: PropTypes.object.isRequired,
  style: PropTypes.object, // 스타일 객체를 전달받습니다.
};

export default Bangyeolgori;