// import react from "react";
import "../cssall/Header.css";
import Logo from "../../image/logo.png";
import home from "../../image/homebutton.png";

document.addEventListener("scroll", function () {
  // 사용자가 스크롤을 움직일 때 실행되는 이벤트 리스너 등록.

  const header = document.querySelector(".header");
  // DOM에서 `.header` 클래스를 가진 요소를 선택.
  if (window.scrollY > 0) {
    // 스크롤 위치가 0보다 클 경우.
    header.style.backgroundColor = "#ffffff96"; // 스크롤 시 배경색(약간 투명한 흰색)
  } else {
    header.style.backgroundColor = "transparent"; // 초기 상태 투명
  }
});

function Header() {
  // Header 컴포넌트를 정의.

  return (
    <header className="header">
      {/* 헤더 전체를 감싸는 컨테이너. */}

      <a href="#" className="home">
        {/* 홈 버튼을 클릭하면 페이지 상단으로 이동하도록 설정. */}
        <img src={home} alt="homebutton" />
        {/* 홈 버튼 이미지를 추가. `alt`는 이미지가 표시되지 않을 때 대체 텍스트로 사용. */}
      </a>

      <div className="logo">
        {/* 로고를 표시하는 컨테이너. */}
        <img src={Logo} alt="GDH 통신사 로고" />
        {/* 로고 이미지 추가. `alt`는 대체 텍스트. */}
      </div>
      <nav className="menu">
        {/* 네비게이션 메뉴를 감싸는 컨테이너. */}
        <button>회사소개</button>
        <button>상품서비스</button>
        <button>고객센터</button>
        <button>마이페이지</button>
      </nav>
      <div className="search-bar">
        {/* 검색 바를 감싸는 컨테이너. */}
        <input type="text" placeholder="검색어를 입력하세요" />
        {/* 검색어 입력창. `placeholder`는 입력 전 안내 텍스트. */}
        <button>검색</button>
      </div>
    </header>
  );
}

export default Header;
