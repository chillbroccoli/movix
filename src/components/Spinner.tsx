import { IconLoader } from "@tabler/icons-react";

export function Spinner() {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
      <IconLoader className="w-12 h-12 text-pink-500 animate-spin" />
    </div>
  );
}
