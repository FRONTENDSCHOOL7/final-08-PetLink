import React from 'react'
import productImg from '../../assets/images/marketItem1.png'
import profileImg from '../../assets/images/icon-basic-profile.png'



export default function ProductDetail() {
  
  return (
    <div className='container'>
      <img className='img-product' src={productImg}></img>
      <div>
        <img src={profileImg} alt="" />
        <p>쿠키의 일상</p>
        <p>@cookie123</p>
        <button>채팅하기</button>
      </div>
      <div>
        <p>강아지 옷</p>
        <strong>25,000원</strong>
      </div>
      <div>
        <p>상품설명</p>
        <p>새 상품이고 사이즈는 라지입니다.<br/>
        옷이 많아서 판매합니다. <br/>
        택배도 가능하니 연락주세요!</p>
      </div>
    </div> 
    
  )
}
