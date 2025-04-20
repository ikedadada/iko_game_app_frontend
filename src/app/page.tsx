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
    <div className="grid justify-items-center min-h-screen">
      <div className="flex gap-[32px] row-start w-full flex-col items-center">
        <div className="flex flex-col gap-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-2">Iko Online</h1>
          <div className="text-lg text-muted-foreground text-center">
            オンラインであそべる「いこ」
          </div>
          <Button onClick={() => handleCreateRoom()}>ルームを作成</Button>
          <div className="text-muted-foreground text-center">
            またはルームIDを入力して参加
          </div>
          <Input
            value={joinRoomId}
            onChange={(e) => setJoinRoomId(e.target.value)}
            placeholder="ルームIDを入力"
          />
          <Button onClick={() => handleJoinRoom(joinRoomId)}>
            ルームに参加
          </Button>
        </div>
      </div>
    </div>
  );
}
