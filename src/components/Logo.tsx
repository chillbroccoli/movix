import Image from "next/image";
import Link from "next/link";
import logo from "~/images/movix-color.png";

export function Logo() {
  return (
    <div className="relative w-16 h-16">
      <Link href="/">
        <Image src={logo} alt="Logo" fill />
      </Link>
    </div>
  );
}
