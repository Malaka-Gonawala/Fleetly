import { Image as ImageIcon } from "lucide-react";

interface ImagePlaceholderProps {
  label: string;
  aspectRatio?: "1/1" | "16/9" | "4/3" | "3/2" | "21/9" | "auto";
  className?: string;
}

export function ImagePlaceholder({ 
  label, 
  aspectRatio = "16/9",
  className = "" 
}: ImagePlaceholderProps) {
  const aspectStyles = aspectRatio !== "auto" ? { aspectRatio } : {};

  return (
    <div 
      className={`flex flex-col items-center justify-center bg-[#15181D] border-2 border-dashed border-[#262B33] rounded-lg text-[#9A9FA6] overflow-hidden ${className}`}
      style={aspectStyles}
    >
      <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
      <span className="text-sm font-medium tracking-wide">
        [IMAGE: {label}]
      </span>
    </div>
  );
}
