import React from "react";
import "../../cssall/MemberList.css";

const gradeImages = {
  3: "../../image/grade/3.jpg",
  2: "../../image/grade/2.jpg",
  1: "../../image/grade/1.jpg",
  0: "../../image/thumbnail/God_1.gif",
};

class MemberList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "all",
    };
  }

  setFilter = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { members, onClose, onSelect } = this.props;
    const filteredMembers =
      this.state.filter === "all"
        ? members
        : members.filter(
            (member) => member.grade === parseInt(this.state.filter, 10)
          );
    return (
      <div className="member-list">
        <h2>회원 목록</h2>

        <div className="filter-buttons">
          <button
            onClick={() => this.setFilter("all")}
            className={this.state.filter === "all" ? "active" : ""}
          >
            All
          </button>
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

        <ul>
          {filteredMembers.map((member) => (
            <li
              key={member.id}
              className="member-item"
              onClick={() => onSelect(member)}
            >
              <div className="member-info">
                <img
                  src={
                    gradeImages[member.grade] || "/images/default_profile.png"
                  }
                  alt={`${member.name} 등급 이미지`}
                  style={{
                    width: "35px",
                    height: "35px",
                    marginRight: "5px",
                    verticalAlign: "middle",
                  }}
                />
                <span className="member-name">{member.name}</span>
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
