// components/feature/GameView.tsx – ゲーム進行中の表示コンポーネント
"use client";
import React from "react";
import type { GamePhase, Player } from "@/types/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface GameViewProps {
  gamePhase: GamePhase;
  players: Player[];
  myName?: string;
  myNumber?: number;
  onReveal: () => void;
  onReset: () => void;
}

const GameView: React.FC<GameViewProps> = ({
  gamePhase,
  players,
  myName,
  myNumber,
  onReveal,
  onReset,
}) => {
  const selfPlayer = players.find((p) => p.name === myName);
  const selfRevealed = selfPlayer?.number !== undefined;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">ゲームの進行状況</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {gamePhase === "inProgress" && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              ゲームが開始されました。各プレイヤーには秘密の数字が割り当てられています。
            </p>
            {myNumber !== undefined ? (
              <p>
                あなたの数字:{" "}
                <span className="font-bold text-xl">{myNumber}</span>
              </p>
            ) : (
              <p className="text-muted-foreground">
                あなたの数字を取得しています...
              </p>
            )}
            {!selfRevealed ? (
              <Button onClick={onReveal}>自分の数字を開示する</Button>
            ) : (
              <p className="text-muted-foreground">
                あなたの数字は開示済みです。他のプレイヤーを待っています...
              </p>
            )}
          </div>
        )}

        {gamePhase === "revealed" && (
          <div className="space-y-2">
            <p className="text-lg font-semibold">
              全てのプレイヤーが数字を開示しました！
            </p>
            <p className="text-muted-foreground">ゲーム終了です。</p>
            <Button onClick={onReset}>もう一度やる</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GameView;
