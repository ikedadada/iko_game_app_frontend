"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface JoinDialogProps {
  onJoin: (name: string) => void;
}

export const JoinDialog: React.FC<JoinDialogProps> = ({ onJoin }) => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    console.log("参加ボタンが押されました");
    if (name.trim()) {
      console.log("参加する名前:", name);
      onJoin(name.trim());
    }
  };

  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>名前を入力してください</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="プレイヤー名"
          />
          <Button onClick={handleSubmit} disabled={!name.trim()}>
            参加
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
