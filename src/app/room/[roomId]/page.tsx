"use client";
import { JoinDialog } from "@/components/feature/JoinDialog";
import { Button } from "@/components/ui/button";
import { connectSocket, socket } from "@/lib/socket";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function RoomPage() {
  const { roomId } = useParams();
  const [name, setName] = useState("");
  const [players, setPlayers] = useState<string[]>([]);
  const [ownNumber, setOwnNumber] = useState<number | null>(null);
  const [visiblePlayers, setVisiblePlayers] = useState<Record<string, number>>(
    {}
  );
  const [showOwnNumber, setShowOwnNumber] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!name) return;
    connectSocket();
    socket.onopen = () => {
      console.debug("Socket opened");
      socket.send(
        JSON.stringify({
          type: "join",
          roomId,
          name,
        })
      );
    };
    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data.toString());
      if (msg.type === "game-already-started") {
        console.debug("Game already started", msg);
        alert("ゲームは開始されているため、参加できません");
        setName("");
      }
      if (msg.type === "set-players") {
        console.debug("Players updated", msg.players);
        setPlayers(msg.players.map((p: { name: string }) => p.name));
      }

      if (msg.type === "start-game") {
        console.debug("Game started", msg);
        setOwnNumber(msg.number);
      }

      if (msg.type == "show-own-number") {
        console.debug("Own number shown", msg);
        setVisiblePlayers(msg.canSee);
      }

      if (msg.type == "reset-game") {
        console.debug("Game reset", msg);
        setOwnNumber(null);
        setVisiblePlayers({});
        setShowOwnNumber(false);
        setIsFinished(false);
      }
    };

    return () => {
      socket.close();
    };
  }, [roomId, name]);

  useEffect(() => {
    console.log("visiblePlayers", visiblePlayers);
    console.log("players", players);
    if (Object.keys(visiblePlayers).length >= players.length) {
      setIsFinished(true);
    } else {
      setIsFinished(false);
    }
  }, [visiblePlayers, players]);

  const handleStartGame = () => {
    socket.send(
      JSON.stringify({
        type: "start-game",
        roomId,
      })
    );
  };

  const handleShowOwnNumber = () => {
    setShowOwnNumber(true);
    socket.send(
      JSON.stringify({
        type: "show-own-number",
        roomId,
      })
    );
  };

  const handleResetGame = () => {
    socket.send(
      JSON.stringify({
        type: "reset-game",
        roomId,
      })
    );
  };

  if (!name) return <JoinDialog onSubmit={setName} />;
  console.log("players.length", players.length);
  if (!ownNumber)
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">ルームID: {roomId}</h1>
        <p>参加者：</p>
        <ul className="list-disc ml-6">
          {players.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        {players.length < 2 ? (
          <p>2名以上の参加者が必要です</p>
        ) : (
          <Button onClick={handleStartGame}>ゲームを開始</Button>
        )}
      </div>
    );
  return (
    <div className="mt-6">
      <h1 className="text-xl font-bold mb-4">ルームID: {roomId}</h1>
      <p className="text-2xl font-bold mb-4">あなたは： {name}</p>
      <p>参加者：</p>
      <ul className="list-disc ml-6">
        {players.map((name) => (
          <li key={name}>
            {name}: {visiblePlayers[name] ?? "???"}
          </li>
        ))}
      </ul>
      <p className="text-2xl font-bold mb-4">あなたの数字: {ownNumber}</p>
      {showOwnNumber ? (
        <p className="text-2xl font-bold">開示済み</p>
      ) : (
        <Button onClick={handleShowOwnNumber}>自分の数字を開示</Button>
      )}
      {isFinished && (
        <>
          <div className="text-2xl font-bold mt-4">
            すべての参加者の数字が開示されました
          </div>
          <Button onClick={handleResetGame}>ゲームを再開する</Button>
        </>
      )}
    </div>
  );
}
