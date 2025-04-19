"use client";
import React from "react";
import type { Player, GamePhase } from "@/types/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "../ui/badge";

interface PlayerListProps {
  players: Player[];
  myId?: string;
  phase: GamePhase;
}

const PlayerList: React.FC<PlayerListProps> = ({ players, myId, phase }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">参加者一覧</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1">
          {players.map((player) => (
            <li
              key={player.id}
              className="flex justify-between items-center border-b pb-1 text-sm"
            >
              <span>
                {player.name}
                {player.id === myId && " (自分)"}
              </span>
              <span className="font-mono">
                {phase === "waiting" ? null : (
                  <Badge
                    variant={
                      player.number !== undefined ? "default" : "outline"
                    }
                    className="w-8 h-8 text-center"
                  >
                    {player.number !== undefined ? player.number : "?"}
                  </Badge>
                )}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default PlayerList;
