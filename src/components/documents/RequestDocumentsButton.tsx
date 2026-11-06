"use client";

import { useState } from "react";
import { documentsRequest } from "@/content/documents";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { LockIcon } from "./icons";
import { RequestDocumentsDialog } from "./RequestDocumentsDialog";

type RequestDocumentsButtonProps = {
  variant?: "primary" | "secondary";
  tone?: "light" | "dark";
  size?: "md" | "lg";
  className?: string;
};

/** Opens the Request Private Documents dialog: email verification by one-time code, then delivery by email. */
export function RequestDocumentsButton({ variant, tone, size = "lg", className }: RequestDocumentsButtonProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant={variant}
        tone={tone}
        size={size}
        className={cn("cursor-pointer", className)}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        <span className="inline-flex items-center gap-2.5">
          <LockIcon className="size-4 shrink-0" />
          {documentsRequest.button}
        </span>
      </Button>
      {open ? <RequestDocumentsDialog onClose={() => setOpen(false)} /> : null}
    </>
  );
}
