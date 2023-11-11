import React from "react";

const Skeleton: React.FC<{
  extraClasses?: string;
  children: React.ReactNode;
}> = ({ extraClasses, children }) => (
  <div
    className={`relative
        isolate
        space-y-5
        overflow-hidden
        bg-white/5
        shadow-xl
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
        ${extraClasses}
        `}
  >
    {children}
  </div>
);

export default Skeleton;
