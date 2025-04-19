"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [joinRoomId, setJoinRoomId] = useState("");
  const handleJoinRoom = (roomId: string) => {
    router.push(`/room/${roomId}`);
  };
  const handleCreateRoom = () => {
    const roomId = nanoid(6);
    router.push(`/room/${roomId}`);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Button onClick={() => handleCreateRoom()}>ルームを作成</Button>
        <p className="text-muted-foreground">またはルームIDを入力して参加</p>
        <Input
          value={joinRoomId}
          onChange={(e) => setJoinRoomId(e.target.value)}
          placeholder="ルームIDを入力"
        />
        <Button onClick={() => handleJoinRoom(joinRoomId)}>ルームに参加</Button>
      </main>
    </div>
  );
}
