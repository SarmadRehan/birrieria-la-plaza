import { shop } from "@/data/laPlaza";

export function DemoBanner() {
  return <p className="bg-red-deep px-4 py-2 text-center text-sm font-semibold text-white">{shop.demoNotice}</p>;
}
