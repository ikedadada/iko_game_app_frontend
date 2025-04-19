// page.tsx (RoomPage) – ゲームルームページコンポーネント
"use client";
import { useState } from "react";
import { useRoomSocket } from "@/components/hooks/useRoomSocket";
import { JoinDialog } from "./JoinDialog";
import PlayerList from "./PlayerList";
import GameView from "./GameView";

interface RoomPageProps {
  params: { roomId: string };
}

export default function RoomPage({ params: { roomId } }: RoomPageProps) {
  const [myName, setMyName] = useState("");
  const { state, joinRoom, sendStartGame, sendRevealNumber } = useRoomSocket(
    roomId,
    myName
  );

  // まだ未参加（WebSocket未接続）の場合は参加ダイアログを表示
  if (!state.connected || !myName) {
    return (
      <JoinDialog
        onJoin={(name) => {
          setMyName(name);
          joinRoom(name);
        }}
      />
    );
  }

  // 参加後のメイン画面表示
  return (
    <div className="room-page">
      {/* プレイヤー一覧 */}
      <PlayerList
        players={state.players}
        myName={state.myName}
        phase={state.phase}
      />

      {/* ゲーム未開始の場合、開始ボタンまたは待機メッセージを表示 */}
      {state.phase === "waiting" && state.players.length > 1 && (
        <div className="waiting-panel">
          <button onClick={sendStartGame}>ゲームを開始する</button>
        </div>
      )}
      {state.phase === "waiting" && state.players.length <= 1 && (
        <div className="waiting-panel">
          <p>他のプレイヤーを待っています...</p>
        </div>
      )}

      {/* ゲーム開始後のビュー */}
      {state.phase !== "waiting" && (
        <GameView
          gamePhase={state.phase}
          players={state.players}
          myName={state.myName}
          myNumber={state.myNumber}
          onReveal={sendRevealNumber}
        />
      )}
    </div>
  );
}
