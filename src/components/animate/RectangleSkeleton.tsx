import React from "react";

const RectangleSkeleton: React.FC<{
  extraClasses?: string;
  roundedClass?: string;
  sizeClasses?: string;
}> = ({
  extraClasses,
  roundedClass = "rounded-md",
  sizeClasses = "w-full h-7",
}) => (
  <div
    className={`relative
        isolate
        space-y-5
        overflow-hidden
        bg-white/5
        shadow-md
        shadow-black/5
        before:absolute
        before:inset-0
        before:-translate-x-full
        before:animate-[shimmer_2s_infinite]
        before:border-t
        before:border-gray-400/20
        before:bg-gradient-to-r
        before:from-transparent
        before:via-gray-400/20
        before:to-transparent
        ${roundedClass} 
        ${extraClasses} 
        `}
  >
    <div className={`bg-[#e3e3e3] ${roundedClass} ${sizeClasses}`}></div>
  </div>
);

export default RectangleSkeleton;
