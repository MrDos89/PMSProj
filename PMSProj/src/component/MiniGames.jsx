import React from "react";
import "../cssall/MiniGames.css";

const games = [
  {
    id: 1,
    img: "./image/pngtree-lucky-wheel-png-image_6518840.png",
  },
  { id: 2, img: "./image/images.png" },
  {
    id: 3,
    img: "./image/c1fa27f2b5cec238595a9f86b0e8c5c2.png",
  },
];

function MiniGames() {
  return (
    <div className="mini-games">
      {games.map((game) => (
        <div key={game.id} className="game">
          <img src={game.img} alt={game.name} />
          <div>{game.name}</div>
        </div>
      ))}
    </div>
  );
}

export default MiniGames;
