"use client";

import { useEffect } from "react";
import Button from "@/app/components/atoms/Button";
import Typography from "@/app/components/atoms/Typography";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <Typography variant="h1" className="mb-4 text-3xl font-bold">
        Something went wrong!
      </Typography>
      <Typography variant="p" className="mb-6 text-slate-600">
        An unexpected error occurred.
      </Typography>
      <Button isPrimary onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
