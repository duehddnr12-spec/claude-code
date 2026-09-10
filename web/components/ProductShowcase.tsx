"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function ProductShowcase() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const reducedRef = useRef(false);

  if (typeof window !== "undefined") {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reducedRef.current || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    setStyle({
      transform: `perspective(1000px) rotateY(${px * 14}deg) rotateX(${-py * 14}deg) scale3d(1.02, 1.02, 1.02)`,
    });
  }

  function handleMouseLeave() {
    setStyle({
      transform:
        "perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)",
    });
  }

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-[360px] w-full sm:h-[440px] lg:h-[560px]"
      style={{ perspective: "1000px" }}
      role="img"
      aria-label="공중에 떠 있는 화이트 티셔츠 제품 사진"
    >
      <div
        className="h-full w-full transition-transform duration-300 ease-out will-change-transform motion-reduce:transition-none"
        style={{
          ...style,
          maskImage:
            "radial-gradient(ellipse at 50% 48%, black 40%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 48%, black 40%, transparent 72%)",
        }}
      >
        <Image
          src="/tee-hero.png"
          alt="ATELIER BLANC 화이트 티셔츠"
          fill
          priority
          sizes="(min-width: 1024px) 640px, (min-width: 640px) 60vw, 90vw"
          className="object-contain"
        />
      </div>
    </div>
  );
}
