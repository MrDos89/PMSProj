// function ExchangeShop() {
//   return <div></div>;
// }

// export default ExchangeShop;

import React from "react";
import PropTypes from "prop-types";
import "../../cssall/ExchangeShop.css";

function ExchangeShop({ member, products, onUpdatePoints }) {
  return (
    <div>
      <h2>교환소</h2>
      <div>
        <img src={member.profileImage} alt={`${member.name} 프로필`} />
        <p>이름: {member.name}</p>
        <p>전화번호: {member.phone}</p>
        <p>등급: {member.rank}</p>
        <p>포인트: {member.points}</p>
      </div>
      <div>
        <h3>상품 목록</h3>
        {products.map((product, index) => (
          <div key={index}>
            <img src={product.image} alt={product.name} />
            <p>상품명: {product.name}</p>
            <p>포인트: {product.points}</p>
            <p>회사: {product.company}</p>
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
