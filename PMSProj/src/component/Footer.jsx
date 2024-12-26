import React from "react";
import "../cssall/Footer.css"; // CSS 파일 연결

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 Your Company Name. All Rights Reserved.</p>
        <p>&copy; 팀장 : 김도형 &copy; 조원 : 나현석, 이건민</p>
        <ul className="footer-links">
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
