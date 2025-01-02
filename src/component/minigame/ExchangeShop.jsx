import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import "../../cssall/ExchangeShop.css";

function ExchangeShop({ products, onUpdatePoints }) {
  const [member, setMember] = useState(null); // 회원 정보
  const [userPoints, setUserPoints] = useState(0); // 사용자 포인트
  const [loading, setLoading] = useState(true); // 로딩 상태

  // ✅ 초기 로드 시 회원 정보 복구
  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const loggedInUserPhone = localStorage.getItem("loggedInUserPhone");
        if (!loggedInUserPhone) {
          console.error("⚠️ 로그인된 회원의 전화번호를 찾을 수 없습니다.");
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:3000/userList");
        if (!response.ok) {
          throw new Error("⚠️ 회원 데이터를 가져오는 데 실패했습니다.");
        }

        const userList = await response.json();
        const foundMember = userList.find(
          (user) => user.phone === loggedInUserPhone
        );

        if (foundMember) {
          setMember(foundMember); // 회원 정보 저장
          setUserPoints(foundMember.points); // 포인트 설정
        } else {
          console.error("⚠️ 로그인된 회원 정보를 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("⚠️ 회원 정보를 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchLoggedInUser();
  }, []);

  // ✅ 상품 구매 처리
  const handlePurchase = useCallback(
    async (product) => {
      if (product.company === "벤츠") {
        alert("네가 과연 살 수 있을까?");
        return;
      }

      if (userPoints >= product.points) {
        const updatedPoints = userPoints - product.points;

        const newHistoryItem = {
          user_name: member.name,
          item_id: product.id,
          point: product.points,
          remain_point: updatedPoints,
          updateDate: new Date().toLocaleString(),
        };

        alert("🎉 구매 완료되었습니다.");

        // 포인트 및 히스토리 업데이트 최소화
        try {
          const response = await fetch(
            `http://localhost:3000/userList/${member.id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                points: updatedPoints,
                history: [...member.history, newHistoryItem],
              }),
            }
          );

          if (!response.ok) {
            throw new Error("⚠️ 포인트 및 히스토리 업데이트 실패");
          }

          console.log("✅ 히스토리 저장 성공");

          // 로컬 상태 업데이트
          setMember((prevMember) => ({
            ...prevMember,
            points: updatedPoints,
            history: [...prevMember.history, newHistoryItem],
          }));
          setUserPoints(updatedPoints);
          onUpdatePoints(updatedPoints); // 부모 컴포넌트로 포인트 업데이트 전달
        } catch (error) {
          console.error("⚠️ 서버 오류:", error);
        }
      } else {
        alert("⚠️ 포인트가 부족합니다!");
      }
    },
    [userPoints, member, onUpdatePoints]
  );

  // ✅ 로딩 중이거나 회원 정보가 없을 경우
  if (loading) {
    return <p>⏳ 로딩 중...</p>;
  }

  if (!member) {
    return <p>⚠️ 로그인된 회원 정보를 불러오지 못했습니다.</p>;
  }

  return (
    <div className="exchange-shop">
      <div className="member-info">
        <img
          src={member.photo}
          alt={`${member.name} 프로필`}
          className="profile-image"
        />
        <div className="text-info">
          <p>
            <strong>이름:</strong> {member.name}
          </p>
          <p>
            <strong>전화번호:</strong> {member.phone}
          </p>
          <p>
            <strong>등급:</strong>{" "}
            {member.isAdmin
              ? "신"
              : member.grade === 3
              ? "VIP 회원"
              : member.grade === 2
              ? "GOLD 회원"
              : member.grade === 1
              ? "SILVER 회원"
              : "일반 회원"}
          </p>
          <p className="point">
            <strong>포인트:</strong> {userPoints} point
          </p>
        </div>
      </div>

      <h3 className="product-title">상품 목록</h3>
      <div className="product-grid">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <p>
              <strong>{product.company}</strong>
            </p>
            <p>{product.name}</p>
            <p className="product-points">
              <strong>{product.points} point</strong>
            </p>
            <button onClick={() => handlePurchase(product)}>구매하기</button>
          </div>
        ))}
      </div>
    </div>
  );
}

ExchangeShop.propTypes = {
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

// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import "../../cssall/ExchangeShop.css";

// //function ExchangeShop({ member, products, onUpdatePoints }) {
// //  const [userPoints, setUserPoints] = useState(member.points);

// function ExchangeShop({ products, onUpdatePoints }) {
//   const [member, setMember] = useState(null);
//   const [userPoints, setUserPoints] = useState(0);

// // 데이터 가져오기 (1231)
//  // 회원 데이터 가져오기
// //  useEffect(() => {
// //   const fetchMemberData = async () => {
// //     try {
// //       const response = await fetch("http://localhost:3000/userList/1"); // 특정 회원 ID로 요청
// //       const data = await response.json();
// //       setMember(data);
// //       setUserPoints(data.points); // 포인트 초기화
// //     } catch (error) {
// //       console.error("회원 데이터를 가져오는 중 오류 발생:", error);
// //     }
// //   };

// //   fetchMemberData();
// // }, []);

// // 로그인한 회원 정보 가져오기
// useEffect(() => {
//   const fetchLoggedInUser = async () => {
//     try {
//       const loggedInUserPhone = localStorage.getItem("loggedInUserPhone"); // 로그인 시 저장된 전화번호
//       if (!loggedInUserPhone) {
//         console.error("로그인된 회원의 전화번호를 찾을 수 없습니다.");
//         return;
//       }

//       // JSON 서버에서 회원 리스트 가져오기
//       const response = await fetch("http://localhost:3000/userList");
//       const { userList } = await response.json(); // userList 배열 가져오기

//       // 전화번호로 로그인한 사용자 찾기
//       const foundMember = userList.find((user) => user.phone === loggedInUserPhone);
//       if (foundMember) {
//         setMember(foundMember); // 회원 정보 저장
//         setUserPoints(foundMember.points); // 초기 포인트 설정
//       } else {
//         console.error("로그인한 회원 정보를 찾을 수 없습니다.");
//       }
//     } catch (error) {
//       console.error("회원 정보를 가져오는 중 오류 발생:", error);
//     }
//   };

//   fetchLoggedInUser();
// }, []);

// const handlePurchase = (product) => {
//   if (product.company === "벤츠") {
//     alert("네가 과연 살 수 있을까?");
//     return;
//   }

//   if (userPoints >= product.points) {
//     const updatedPoints = userPoints - product.points;
//     alert("구매 완료되었습니다.");
//     setUserPoints(updatedPoints);
//     onUpdatePoints(updatedPoints);
//   } else {
//     alert("포인트가 부족합니다!");
//   }
// };

// if (!member) {
//   return <p>로딩 중...</p>;
// }

//   // 구매 함수
//   // const handlePurchase = (product) => {
//   //   const isPartnerCompany = product.company === "벤츠"; // 특정 회사 체크

//   //   if (isPartnerCompany) {
//   //     // 벤츠 상품 처리
//   //     alert("네가 과연 살 수 있을까?");
//   //     return; // 벤츠 처리 이후 함수 종료
//   //   }

//   //   if (userPoints >= product.points) {
//   //     const updatedPoints = userPoints - product.points;
//   //     alert("구매 완료되었습니다."); // 일반 구매 시 알림
//   //     setUserPoints(updatedPoints); // 포인트 업데이트
//   //     onUpdatePoints(updatedPoints); // 부모 컴포넌트에 업데이트 알림
//   //   } else {
//   //     alert("포인트가 부족합니다!"); // 포인트 부족 시 알림
//   //   }
//   // };

//   return (
//     <div className="exchange-shop">
//       <div className="member-info">
//         <img src={member.photo} alt={`${member.name} 프로필`} />
//         <div className="text-info">
//           <p>
//             <strong>이름:</strong> {member.name}
//           </p>
//           <p>
//             <strong>전화번호:</strong> {member.phone}
//           </p>
//           <p>
//             <strong>등급:</strong> {member.grade}
//           </p>
//           <p className="point">
//             <strong>포인트:</strong> {userPoints} point
//           </p>
//         </div>
//       </div>

//       <h3 className="product-title">상품 목록</h3>
//       <div className="product-grid">
//         {products.map((product, index) => (
//           <div key={index} className="product-card">
//             <img
//               src={product.image}
//               alt={product.name}
//               className="product-image"
//             />
//             <p><strong>{product.company}</strong></p>
//             <p>{product.name}</p>
//             <p className="product-points"><strong>{product.points} point</strong></p>
//             <button onClick={() => handlePurchase(product)}>구매하기</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

//   // return (
//   //   <div className="exchange-shop">
//   //     {/* 회원 정보 섹션 */}
//   //     <div className="member-info">
//   //       <img src={member.profileImage} alt={`${member.name} 프로필`} />
//   //       <div className="text-info">
//   //         <p><strong>이름:</strong> {member.name}</p>
//   //         <p><strong>전화번호:</strong> {member.phone}</p>
//   //         <p><strong>등급:</strong> {member.rank}</p>
//   //         <p className="point"><strong>포인트:</strong> {userPoints} point</p>
//   //       </div>
//   //     </div>

//       {/*
//       <img
//           src={member.profileImage}
//           alt={`${member.name} 프로필`}
//           className="profile-image"
//         />
//           <p><strong>이름:</strong> {member.name}</p>
//           <p><strong>전화번호:</strong> {member.phone}</p>
//           <p><strong>등급:</strong> {member.rank}</p>
//           <p><strong>포인트:</strong> {userPoints} point</p>
//         </div>
//         */}

//       {/* 상품 목록 섹션 */}
// //       <h3 className="product-title">상품 목록</h3>
// //       <div className="product-grid">
// //         {products.map((product, index) => (
// //           <div key={index} className="product-card">
// //             <img
// //               src={product.image}
// //               alt={product.name}
// //               className="product-image"
// //             />
// //             <p><strong>{product.company}</strong></p>
// //             <p>{product.name}</p>
// //             <p className="product-points"><strong>{product.points} point</strong></p>
// //             <button onClick={() => handlePurchase(product)}>
// //               구매하기
// //             </button>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// ExchangeShop.propTypes = {
//   products: PropTypes.arrayOf(
//     PropTypes.shape({
//       company: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       points: PropTypes.number.isRequired,
//       image: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   onUpdatePoints: PropTypes.func.isRequired,
// };

// // ExchangeShop.propTypes = {
// //   member: PropTypes.shape({
// //     profileImage: PropTypes.string.isRequired,
// //     name: PropTypes.string.isRequired,
// //     phone: PropTypes.string.isRequired,
// //     rank: PropTypes.string.isRequired,
// //     points: PropTypes.number.isRequired,
// //   }).isRequired,
// //   products: PropTypes.arrayOf(
// //     PropTypes.shape({
// //       company: PropTypes.string.isRequired,
// //       name: PropTypes.string.isRequired,
// //       points: PropTypes.number.isRequired,
// //       image: PropTypes.string.isRequired,
// //     })
// //   ).isRequired,
// //   onUpdatePoints: PropTypes.func.isRequired,
// // };

// export default ExchangeShop;
