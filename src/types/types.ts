// types.ts – ゲーム状態とメッセージの型定義
export type GamePhase = "waiting" | "inProgress" | "revealed";

export interface Player {
  name: string;
  number?: number;
}

export interface GameState {
  phase: GamePhase;
  players: Player[];
  myName: string;
  myNumber?: number;
  connected: boolean;
}

// サーバーから受け取るメッセージの型定義（受信イベント）
export type ServerMessage =
  | { type: "connected" }
  | {
      type: "set-players";
      roomId: string;
      players: Player[];
    }
  | { type: "start-game"; number: number }
  | { type: "show-own-number"; canSee: Record<string, number> }
  | { type: "game-already-started" }
  | { type: "reset-game" };

// サーバーへ送信するメッセージの型定義（送信イベント）
export type ClientMessage =
  | { type: "join"; name: string; roomId: string }
  | { type: "start-game"; roomId: string }
  | { type: "show-own-number"; roomId: string }
  | { type: "reset-game"; roomId: string };
