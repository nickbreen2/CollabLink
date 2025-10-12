"use client";

import { Button } from "@/components/ui/button";
import { Eye, Pencil } from "lucide-react";

type Props = {
  isEditing: boolean;
  onToggle: () => void;
  className?: string;
};

export default function EditPreviewToggle({ isEditing, onToggle, className }: Props) {
  return (
    <div className={className}>
      {isEditing ? (
        <Button
          size="sm"
          onClick={onToggle}
          className="rounded-full shadow-lg bg-white text-black hover:bg-white/90 dark:bg-white dark:text-black relative z-50"
          aria-label="Preview"
        >
          <Eye className="mr-2 h-4 w-4" />
          Preview
        </Button>
      ) : (
        <Button
          size="sm"
          onClick={onToggle}
          className="rounded-full shadow-lg bg-white text-black hover:bg-white/90 dark:bg-white dark:text-black relative z-50"
          aria-label="Edit profile"
        >
          <Pencil className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      )}
    </div>
  );
}

