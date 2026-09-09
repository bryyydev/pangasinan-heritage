import Link from "next/link";
import Typography from "@/app/components/atoms/Typography";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <Typography variant="h1" className="mb-2 text-4xl font-bold text-amber-600">
        404
      </Typography>
      <Typography variant="h2" className="mb-4 text-xl font-semibold">
        Page Not Found
      </Typography>
      <Typography variant="p" className="mb-6 text-slate-600">
        Could not find requested resource.
      </Typography>
      <Link
        href="/"
        className="rounded-xl bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-amber-700"
      >
        Return Home
      </Link>
    </div>
  );
}
