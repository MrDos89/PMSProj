//@note - 게임 기능
import "../../cssall/MiniGames.css";
import React, { useState, useEffect } from "react";
import Attendance from "./Attendance";
import Roulette from "./Roulette";
import Ladder from "./Ladder";
import ExchangeShop from "./ExchangeShop";

function MiniGameButtons({ games }) {
  const [gameMode, setGameMode] = useState("ATTENDANCE");

  let body = null;
  //@ todo - 미니게임용 창 만들기
  if (gameMode === "ATTENDANCE") {
    body = <Attendance></Attendance>;
  } else if (gameMode === "ROULETTE") {
    body = <Roulette></Roulette>;
  } else if (gameMode === "LADDER") {
    body = <Ladder></Ladder>;
  } else if (gameMode === "EXCHANGESHOP") {
    body = <ExchangeShop></ExchangeShop>;
  }

  return (
    <ul className="mini-games">
      {games.map((game) => (
        <li key={game.id} className="game" alt="game.name">
          <a
            href="/attendance"
            onClick={(event) => {
              event.preventDefault();

              alert(game.id + "눌렸다");
              if (game.id === 1) {
                setMode("GAME");
                setGameMode("ATTENDANCE");
              } else if (game.id === 2) {
                setMode("GAME");
                setGameMode("ROULETTE");
              } else if (game.id === 3) {
                setMode("GAME");
                setGameMode("LADDER");
              } else if (game.id === 4) {
                setMode("GAME");
                setGameMode("EXCHANGESHOP");
              }
            }}
          >
            <img src={game.img} alt={game.name} />
            {/* {game.name} */}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default MiniGameButtons;
