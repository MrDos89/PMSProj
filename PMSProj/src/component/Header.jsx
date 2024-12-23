// import react from "react";
import "../cssall/Header.css";

function Header() {
  return (
    <header className="header">
      <a href="#" className="home">
        홈
      </a>

      <div className="logo">GDH 통신사</div>
      <nav className="menu">
        <button>서비스</button>
        <button>고객센터</button>
        <button>메뉴3</button>
      </nav>
      <div className="search-bar">
        <input type="text" placeholder="검색어를 입력하세요" />
        <button>검색</button>
      </div>
    </header>
  );
}

export default Header;
