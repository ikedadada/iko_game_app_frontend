"use client";
import { useParams } from "next/navigation";
import RoomPage from "@/components/feature/RoomPage";

export default function Page() {
  const { roomId } = useParams();
  if (typeof roomId !== "string") {
    throw new Error("Invalid roomId");
  }
  return <RoomPage params={{ roomId }} />;
}
