import React from "react";
import "../../cssall/MemberList.css";

// @note - 회원 등급별 이미지
const gradeImages = {
  3: "../../image/grade/3.jpg",
  2: "../../image/grade/2.jpg",
  1: "../../image/grade/1.jpg",
  0: "../../image/thumbnail/God_1.gif",
};

// @note - 회원 목록 컴포넌트
class MemberList extends React.Component {
  constructor(props) {
    super(props);
    // @note - 필터 상태 초기화 (기본값: 'all' - 모든 회원)
    this.state = {
      filter: "all",
    };
  }

  // @note - 필터 설정 함수
  setFilter = (filter) => {
    this.setState({ filter });
  };

  render() {
    // @note - 부모 컴포넌트로부터 props 전달 받기
    const { members, onClose, onSelect } = this.props;
    // @note - 현재 필터 값에 따라 회원 목록 필터링
    const filteredMembers =
      this.state.filter === "all"
        ? members // @note - 필터가 'all'이면 모든 회원 표시
        : members.filter(
            // @note - 특정 등급 필터링
            (member) => member.grade === parseInt(this.state.filter, 10)
          );
    return (
      <div className="member-list">
        <h2>회원 목록</h2>

        {/* @note - 필터 버튼 */}
        <div className="filter-buttons">
          <button
            onClick={() => this.setFilter("all")}
            className={this.state.filter === "all" ? "active" : ""}
          >
            All
          </button>
          {/* @note - 등급별 필터 버튼 */}
          <button
            onClick={() => this.setFilter("3")}
            className={this.state.filter === "3" ? "active" : ""}
          >
            VIP
          </button>
          <button
            onClick={() => this.setFilter("2")}
            className={this.state.filter === "2" ? "active" : ""}
          >
            Gold
          </button>
          <button
            onClick={() => this.setFilter("1")}
            className={this.state.filter === "1" ? "active" : ""}
          >
            Silver
          </button>
        </div>

        {/* @note - 필터링된 회원 목록을 표시 */}
        <ul>
          {filteredMembers.map((member) => (
            <li
              key={member.id} //@note - 각 li요소에 고유한 key prop을 제공
              className="member-item"
              onClick={() => onSelect(member)} //@note -회원 클릭시 onSelect prop 함수를 호출하여 선택된 회원정보를 부모 컴포넌트로 전달
            >
              <div className="member-info">
                <img
                  src={
                    gradeImages[member.grade] || "/images/default_profile.png"
                  } // @note - 등급에 맞는 이미지를 표시, 이미지가 없으면 기본이미지 표시
                  alt={`${member.name} 등급 이미지`}
                  style={{
                    width: "35px",
                    height: "35px",
                    marginRight: "5px",
                    verticalAlign: "middle",
                  }}
                />
                {/* @note - 회원 이름 */}
                <span className="member-name">{member.name}</span>
                {/* @note - 회원 전화번호 */}
                <span className="member-phone">{member.phone}</span>
              </div>
            </li>
          ))}
        </ul>
        <button className="close-button bottom-right" onClick={onClose}>
          닫기
        </button>
      </div>
    );
  }
}

export default MemberList;
