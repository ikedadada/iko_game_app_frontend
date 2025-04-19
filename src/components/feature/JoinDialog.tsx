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

export function JoinDialog({ onSubmit }: { onSubmit: (name: string) => void }) {
  const [name, setName] = useState("");

  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>名前を入力してください</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <Button onClick={() => onSubmit(name)} disabled={!name}>
            参加
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
