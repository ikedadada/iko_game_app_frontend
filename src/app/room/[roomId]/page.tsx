"use client";
import { useParams } from "next/navigation";
import RoomPage from "@/components/feature/RoomPage";

export default function Page() {
  const { roomId } = useParams();
  if (typeof roomId !== "string") {
    throw new Error("Invalid roomId");
  }
  return (
    <div className="flex gap-[32px] row-start w-full flex-col items-center pt-10">
      <div className="flex gap-[32px] row-start w-full">
        <RoomPage params={{ roomId }} />
      </div>
    </div>
  );
}
