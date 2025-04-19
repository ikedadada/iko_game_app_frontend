"use client";

import { useRoomSocket } from "@/components/hooks/useRoomSocket";
import { JoinDialog } from "./JoinDialog";
import PlayerList from "./PlayerList";
import GameView from "./GameView";
import { Button } from "@/components/ui/button";

interface RoomPageProps {
  params: { roomId: string };
}

export default function RoomPage({ params: { roomId } }: RoomPageProps) {
  const {
    state,
    setMyName,
    joinRoom,
    sendStartGame,
    sendRevealNumber,
    sendResetGame,
  } = useRoomSocket(roomId);

  if (!state.connected || !state.myName) {
    return (
      <JoinDialog
        onJoin={(name) => {
          setMyName(name);
          joinRoom(name);
        }}
      />
    );
  }

  return (
    <div className="room-page max-w-2xl w-full mx-auto">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-center mb-2">
          ルームID: {roomId}
        </h1>

        <PlayerList
          players={state.players}
          myId={state.myId}
          phase={state.phase}
        />

        {state.phase === "waiting" && state.players.length > 1 && (
          <div className="text-center">
            <Button onClick={sendStartGame} size="lg">
              ゲームを開始する
            </Button>
          </div>
        )}

        {state.phase === "waiting" && state.players.length <= 1 && (
          <div className="text-center text-muted-foreground">
            他のプレイヤーを待っています...
          </div>
        )}

        {state.phase !== "waiting" && (
          <GameView
            gamePhase={state.phase}
            players={state.players}
            myId={state.myId}
            myNumber={state.myNumber}
            onReveal={sendRevealNumber}
            onReset={sendResetGame}
          />
        )}
      </div>
    </div>
  );
}
