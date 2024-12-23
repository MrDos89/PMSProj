// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import Header from "./compents/Header";
import MainBanner from "./compents/MainBanner";
import MiniGames from "./compents/MiniGames";
import PhoneList from "./compents/PhoneList";
import React, { useState, useEffect } from "react";

import "./App.css";

const phoneData = {
  모두: [
    {
      rank: 1,
      name: "갤럭시 와이드7",
      capacity: "128G",
      price: "85,559원/월",
      provider: "SKT 5GX",
      img: "../image/A5KU_001_13.png",
    },
    {
      rank: 2,
      name: "iPhone 16 Pro",
      capacity: "128G | 1T | 256G | 512G",
      price: "137,184원/월",
      provider: "SKT 5GX",
      img: "../image/A5XC_001_13.png",
    },
    {
      rank: 3,
      name: "갤럭시 S24 5G",
      capacity: "512G | 256G",
      price: "120,138원/월",
      provider: "SKT 5GX",
      img: "../image/A5CK_001_13.png",
    },
  ],
  "10대": [
    {
      rank: 1,
      name: "iPhone SE",
      capacity: "64G | 128G",
      price: "55,000원/월",
      provider: "SKT 5GX",
      img: "../image/teen_1.png",
    },
    {
      rank: 2,
      name: "Galaxy A13",
      capacity: "128G",
      price: "45,000원/월",
      provider: "SKT 5GX",
      img: "../image/teen_2.png",
    },
    {
      rank: 3,
      name: "Galaxy M22",
      capacity: "128G",
      price: "40,000원/월",
      provider: "SKT 5GX",
      img: "../image/teen_3.png",
    },
  ],
  "20대": [
    {
      rank: 1,
      name: "iPhone 14",
      capacity: "128G | 256G",
      price: "95,000원/월",
      provider: "SKT 5GX",
      img: "../image/20s_1.png",
    },
    {
      rank: 2,
      name: "Galaxy S22",
      capacity: "256G",
      price: "85,000원/월",
      provider: "SKT 5GX",
      img: "../image/20s_2.png",
    },
    {
      rank: 3,
      name: "Galaxy Z Flip3",
      capacity: "128G",
      price: "75,000원/월",
      provider: "SKT 5GX",
      img: "../image/20s_3.png",
    },
  ],
  "30대": [
    {
      rank: 1,
      name: "iPhone 13 Pro",
      capacity: "128G | 256G",
      price: "105,000원/월",
      provider: "SKT 5GX",
      img: "../image/30s_1.png",
    },
    {
      rank: 2,
      name: "Galaxy Note 20",
      capacity: "256G",
      price: "95,000원/월",
      provider: "SKT 5GX",
      img: "../image/30s_2.png",
    },
    {
      rank: 3,
      name: "Galaxy S21",
      capacity: "256G",
      price: "85,000원/월",
      provider: "SKT 5GX",
      img: "../image/30s_3.png",
    },
  ],
  "40대": [
    {
      rank: 1,
      name: "iPhone 12",
      capacity: "128G",
      price: "75,000원/월",
      provider: "SKT 5GX",
      img: "../image/40s_1.png",
    },
    {
      rank: 2,
      name: "Galaxy A52",
      capacity: "128G",
      price: "65,000원/월",
      provider: "SKT 5GX",
      img: "../image/40s_2.png",
    },
    {
      rank: 3,
      name: "Galaxy M32",
      capacity: "128G",
      price: "55,000원/월",
      provider: "SKT 5GX",
      img: "../image/40s_3.png",
    },
  ],
  "50대": [
    {
      rank: 1,
      name: "Galaxy S20 FE",
      capacity: "128G",
      price: "65,000원/월",
      provider: "SKT 5GX",
      img: "../image/50s_1.png",
    },
    {
      rank: 2,
      name: "Galaxy Note 10",
      capacity: "128G",
      price: "55,000원/월",
      provider: "SKT 5GX",
      img: "../image/50s_2.png",
    },
    {
      rank: 3,
      name: "Galaxy A71",
      capacity: "128G",
      price: "50,000원/월",
      provider: "SKT 5GX",
      img: "../image/50s_3.png",
    },
  ],
};

function App() {
  // const [count, setCount] = useState(0);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("모두");
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    setPhones(phoneData[selectedAgeGroup] || phoneData["모두"]);
  }, [selectedAgeGroup]);

  const handleFilter = (ageGroup) => {
    setSelectedAgeGroup(ageGroup);
  };

  return (
    <div className="App">
      <Header />
      <MainBanner />
      {/* 슬라이드 네비게이션 버튼 */}
      {/* <div class="slide-dots">
        <button class="dot active" data-index="0"></button>
        <button class="dot" data-index="1"></button>
        <button class="dot" data-index="2"></button>
      </div> */}

      <MiniGames />

      <div className="dropdown">
        <button onClick={() => handleFilter("모두")}>모두</button>
        <button onClick={() => handleFilter("10대")}>10대</button>
        <button onClick={() => handleFilter("20대")}>20대</button>
        <button onClick={() => handleFilter("30대")}>30대</button>
        <button onClick={() => handleFilter("40대")}>40대</button>
        <button onClick={() => handleFilter("50대")}>50대</button>
      </div>
      <PhoneList phones={phones} />
    </div>
  );
}

export default App;
