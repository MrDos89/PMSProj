import React from "react";
// import phoneData from "../data/phoneData.json";
import "../cssall/PhoneList.css";

function PhoneList({ phones }) {
  return (
    <div className="phone-list">
      {phones.map((phone) => (
        <div className="phone-item" key={phone.rank}>
          <div className="phone-rank">{phone.rank}</div>
          <img src={phone.img} alt={phone.name} className="phone-image" />
          <div className="phone-info">
            <h3>{phone.name}</h3>
            <p className="capacity">{phone.capacity}</p>
            <p className="price">{phone.price}</p>
            <p className="provider">{phone.provider}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PhoneList;

// const PhoneList = () => {
//   const [phones, setPhones] = useState(phoneData["모두"]);
//   const [selectedAge, setSelectedAge] = useState("모두");

//   const filterPhones = (ageGroup) => {
//     setPhones(phoneData[ageGroup]);
//     setSelectedAge(ageGroup);
//   };

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
