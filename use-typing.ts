'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { TypingStats } from '@/lib/types';

const useTyping = (initialText: string) => {
  const [text, setText] = useState(initialText);
  const [typed, setTyped] = useState('');
  const [cursor, setCursor] = useState(0);
  const [phase, setPhase] = useState<'pending' | 'typing' | 'finished'>(
    'pending'
  );
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [errors, setErrors] = useState(0);
  const [currentKey, setCurrentKey] = useState<string | null>(null);

  const reset = useCallback((newText: string) => {
    setText(newText);
    setTyped('');
    setCursor(0);
    setPhase('pending');
    setStartTime(0);
    setEndTime(0);
    setErrors(0);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (phase === 'finished' || e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }

      e.preventDefault();
      setCurrentKey(e.key);

      if (phase === 'pending') {
        setPhase('typing');
        setStartTime(Date.now());
      }

      if (e.key === 'Backspace') {
        // Backspace is not allowed in this strict mode
        // If you wanted to allow correcting previous correct characters:
        // if (cursor > 0) {
        //   setTyped((prev) => prev.slice(0, -1));
        //   setCursor((prev) => prev - 1);
        // }
      } else if (e.key.length === 1 && cursor < text.length) {
        if (e.key === text[cursor]) {
          // Correct key press
          setTyped((prev) => prev + e.key);
          setCursor((prev) => prev + 1);
        } else {
          // Incorrect key press
          setErrors((prev) => prev + 1);
        }
      }
    },
    [cursor, phase, text]
  );

  useEffect(() => {
    const keyTimer = setTimeout(() => setCurrentKey(null), 150);
    return () => clearTimeout(keyTimer);
  }, [currentKey]);

  useEffect(() => {
    if (cursor === text.length && text.length > 0 && phase === 'typing') {
      setPhase('finished');
      setEndTime(Date.now());
    }
  }, [cursor, text, phase]);

  const stats: TypingStats = useMemo(() => {
    if (phase === 'pending') {
      return { wpm: 0, acc: 100, time: 0, errors: 0 };
    }

    const timeElapsed = (endTime || Date.now()) - startTime;
    const seconds = timeElapsed > 0 ? timeElapsed / 1000 : 0;
    
    // WPM is based on correctly typed characters
    const wordsTyped = typed.length / 5;
    const wpm = seconds > 0 ? Math.round((wordsTyped / seconds) * 60) : 0;
    
    // Accuracy is based on total characters attempted (correct + errors)
    const totalCharsAttempted = typed.length + errors;
    const acc = totalCharsAttempted > 0 ? Math.round((typed.length / totalCharsAttempted) * 100) : 100;


    return {
      wpm,
      acc: isNaN(acc) ? 100 : acc,
      time: Math.round(seconds),
      errors,
    };
  }, [phase, startTime, endTime, typed, errors, text]);

  return { text, typed, cursor, phase, stats, handleKeyDown, reset, currentKey };
};

export default useTyping;
