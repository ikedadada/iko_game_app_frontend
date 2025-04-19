"use client";
import React from "react";
import type { Player, GamePhase } from "@/types/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface PlayerListProps {
  players: Player[];
  myName?: string;
  phase: GamePhase;
}

const PlayerList: React.FC<PlayerListProps> = ({ players, myName, phase }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">参加者一覧</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1">
          {players.map((player) => (
            <li
              key={player.name}
              className="flex justify-between border-b pb-1 text-sm"
            >
              <span>
                {player.name}
                {player.name === myName && " (自分)"}
              </span>
              <span className="font-mono">
                {phase === "waiting"
                  ? ""
                  : player.number !== undefined
                    ? player.number
                    : "[非公開]"}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default PlayerList;
