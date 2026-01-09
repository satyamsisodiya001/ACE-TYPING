"use client";

import { cn } from "@/lib/utils";
import React from "react";

const KEY_LAYOUT = [
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
  ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"],
  ["CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter"],
  ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "Shift"],
  [" ", " "],
];

const SPECIAL_KEYS: { [key: string]: string } = {
  " ": "Space",
};

interface VirtualKeyboardProps {
  currentKey: string | null;
  nextKey: string;
}

const VirtualKeyboard = ({ currentKey, nextKey }: VirtualKeyboardProps) => {
  const getKeyStyle = (key: string, keyIndex: number) => {
    const lowerKey = key.toLowerCase();
    const lowerCurrentKey = currentKey?.toLowerCase();
    const lowerNextKey = nextKey?.toLowerCase();

    // The fourth row (index 3) contains two "Shift" keys.
    // We differentiate them by their position.
    const isLeftShift = key === 'Shift' && keyIndex === 0;
    const isRightShift = key === 'Shift' && keyIndex > 0;
    
    const isCurrent = 
      lowerCurrentKey === lowerKey || 
      (lowerCurrentKey === 'shift' && key === 'Shift');

    const isNext = 
      (lowerNextKey === lowerKey && !isLeftShift && !isRightShift) || 
      (nextKey && nextKey === nextKey.toUpperCase() && nextKey.toLowerCase() === lowerKey && key === 'Shift');

    return {
      "bg-primary text-primary-foreground scale-110": isCurrent,
      "bg-accent text-accent-foreground": isNext && !isCurrent,
      "flex-grow-[2]": ["Backspace", "Enter"].includes(key) || isRightShift,
      "flex-grow-[2.5]": isLeftShift,
      "flex-grow-[1.5]": ["Tab", "CapsLock", "\\"].includes(key),
      "flex-grow-[8]": key === " ",
    };
  };

  return (
    <div className="flex flex-col gap-1.5 rounded-lg bg-muted p-4 shadow-inner md:gap-2">
      {KEY_LAYOUT.map((row, rowIndex) => (
        <div key={rowIndex} className="flex w-full justify-center gap-1.5 md:gap-2">
          {row.map((key, keyIndex) => (
            <div
              key={`${key}-${rowIndex}-${keyIndex}`}
              className={cn(
                "flex h-10 w-10 flex-grow items-center justify-center rounded-md border-b-2 bg-background font-mono text-sm font-medium transition-all duration-100 ease-in-out md:h-12 md:w-12 md:text-base",
                getKeyStyle(key, keyIndex)
              )}
            >
              {SPECIAL_KEYS[key] || key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default React.memo(VirtualKeyboard);
