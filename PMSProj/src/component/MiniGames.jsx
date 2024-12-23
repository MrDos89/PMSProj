import React from "react";
import "../cssall/MiniGames.css";

const games = [
  {
    id: 1,
    name: "포인트 출석체크",
    img: "./image/pngtree-lucky-wheel-png-image_6518840.png",
  },
  {
    id: 2,
    name: "포인트 룰렛",
    img: "./image/pngtree-lucky-wheel-png-image_6518840.png",
  },
  {
    id: 3,
    name: "포인트 사다리타기",
    img: "./image/images.png",
  },
  {
    id: 4,
    name: "포인트 교환",
    img: "./image/c1fa27f2b5cec238595a9f86b0e8c5c2.png",
  },
];

function MiniGames() {
  return (
    <ul className="mini-games">
      {games.map((game) => (
        <li
          key={game.id}
          className="game"
          alt="game.name"
          onClick={(_id) => {
            if (_id === 1) {
              //@todo - 포인트 출석체크
            } else if (_id === 2) {
              //@todo - 포인트 률렛
            } else if (_id === 3) {
              //@todo - 포인트 사다리 타기
            } else if (_id === 4) {
              //@todo - 포인트 교환기능
            } else {
              //@todo - 예외처리
            }
          }}
        >
          <img src={game.img} alt={game.name} />
          <div>{game.name}</div>
        </li>
      ))}
    </ul>
  );
}

export default MiniGames;
