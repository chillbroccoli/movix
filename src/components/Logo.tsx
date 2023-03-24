import Image from "next/image";
import logo from "~/images/movix-color.png";

export function Logo() {
  return (
    <div className="relative w-16 h-16">
      <Image src={logo} alt="Logo" fill />
    </div>
  );
}
