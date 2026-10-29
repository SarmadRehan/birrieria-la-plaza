import { shop } from "@/data/laPlaza";

import { OrderButton } from "./SiteProvider";

/** Thumb-reachable Call, Order and Find us buttons, shown on small screens only. */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 gap-2 border-t border-coal-line bg-ink/95 p-3 text-[0.95rem] text-white backdrop-blur md:hidden">
      <a href={shop.phoneHref} className="rounded-full border-2 border-white py-2.5 text-center font-bold">
        Call
      </a>
      <OrderButton className="rounded-full bg-red-deep py-3 text-center font-bold">Order</OrderButton>
      <a href="#locations" className="rounded-full bg-marigold py-3 text-center font-bold text-ink">
        Find us
      </a>
    </div>
  );
}
