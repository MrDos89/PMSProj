import { useState } from "react";
import PhoneList from "./PhoneList";

import PropTypes from "prop-types";

function MainBody({ phones, ageHandle }) {
  return (
    <>
      <div className="dropdown-container">
        <span className="dropdown-label">나이별 인기 top3</span>
        <div className="dropdown">
          {/* 드롭다운 메인 버튼 */}
          <button
            onClick={toggleDropdown}
            className={`dropdown-toggle ${isDropdownOpen ? "active" : ""}`}
          >
            {selectedFilter}
          </button>

          {/* 드롭다운 메뉴 */}
          <div className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
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
