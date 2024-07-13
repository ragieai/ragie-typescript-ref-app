"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";

export function SubmitButton({
  className = "",
  children,
  variant,
  size,
}: {
  className?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
  children: React.ReactNode;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      type="submit"
      disabled={pending}
    >
      {pending ? "Submitting..." : children}
    </Button>
  );
}
