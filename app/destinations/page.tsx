import { Suspense } from "react";
import DestinationsBrowser from "./DestinationsBrowser";

export const metadata = {
  title: "Destinations | Pangasinan Heritage",
  description:
    "Browse every heritage landmark and natural wonder featured on Pangasinan Heritage, from island chains to lighthouses and hot springs.",
};

export default function DestinationsPage() {
  return (
    <Suspense>
      <DestinationsBrowser />
    </Suspense>
  );
}
