"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function MotionRoot({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const container = root.current;
    if (!container) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const seen = new WeakSet<Element>();
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          const element = entry.target as HTMLElement;
          element.dataset.revealed = "true";
          if (preference.matches) continue;
          const hasImage = Boolean(element.querySelector("img"));
          const siblings = Array.from(element.parentElement?.children ?? []);
          const animation = element.animate(
            [
              {
                opacity: hasImage ? 1 : 0,
                transform: `translateY(${hasImage ? 8 : 20}px)`,
              },
              { opacity: 1, transform: "translateY(0)" },
            ],
            {
              duration: hasImage ? 480 : 600,
              delay: hasImage ? 0 : (siblings.indexOf(element) % 3) * 70,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            },
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        }
      },
      { threshold: 0.08 },
    );
    const register = () => {
      container
        .querySelectorAll(
          "main > section > div > *, main > header > div > *, [data-reveal]",
        )
        .forEach((element) => {
          if (seen.has(element)) return;
          seen.add(element);
          observer.observe(element);
        });
    };
    register();
    // Also cover streamed pages and client-side navigation.
    const mutations = new MutationObserver(register);
    mutations.observe(container, { childList: true, subtree: true });
    const cancelMotion = () => {
      if (preference.matches) {
        animations.forEach((animation) => animation.cancel());
        animations.clear();
      }
    };
    preference.addEventListener("change", cancelMotion);
    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const distance =
        document.documentElement.scrollHeight - window.innerHeight;
      const fraction =
        distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
      if (progress.current)
        progress.current.style.transform = `scaleX(${fraction})`;
    };
    const scheduleProgress = () => {
      if (!frame) frame = requestAnimationFrame(updateProgress);
    };
    updateProgress();
    window.addEventListener("scroll", scheduleProgress, { passive: true });
    window.addEventListener("resize", scheduleProgress);
    return () => {
      observer.disconnect();
      mutations.disconnect();
      animations.forEach((animation) => animation.cancel());
      preference.removeEventListener("change", cancelMotion);
      window.removeEventListener("scroll", scheduleProgress);
      window.removeEventListener("resize", scheduleProgress);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <>
      <div ref={progress} aria-hidden="true" className="reading-progress" />
      <div id="inhoud" ref={root}>
        {children}
      </div>
    </>
  );
}
