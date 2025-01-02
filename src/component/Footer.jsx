import React from "react";
// 리액트 라이브러리를 임포트하여 컴포넌트를 정의
import "../cssall/Footer.css"; // CSS 파일 연결

// Footer 함수형 컴포넌트 = Footer는 리액트의 함수형 컴포넌트임
// 이 컴포넌트는 웹페이지의 하단부(푸터)를 렌더링
function Footer() {
  return (
    <footer className="footer">
      {/* <footer>: HTML5의 시맨틱 태그로, 웹페이지의 하단 영역 /<footer> 태그 사용</footer> */}
      {/* className="footer": Footer.css에 정의된 .footer 클래스를 적용해 스타일을 지정 */}
      
      <div className="footer-content">
      {/* div.footer-content: 푸터 내부 콘텐츠를 감싸는 컨테이너 *레이아웃과 스타일을 관리하기 위한 클래스* */}
        <p>&copy; 2024 Your Company Name. All Rights Reserved.</p>
        <p>&copy; 팀장 : 김도형 &copy; 조원 : 나현석, 이건민</p>
        <ul className="footer-links">
        {/* <ul>: 링크들을 나열하기 위한 목록 태그 */}
          <li>
            <a href="/privacy-policy">Privacy Policy</a>
          </li>
          <li>
            <a href="/terms-of-service">Terms of Service</a>
          </li>
          <li>
            <a href="/contact-us">Contact Us</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
