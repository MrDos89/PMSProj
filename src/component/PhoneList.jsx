import React from "react";
// React 라이브러리를 임포트하여 React 컴포넌트 작성에 필요한 기능을 사용.

// import phoneData from "../data/phoneData.json";
import "../cssall/PhoneList.css";

function PhoneList({ phones }) {
   // PhoneList 컴포넌트 정의. 
  // props로 전달된 `phones` 배열을 사용하여 휴대폰 목록을 렌더링.

  return (
    <div className="phone-list">
       {/* 전체 휴대폰 리스트를 감싸는 최상위 컨테이너. */}

      {phones.map((phone) => (
        // phones 배열을 순회하면서 각 휴대폰 데이터를 렌더링. 
        // map 함수는 배열의 각 요소에 대해 반환된 JSX를 렌더링.

        <div className="phone-item" key={phone.rank}>
           {/* 각 휴대폰 항목을 감싸는 div. key 값으로 `phone.rank`를 사용하여 고유성 보장. */}

          <div className="phone-rank">{phone.rank}</div>
          {/* 휴대폰의 순위를 표시하는 div. phone 객체의 rank 속성을 사용. */}
           
          {/* 이미지를 a 태그로 감싸기 */}
          <a href={phone.link} target="_blank" rel="noopener noreferrer">
            {/* 링크 클릭 시 phone.link로 연결. 새 탭에서 열기 위해 target="_blank" 사용.
                rel="noopener noreferrer"는 보안 강화를 위해 추가. */}

          <img src={phone.img} alt={phone.name} className="phone-image" />
           {/* phone.img 경로에서 이미지를 불러와 표시. 
                alt 속성은 이미지가 로드되지 않을 때 대체 텍스트로 표시. */}
          </a>

          <div className="phone-info">
             {/* 휴대폰 정보(이름, 용량, 가격, 제공자)를 표시하는 컨테이너. */}
            <h3>{phone.name}</h3>
            {/* 휴대폰 이름을 제목 형식(h3)으로 표시. */}
            <p className="capacity">{phone.capacity}</p>
             {/* 휴대폰의 용량(예: 128GB, 256GB 등)을 표시. */}
            <p className="price">{phone.price}</p>
            {/* 휴대폰의 가격을 표시. phone.price 속성을 사용. */}
            <p className="provider">{phone.provider}</p>
             {/* 휴대폰 제공자(통신사 또는 제조사)를 표시. */}
          </div>
        </div>
      ))}
      
      
    </div>

    
  );
}

export default PhoneList;
// PhoneList 컴포넌트를 외부에서 사용할 수 있도록 내보냄.



// const PhoneList = () => {
//   const [phones, setPhones] = useState(phoneData["모두"]);
//   const [selectedAge, setSelectedAge] = useState("모두");

//---------------------------------------------------- filter
//   const filterPhones = (ageGroup) => {
//     setPhones(phoneData[ageGroup]);
//     setSelectedAge(ageGroup);
//   };
// ---------------------------------------------

//   useEffect(() => {
//     setPhones(phoneData["모두"]);
//   }, []);

//   return (
//     <div className="top-phones-section">
//       <h2>나이대별 추천 핸드폰</h2>
//       <div className="dropdown">
//         <button onClick={() => filterPhones("모두")}>모두</button>
//         <button onClick={() => filterPhones("10대")}>10대</button>
//         <button onClick={() => filterPhones("20대")}>20대</button>
//         <button onClick={() => filterPhones("30대")}>30대</button>
//         {/* 추가 버튼은 필요에 따라 추가 */}
//       </div>
//       <div id="phone-list">
//         {phones.map((phone) => (
//           <div className="phone-item" key={phone.rank}>
//             <div className="phone-rank">{phone.rank}</div>
//             <img src={phone.img} alt={phone.name} />
//             <div className="phone-info">
//               <h3>{phone.name}</h3>
//               <p className="capacity">{phone.capacity}</p>
//               <p className="price">{phone.price}</p>
//               <p className="provider">{phone.provider}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div id="selected-age">선택된 나이대: {selectedAge}</div>
//     </div>
//   );
// };

// export default PhoneList;
