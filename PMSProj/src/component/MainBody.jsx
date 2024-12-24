import MiniGames from "./MiniGameButtons";
import PhoneList from "./PhoneList";

import PropTypes from "prop-types";

import { useState } from "react";
import "../cssall/PhoneList.css"; // 드롭다운 관련 CSS 추가

function MainBody({ phones, ageHandle }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false); // 드롭다운 상태 관리
  const [selectedFilter, setSelectedFilter] = useState("모두"); // 선택된 필터값 관리

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen); // 드롭다운 열기/닫기 상태 전환
  };

  const handleFilterClick = (ageGroup) => {
    setSelectedFilter(ageGroup); // 선택된 필터값 업데이트
    ageHandle(ageGroup); // 필터 적용
    setDropdownOpen(false); // 드롭다운 닫기
  };

  return (
    <>
      <MiniGames />
      <div className="dropdown">
        {/* 드롭다운 메인 버튼 */}
        <button onClick={toggleDropdown} className="dropdown-toggle">
          {selectedFilter}
        </button>

        {/* 드롭다운 메뉴 */}
        <div className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
          {["모두", "10대", "20대", "30대", "40대", "50대"].map((ageGroup) => (
            <button key={ageGroup} onClick={() => handleFilterClick(ageGroup)}>
              {ageGroup}
            </button>
          ))}
        </div>
      </div>
      <PhoneList phones={phones} />
    </>
  );
}

MainBody.propTypes = {
  phones: PropTypes.array,
  ageHandle: PropTypes.func,
};

export default MainBody;
