// import react from "react";
import "../cssall/Header.css";
import Logo from "../../image/GDH logo.png";
import home from "../../image/homebutton.png";

function Header() {
  return (
    <header className="header">
      <a href="#" className="home">
        <img src={home} alt="homebutton" />
      </a>

      <div className="logo">
        <img src={Logo} alt="GDH 통신사 로고" />
      </div>
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
