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
import { useRouter } from "next/navigation";

interface JoinDialogProps {
  onJoin: (name: string) => void;
}

export const JoinDialog: React.FC<JoinDialogProps> = ({ onJoin }) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (isSubmitted) return;
    if (name.trim()) {
      setIsSubmitted(true);
      onJoin(name.trim());
    }
  };

  const onClose = () => {
    router.push("/");
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>名前を入力してください</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="プレイヤー名"
          />
          {!isSubmitted ? (
            <Button type="submit" disabled={!name.trim()}>
              参加
            </Button>
          ) : (
            <Button disabled>参加中...</Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};
