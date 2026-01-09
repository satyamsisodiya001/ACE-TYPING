"use client";

import { cn } from "@/lib/utils";
import React, { useMemo } from "react";

interface TypingAreaProps {
  text: string;
  typed: string;
  isFinished: boolean;
}

const Character = React.memo(
  ({
    char,
    state,
    hasError,
  }: {
    char: string;
    state: "correct" | "current" | "pending";
    hasError: boolean;
  }) => {
    return (
      <span
        className={cn("font-mono text-2xl lg:text-3xl transition-colors duration-150", {
          "text-primary": state === "correct",
          "text-foreground": state === "pending",
          "relative text-destructive-foreground bg-destructive rounded-sm": hasError,
          "relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-accent after:animate-pulse":
            state === "current" && !hasError,
        })}
      >
        {char}
      </span>
    );
  }
);
Character.displayName = 'Character';

export default function TypingArea({ text, typed, isFinished }: TypingAreaProps) {
    const characters = useMemo(() => {
    return text.split("").map((char, index) => {
      let state: "correct" | "current" | "pending" = "pending";
      
      // Since we only advance on correct keys, anything in `typed` is correct.
      if (index < typed.length) {
        state = "correct";
      } else if (index === typed.length && !isFinished) {
        state = "current";
      }
      
      return { char, state };
    });
  }, [text, typed, isFinished]);

  return (
    <div
      className="relative rounded-lg border bg-card p-6 shadow-sm"
      aria-label="Typing text"
    >
      <div className="max-h-[144px] overflow-y-auto leading-relaxed tracking-wider text-left">
        {characters.map(({ char, state }, index) => (
          <Character 
            key={`${char}-${index}`} 
            char={char} 
            state={state}
            // In the new logic, the typed string only contains correct characters.
            // There's no longer a concept of an "incorrect" character state within the text itself.
            // We can remove the `hasError` state and the associated styling if we don't want to show errors visually.
            // For now, let's assume no visual error marking on the character itself, just the error count.
            hasError={false}
          />
        ))}
      </div>
    </div>
  );
}
