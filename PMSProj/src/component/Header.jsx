// import React from "react";
// import "../cssall/Header.css";

// const Header = () => {
//   return (
//     <header className="header">
//       <div className="logo">GDH 통신사</div>
//       <nav className="menu">
//         <button>홈</button>
//         <button>요금제</button>
//         <button>핸드폰</button>
//       </nav>
//       <div className="search-bar">
//         <input type="text" placeholder="검색어를 입력하세요" />
//         <button>검색</button>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React from "react";
import "../cssall/Header.css";

function Header() {
  return (
    <header className="header">
      <a href="#" class="home">
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
