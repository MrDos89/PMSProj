import { useState } from "react";             
// useState: 리액트 훅으로, 컴포넌트의 상태를 관리
import PhoneList from "./PhoneList";
import "../cssall/PhoneList.css"; 
import PropTypes from "prop-types";
// PropTypes: 컴포넌트에 전달되는 props의 데이터 타입을 검사

// MainBody 함수형 컴포넌트 정의
// phones: 휴대폰 목록 데이터 (배열)
// ageHandle: 선택된 나이대에 따라 필터링하는 함수
function MainBody({ phones, ageHandle }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false); // 드롭다운 상태 관리
  // isDropdownOpen: 드롭다운 메뉴가 열려있는지 (true) 닫혀있는지 (false) 상태를 나타냄
  // setDropdownOpen: 상태를 변경하는 함수
  // 초기값은 false

  const [selectedFilter, setSelectedFilter] = useState("모두"); // 선택된 필터값 관리
  // selectedFilter: 현재 선택된 필터 값을 저장
  // 초기값은 "모두"
  // setSelectedFilter: 필터 값을 변경하는 함수

  // 드롭다운 토글 함수 (toggleDropdown)
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen); // 드롭다운 열기/닫기 상태 전환
  };
  // setDropdownOpen을 사용하여 isDropdownOpen 값을 반전
  // 드롭다운이 열려있으면 닫고, 닫혀있으면 열어라


  // 필터 선택 함수 (handleFilterClick)
  const handleFilterClick = (ageGroup) => {
    setSelectedFilter(ageGroup); // 선택된 필터값 업데이트
    ageHandle(ageGroup); // 필터 적용
    setDropdownOpen(false); // 드롭다운 닫기
  };
  // ageGroup: 선택된 나이대 값
  // setSelectedFilter(ageGroup): 선택된 필터 값을 상태에 업데이트
  // ageHandle(ageGroup): 부모 컴포넌트에 선택된 나이대를 전
  // setDropdownOpen(false): 드롭다운을 닫아

  // JSX로 UI를 렌더링
  // <>...</>: React Fragment로, 불필요한 DOM 노드를 생성하지 않겠다
  return (
    <>
      <div className="dropdown-container">
      {/* div.dropdown-container: 드롭다운 메뉴를 감싸는 컨테이너 */}
        <span className="dropdown-label">나이별 인기 top3</span>
        <div className="dropdown">
        {/* div.dropdown: 드롭다운 메뉴와 버튼을 감싸는 컨테이너. *스타일과 드롭다운 동작을 제어* */}
          {/* 드롭다운 메인 버튼 */}
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            {selectedFilter}
          </button>
          {/* button.dropdown-toggle: 드롭다운 메뉴를 여닫는 버튼 */}
          {/* onClick={toggleDropdown}: 클릭 시 toggleDropdown 함수가 호출 */}
          {/* {selectedFilter}: 현재 선택된 필터 값이 버튼에 표시 */}

          <div className="dropdown-menu">
          {/* div.dropdown-menu: 드롭다운 목록이 렌더링되는 영역 *열리거나 닫힐 때 보이거나 숨겨짐* */}

            {["모두", "10대", "20대", "30대", "40대", "50대"].map(
              // 배열 ["모두", "10대", "20대", "30대", "40대", "50대"]를 map 함수로 순회
              (ageGroup) => (
                <button
                // 각 항목은 <button>으로 생성
                  key={ageGroup}
                  // key={ageGroup}: 각 버튼에 고유한 키를 부여
                  onClick={() => handleFilterClick(ageGroup)}
                  // onClick={() => handleFilterClick(ageGroup)}: 버튼 클릭 시 handleFilterClick 함수가 호출
                >
                  {ageGroup}
                  {/* {ageGroup}: 버튼에 나이대 텍스트를 표시 */}
                </button>
              )
            )}
          </div>
        </div>
      </div>
      <PhoneList phones={phones} />
      {/* PhoneList 컴포넌트 렌더링 */}
      {/* phones 배열을 PhoneList 컴포넌트에 전달하여 리스트를 렌더링 */}
    </>
  );
}

MainBody.propTypes = {
  phones: PropTypes.array,
  ageHandle: PropTypes.func,
};
// PropTypes로 props 타입 검증
// phones: 배열 형태여야 함
// ageHandle: 함수 형태여야 함ㅁ

export default MainBody;
