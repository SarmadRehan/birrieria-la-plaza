import Image from "next/image";

import logo from "@/assets/images/logo.png";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

/** Their own round logo from Instagram: red double arc, white script "Birrieria La Plaza", a kiosk, "Birria de Res". */
export function Logo({ className = "", priority = false }: LogoProps) {
  return <Image src={logo} alt="Birrieria La Plaza" className={`h-auto ${className}`} sizes="16rem" priority={priority} />;
}
