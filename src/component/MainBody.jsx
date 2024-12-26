import { useState } from "react";
import PhoneList from "./PhoneList";
import "../cssall/PhoneList.css"; // 드롭다운 관련 CSS 추가

import PropTypes from "prop-types";

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
      <div className="dropdown-container">
        <span className="dropdown-label">나이별 인기 top3</span>
        <div className="dropdown">
          {/* 드롭다운 메인 버튼 */}
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            {selectedFilter}
          </button>

          <div className="dropdown-menu">
            {["모두", "10대", "20대", "30대", "40대", "50대"].map(
              (ageGroup) => (
                <button
                  key={ageGroup}
                  onClick={() => handleFilterClick(ageGroup)}
                >
                  {ageGroup}
                </button>
              )
            )}
          </div>
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