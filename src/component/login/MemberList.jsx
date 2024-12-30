import React from "react";
import "../../cssall/MemberList.css";

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
        : members.filter((member) => member.role === this.state.filter);

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
            onClick={() => this.setFilter("vip")}
            className={this.state.filter === "vip" ? "active" : ""}
          >
            VIP
          </button>
          <button
            onClick={() => this.setFilter("gold")}
            className={this.state.filter === "gold" ? "active" : ""}
          >
            Gold
          </button>
          <button
            onClick={() => this.setFilter("silver")}
            className={this.state.filter === "silver" ? "active" : ""}
          >
            Silver
          </button>
        </div>

        <ul>
          {filteredMembers.map((member) => (
            <li key={member.id} onClick={() => onSelect(member)}>
              {" "}
              {/* 이 부분 확인 */}
              {member.name} ({member.phone})
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
