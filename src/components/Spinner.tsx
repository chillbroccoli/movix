import { IconLoader } from "@tabler/icons-react";

export function Spinner() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <IconLoader className="w-12 h-12 text-pink-500 animate-spin" />
    </div>
  );
}
