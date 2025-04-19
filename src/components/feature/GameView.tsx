// components/feature/GameView.tsx – ゲーム進行中の表示コンポーネント
"use client";
import React from "react";
import type { GamePhase, Player } from "@/types/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface GameViewProps {
  gamePhase: GamePhase;
  players: Player[];
  myId?: string;
  myNumber?: number;
  onReveal: () => void;
  onReset: () => void;
}

const GameView: React.FC<GameViewProps> = ({
  gamePhase,
  players,
  myId,
  myNumber,
  onReveal,
  onReset,
}) => {
  const selfPlayer = players.find((p) => p.id === myId);
  const selfRevealed = selfPlayer?.number !== undefined;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">ゲームの進行状況</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {gamePhase === "inProgress" && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              ゲームが開始されました。各プレイヤーには秘密の数字が割り当てられています。
            </p>
            <hr />
            <div className="flex">
              {myNumber !== undefined ? (
                <div className="flex-grow-2">
                  あなたの数字:{" "}
                  <span className="font-bold text-xl">{myNumber}</span>
                </div>
              ) : (
                <div className="flex-grow-2 text-muted-foreground">
                  あなたの数字を取得しています...
                </div>
              )}
              <div className="space-y-2">
                {!selfRevealed ? (
                  <Button onClick={onReveal}>自分の数字を開示する</Button>
                ) : (
                  <Button disabled>数字を開示しました</Button>
                )}
              </div>
            </div>
          </div>
        )}

        {gamePhase === "revealed" && (
          <div className="space-y-2">
            <p className="text-lg font-semibold">
              全てのプレイヤーが数字を開示しました！
            </p>
            <div className="flex">
              <div className="flex-grow-2 text-muted-foreground">
                ゲーム終了です。
              </div>
              <Button onClick={onReset}>もう一度やる</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GameView;
