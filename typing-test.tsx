"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { phrases } from "@/lib/phrases";
import useTyping from "@/hooks/use-typing";
import StatsDisplay from "./stats-display";
import TypingArea from "./typing-area";
import VirtualKeyboard from "./virtual-keyboard";

interface TypingTestProps {
  initialPhrase: string;
  showFingerGuides?: boolean;
}

export default function TypingTest({
  initialPhrase,
  showFingerGuides = false,
}: TypingTestProps) {
  const {
    text,
    typed,
    cursor,
    phase,
    stats,
    handleKeyDown,
    reset,
    currentKey,
  } = useTyping(initialPhrase);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Prevent browser shortcuts like Ctrl+R
      if ((e.ctrlKey || e.metaKey) && e.key === "r") {
        e.preventDefault();
        reset(phrases[Math.floor(Math.random() * phrases.length)]);
        return;
      }
      handleKeyDown(e);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [handleKeyDown, reset]);

  return (
    <div className="flex flex-col gap-8">
      <StatsDisplay stats={stats} />
      <div className="relative">
        <TypingArea
          text={text}
          typed={typed}
          isFinished={phase === "finished"}
        />
        {phase === "finished" && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-background/80">
            <div className="text-center">
              <p className="font-headline text-2xl font-bold text-primary">
                Test Complete!
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button
          onClick={() =>
            reset(phrases[Math.floor(Math.random() * phrases.length)])
          }
          variant="outline"
          aria-label="Restart typing test"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Restart
        </Button>
        <p className="text-sm text-muted-foreground">
          or press <kbd className="rounded-md border bg-muted px-2 py-1 text-xs">Ctrl</kbd> + <kbd className="rounded-md border bg-muted px-2 py-1 text-xs">R</kbd>
        </p>
      </div>

      <VirtualKeyboard
        currentKey={currentKey}
        nextKey={text[cursor]}
        showFingerGuides={showFingerGuides}
      />
    </div>
  );
}
