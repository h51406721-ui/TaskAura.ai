"use client";
import { useEffect } from "react";

export default function KeyboardNav({ selectors }: { selectors: string[] }) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Tab") {
        const focusable = selectors
          .map(sel => Array.from(document.querySelectorAll<HTMLElement>(sel)))
          .flat()
          .filter(el => !el.hasAttribute("disabled"));
        const index = focusable.indexOf(document.activeElement as HTMLElement);
        let next;
        if (e.shiftKey) {
          next = (index - 1 + focusable.length) % focusable.length;
        } else {
          next = (index + 1) % focusable.length;
        }
        focusable[next]?.focus();
        e.preventDefault();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectors]);
  return null;
}
