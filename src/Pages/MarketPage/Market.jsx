import React, { useEffect } from 'react'
import addBtn from '../../assets/image/icon-add.png'
import { useState } from 'react'
import { BtnAdd, BtnNav, Item, ItemContainer, LikeBtn, NavMenu, PriceLikesWrap, StyledLink } from './Market.style'
import { Container, GlobalStyle, SubContainer} from '../../Styles/reset.style'
import heartIcon from '../../assets/image/icon-heart.png'
import redHeartIcon from '../../assets/image/icon-heart-red.png'
import TabMenu from '../../Components/Common/TabMenu/TabMenu'
import HeaderLayouts from '../../Components/Common/Header/Header'
import axios from 'axios'

export default function Market() {
  const navItems = ['강아지', '고양이', '기타']
  const [activeBtn, setActiveBtn] = useState('강아지');
  const [products, setProducts] = useState([]);
  const [likes, setLikes] = useState({});

  console.log("render")

  useEffect(() => {
    fetchProducts();
  },[])

  // 상품 데이터 가져오는 비동기 함수 정의
  const fetchProducts = async () => {
    const token = localStorage.getItem('token');

    try {
      const res = await axios.get(`https://api.mandarin.weniv.co.kr/product/?limit=999&skip=0`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setProducts(processProductsData(res.data.product));
      setLikes(res.data.product.reduce((acc, product) => {
        acc[product._id] = false;
        return acc;
      }, {}));

      // console.log("Fetched Products:", res.data.product); // API에서 가져온 상품 데이터 로깅
      // // 가져온 데이터로 상태 업데이트
      // const processedProducts = processProductsData(res.data.product);
      // console.log("Processed Products:", processedProducts); // 처리된 상품 데이터 로깅
      // setProducts(processedProducts); // 상태 업데이트
    } catch(error) {
      console.error("Error", error);
    }
  }

  // 상품 데이터 처리하는 함수
  const processProductsData = (productsData) => {
    return productsData.map(product => {
      const { category, formattedProductName, pureProductName, description } = determineCategory(product);
      return {
        ...product,
        id: product._id,
        category,
        formattedProductName,
        pureProductName,
        description,
      };
    })
  }

  // 상품 카테고리 결정하는 함수
  const determineCategory = (product) => {
    let category;
    let formattedProductName = product.itemName;
    let description = "";

    // 상품 이름에 따라 카테고리 결정
    if(product.itemName.includes('bg_dogs')) {
      category = '강아지';
      formattedProductName = formattedProductName.replace('bg_dogs ', '');
    } else if (product.itemName.includes('bg_cats')) {
      category = '고양이';
      formattedProductName = formattedProductName.replace('bg_cats ', '');
    } else if (product.itemName.includes('bg_etc.')) {
      category = '기타';
      formattedProductName = formattedProductName.replace('bg_etc. ', '');
    }

    // 상품명에서 productName 값만 추출
    let pureProductName = "";
    if (formattedProductName.includes('productName:')) {
      pureProductName = formattedProductName.split('productName:')[1].split('category:')[0].trim();

      if (formattedProductName.includes('description:')) {
        const descParts = formattedProductName.split('description:');
        if (descParts.length > 1) {
          description = descParts[1].trim(); // description: 이후의 문자열을 description으로 설정
        }
      }
    } else {
      pureProductName = formattedProductName;
    }

    return { category, formattedProductName, pureProductName, description };
  }
  
  const handleLike = (productId) => {
    setLikes((prevLikes) => {
      const newLikes = {
        ...prevLikes,
        [productId]: !prevLikes[productId],
      };
      console.log(newLikes); // 상태 변화를 로깅
      return newLikes;
    });
  }

  // 현재 선택된 카테고리에 해당하는 상품만 필터링
  const filteredProducts = products.filter(product => product.category === activeBtn);

  return (
    <>
      <GlobalStyle/>
      <Container>
        <HeaderLayouts title="반결장터" logo />

        <SubContainer>
          <NavigationMenu navItems={navItems} activeBtn={activeBtn} setActiveBtn={setActiveBtn}/>
          <ProductsDisplay products={filteredProducts} handleLike={handleLike} likes={likes} />
          <StyledLink to="/market/add-product">
            <BtnAdd>
              <img src={addBtn} alt="추가버튼" />
            </BtnAdd>
          </StyledLink>
        </SubContainer>
        <TabMenu/>
      </Container>
    </>
  )
}

const NavigationMenu = ({navItems, activeBtn, setActiveBtn}) => (
  <nav>
    <NavMenu>
      {navItems.map((navItem) => (
        <li key={navItem}>
          <BtnNav className={activeBtn === navItem ? 'active' : ''} onClick={()=>setActiveBtn(navItem)}>
            {navItem}
          </BtnNav>
        </li>
      ))}
    </NavMenu>
  </nav>
)

const ProductsDisplay = ({products, handleLike, likes}) => (
  <ItemContainer>
    {products.length > 0 ? (
    products.map((product) => {
      console.log("Product State:", { pureProductName: product.pureProductName, description: product.description });
      const isLiked = likes[product._id];
      const likeIcon = isLiked ? redHeartIcon : heartIcon;
      return(
        <StyledLink 
        to={`/market/detail/${product._id}`}
        state={{ pureProductName: product.pureProductName, description: product.description }}
        key={product._id}
      >
      <Item>
        <img src={product.itemImage} alt="상품" />
        <p className='item-title'>{product.pureProductName}</p>
        <PriceLikesWrap>
          <strong className='item-price'>{Number(product.price).toLocaleString()} 원</strong>
          <LikeBtn onClick={(e) => {e.preventDefault(); handleLike(product._id); }}>
            <img src={likeIcon} alt="좋아요 버튼" />
          </LikeBtn>
        </PriceLikesWrap>
      </Item>
    </StyledLink>
    )
    })
    ) : (
      <p>Loading...</p>
    )}
  </ItemContainer>
)