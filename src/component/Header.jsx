// import react from "react";
import "../cssall/Header.css";
import Logo from "../../image/logo.png";
import home from "../../image/homebutton.png";

document.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 0) {
    header.style.backgroundColor = "#ffffff96"; // 스크롤 시 배경색
  } else {
    header.style.backgroundColor = "transparent"; // 초기 상태 투명
  }
});

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
        <button>회사소개</button>
        <button>상품서비스</button>
        <button>고객센터</button>
        <button>마이페이지</button>
      </nav>
      <div className="search-bar">
        <input type="text" placeholder="검색어를 입력하세요" />
        <button>검색</button>
      </div>
    </header>
  );
}

export default Header;
