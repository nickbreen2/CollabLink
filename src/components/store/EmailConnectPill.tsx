"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  avatarUrl?: string;
  onSubmit?: (email: string) => void;
  className?: string;
};

export default function EmailConnectPill({ avatarUrl, onSubmit, className }: Props) {
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(email);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "mx-auto flex w-full max-w-[520px] items-center overflow-hidden rounded-full border bg-white/85 p-1 shadow-lg backdrop-blur",
        "dark:bg-neutral-900/85 dark:border-neutral-800",
        className
      )}
      aria-label="Email connect"
    >
      <Input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border-0 bg-transparent text-base focus-visible:ring-0"
      />
      <Button type="submit" className="ml-2 flex items-center gap-2 rounded-full px-4">
        <span className="text-sm">Connect with</span>
        <span className="relative inline-flex h-7 w-7 overflow-hidden rounded-full ring-1 ring-black/10 dark:ring-white/10">
          <span className="absolute inset-0 bg-gradient-to-br from-fuchsia-500 to-indigo-500" aria-hidden />
          {avatarUrl ? (
            <Image alt="Profile avatar" src={avatarUrl} fill className="object-cover" />
          ) : null}
        </span>
      </Button>
    </form>
  );
}

