import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../cssall/ExchangeShop.css";

function ExchangeShop({ member, products, onUpdatePoints }) {
  const [userPoints, setUserPoints] = useState(member.points);

  // 구매 함수
  const handlePurchase = (productPoints) => {
    if (userPoints >= productPoints) {
      const updatedPoints = userPoints - productPoints;
      setUserPoints(updatedPoints);
      onUpdatePoints(updatedPoints);
    } else {
      alert("포인트가 부족합니다!");
    }
  };

  return (
    <div className="exchange-shop">
      {/* 회원 정보 섹션 */}
      <div className="member-info">
    <img src={member.profileImage} alt={`${member.name} 프로필`} />
    <div className="text-info">
        <p><strong>이름:</strong> {member.name}</p>
        <p><strong>전화번호:</strong> {member.phone}</p>
        <p><strong>등급:</strong> {member.rank}</p>
        <p className="point"><strong>포인트:</strong> {userPoints} point</p>
    </div>
</div>
      
      {/*
      <img
          src={member.profileImage}
          alt={`${member.name} 프로필`}
          className="profile-image"
        />
          <p><strong>이름:</strong> {member.name}</p>
          <p><strong>전화번호:</strong> {member.phone}</p>
          <p><strong>등급:</strong> {member.rank}</p>
          <p><strong>포인트:</strong> {userPoints} point</p>
        </div>
        */}

    

      {/* 상품 목록 섹션 */}
      <h3 className="product-title">상품 목록</h3>
      <div className="product-grid">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <p><strong>{product.company}</strong></p>
            <p>{product.name}</p>
            <p className="product-points"><strong>-{product.points} point</strong></p>
            <button onClick={() => handlePurchase(product.points)}>
              구매하기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

ExchangeShop.propTypes = {
  member: PropTypes.shape({
    profileImage: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    rank: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
  }).isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      company: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      points: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  onUpdatePoints: PropTypes.func.isRequired,
};

export default ExchangeShop;
