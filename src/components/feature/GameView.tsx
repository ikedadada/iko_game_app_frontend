// GameView.tsx – ゲーム進行中の表示コンポーネント
"use client";
import React from "react";
import type { GamePhase, Player } from "@/types/types";

interface GameViewProps {
  gamePhase: GamePhase;
  players: Player[];
  myName?: string;
  myNumber?: number;
  onReveal: () => void;
}

const GameView: React.FC<GameViewProps> = ({
  gamePhase,
  players,
  myName,
  myNumber,
  onReveal,
}) => {
  // 自分自身のプレイヤー情報を取得（開示済みかどうかに利用）
  const selfPlayer = players.find((p) => p.name === myName);
  const selfRevealed = selfPlayer?.number !== undefined;

  return (
    <div className="game-view">
      {gamePhase === "inProgress" && (
        <div>
          <p>
            ゲームが開始されました。各プレイヤーには秘密の数字が割り当てられています。
          </p>
          {myNumber !== undefined ? (
            <p>
              あなたの数字: <strong>{myNumber}</strong>
            </p>
          ) : (
            <p>あなたの数字を取得しています...</p>
          )}
          {!selfRevealed ? (
            <button onClick={onReveal}>自分の数字を開示する</button>
          ) : (
            <p>あなたの数字を開示しました。他のプレイヤーを待っています...</p>
          )}
        </div>
      )}
      {gamePhase === "revealed" && (
        <div>
          <p>全てのプレイヤーが数字を開示しました！</p>
          <p>ゲーム終了です。</p>
          {/* 必要に応じて、ここで結果の表示や次のラウンドへの案内を行うことができます。 */}
        </div>
      )}
    </div>
  );
};

export default GameView;
