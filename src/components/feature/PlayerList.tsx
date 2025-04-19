// PlayerList.tsx – プレイヤー一覧表示コンポーネント
"use client";
import React from "react";
import type { Player, GamePhase } from "@/types/types";

interface PlayerListProps {
  players: Player[];
  myName?: string;
  phase: GamePhase;
}

const PlayerList: React.FC<PlayerListProps> = ({ players, myName, phase }) => {
  return (
    <div className="player-list">
      <h3>プレイヤー一覧</h3>
      <ul>
        {players.map((player) => (
          <li key={player.name}>
            {player.name}
            {player.name === myName && " (自分)"}
            {
              phase !== "waiting" &&
                (player.number !== undefined // 数字が開示済みかどうか
                  ? `: ${player.number}` // 開示済みなら数字を表示
                  : ": [非公開]") // 未開示なら伏せた表示
            }
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
