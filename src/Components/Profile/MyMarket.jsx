import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, GlobalStyle } from "../../Styles/reset.style";
import styled from "styled-components";

const extractProductName = (itemName) => {
  const match = itemName.match(/productName:\s*(.*?)\s*\n/);
  return match ? match[1] : "";
};

const MyMarket = ({ accountname, token }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const goToProductDetail = (productId) => {
    navigate(`/market/detail/${productId}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      try {
        const endpoint = `https://api.mandarin.weniv.co.kr/product/${accountname}`;
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        });
        console.log("Response data:", response.data);
        setProducts(response.data.product);
      } catch (error) {
        console.error("Fetching products failed:", error);
        setError(error);
        setProducts([]); // Set to an empty array in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [accountname, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
<ContentContainer>
    <GlobalStyle />
    {loading && <div>Loading...</div>}
    {error && <div>Error: {error.message}</div>}
    <SaleItem>판매 중인 상품</SaleItem>
    <ProductsContainer>
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard
            key={product.id}
            onClick={() => goToProductDetail(product.id)}
          >
            <ProductImage src={product.itemImage} alt={product.itemName} />
            <MyItem>{extractProductName(product.itemName)}</MyItem>
            <Price>{Number(product.price).toLocaleString()} 원</Price>
          </ProductCard>
        ))
      ) : (
        <ProductEmpty>등록된 상품이 없습니다😥</ProductEmpty>
      )}
    </ProductsContainer>
  </ContentContainer>
  );
};

export default MyMarket;

// 스타일 컴포넌트

const ContentContainer = styled(Container)`
  min-height: auto;
`;

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  gap: 20px;
  padding: 16px 0 0 30px;
`;

const ProductCard = styled.div`
  min-width: 200px;
  text-align: center;
  margin-bottom: 0;
  cursor: pointer;
`;

const ProductImage = styled.img`
  width: 200px;
  height: 140px;
  object-fit: cover;
  display: block;
  border-radius: 10px;
  margin: 0 auto;
`;

// 등록한 상품이 없을 때 스타일 컴포넌트
const ProductEmpty = styled.div`
  /* 상품이 없을 때 텍스트를 위한 스타일 */
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 가로 중앙 정렬 */
  width: 100%; /* 컨테이너의 전체 너비를 사용 */
  min-height: 140px; /* 컨테이너의 높이를 설정 */
  background-color: #f2f2f2; /* 배경색 설정 */
  font-size: 16px;
  font-weight: 700;
  color: #666; /* 텍스트 색상은 기본적으로 어두운 회색으로 설정 */
  border-radius: 10px; /* 배경의 모서리를 둥글게 */
  margin: 0 auto; /* 상하 자동 마진으로 중앙 정렬 */
  margin-right: 30px;
`;

const MyItem = styled.div`
  display: flex;
  width: 200px;
  margin: 10px 0 4px 0;
  font-size: 16px;
  font-weight: 700;
`
const Price = styled.div`
  display: flex;
  width: 140px;
  margin-bottom: 10px;
  color: #004E98;
  font-size: 16px;
  font-weight: 700;
`
const SaleItem = styled.div`
  margin: 14px 0 0 20px;
  font-size: 16px;
  font-weight: bold;
`