// useRoomSocket.ts – WebSocket接続とイベント処理のカスタムフック
"use client";
import { useEffect, useReducer, useRef } from "react";
import type {
  GameState,
  Player,
  ServerMessage,
  ClientMessage,
} from "@/types/types";

// GameStateの初期値
const initialState: GameState = {
  phase: "waiting",
  players: [],
  myName: "",
  myNumber: undefined,
  connected: false,
};

// Reducerで扱うアクションの型定義
type Action =
  | { type: "CONNECTED" }
  | { type: "SET_PLAYERS"; players: Player[] }
  | { type: "GAME_STARTED"; number: number }
  | { type: "SHOW_OWN_NUMBER"; canSee: Record<string, number> }
  | { type: "PLAYER_REVEALED"; playerId: string; number: number };

// GameStateを更新するreducer関数
function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "CONNECTED":
      return { ...state, connected: true };
    case "SET_PLAYERS": {
      const { players } = action;

      const started = players.some((p) => p.number !== undefined);
      const phase: GameState["phase"] = started ? "inProgress" : "waiting";
      return {
        ...state,
        players: players,
        phase: phase,
        connected: true,
      };
    }
    case "GAME_STARTED":
      const { number } = action;
      return {
        ...state,
        phase: "inProgress",
        myNumber: number,
      };
    case "SHOW_OWN_NUMBER": {
      // 指定されたプレイヤーのnumberとrevealedを更新
      const { canSee } = action;
      const updatedPlayers = state.players.map((player) => {
        return {
          ...player,
          number: canSee[player.name],
        };
      });

      // 全員が開示済みか確認
      const allRevealed = updatedPlayers.every((p) => p.number !== undefined);
      return {
        ...state,
        players: updatedPlayers,
        phase: allRevealed ? "revealed" : "inProgress",
      };
    }
    default:
      return state;
  }
}

// ゲームルーム用カスタムフック
export function useRoomSocket(roomId: string, name: string) {
  const [state, dispatch] = useReducer(gameReducer, {
    ...initialState,
    myName: name,
  });
  const socketRef = useRef<WebSocket | null>(null);

  // コンポーネントのクリーンアップ時にWebSocketを閉じる
  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  // WebSocketメッセージ受信時の処理を定義
  const handleMessage = (event: MessageEvent) => {
    const data: ServerMessage = JSON.parse(event.data);
    switch (data.type) {
      case "connected":
        // 接続成功時の処理
        dispatch({ type: "CONNECTED" });
        break;
      case "set-players":
        // 初期状態を受信（参加時）
        dispatch({
          type: "SET_PLAYERS",
          players: data.players,
        });
        break;
      case "start-game":
        dispatch({ type: "GAME_STARTED", number: data.number });
        break;
      case "show-own-number":
        dispatch({
          type: "SHOW_OWN_NUMBER",
          canSee: data.canSee,
        });
        break;
      default:
        // 未知のメッセージタイプは無視する
        break;
    }
  };

  // ゲームルームに参加（WebSocket接続開始）
  const joinRoom = (name: string) => {
    if (socketRef.current) {
      console.warn("Already connected to the WebSocket server.");
      return; // 既に接続済みの場合は二重接続しない
    }
    // WebSocketサーバーへの接続を確立
    const socket = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL ?? ""}/ws`);
    socketRef.current = socket;
    // 接続オープン時に参加メッセージを送信
    socket.addEventListener("open", () => {
      dispatch({ type: "CONNECTED" }); // 接続フラグを更新
      const joinMessage: ClientMessage = { type: "join", name, roomId };
      socket.send(JSON.stringify(joinMessage));
    });
    // メッセージ受信イベントにハンドラを登録
    socket.addEventListener("message", handleMessage);
  };

  // 「ゲーム開始」要求を送信する関数
  const sendStartGame = () => {
    if (!socketRef.current) return;
    const msg: ClientMessage = { type: "start-game", roomId };
    socketRef.current.send(JSON.stringify(msg));
  };

  // 「自分の数字を開示」要求を送信する関数
  const sendRevealNumber = () => {
    if (!socketRef.current) return;
    const msg: ClientMessage = { type: "show-own-number", roomId };
    socketRef.current.send(JSON.stringify(msg));
  };

  // フックから現在の状態と操作関数を返す
  return {
    state,
    joinRoom,
    sendStartGame,
    sendRevealNumber,
  };
}
