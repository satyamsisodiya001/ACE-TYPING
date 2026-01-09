'use client';

import { useState, useEffect } from 'react';
import TypingTest from '@/components/typing/typing-test';
import { phrases } from '@/lib/phrases';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Keyboard, Zap, Rabbit, Hand } from 'lucide-react';

export default function Home() {
  const [initialPhrase, setInitialPhrase] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setInitialPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
  }, []);

  if (!isClient || !initialPhrase) {
    return null; // or a loading spinner
  }

  return (
    <>
      <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl">
              Welcome to Type Ace!
            </DialogTitle>
            <DialogDescription>
              Your personal AI-powered typing tutor. Here are a few tips to get
              started:
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-start gap-4">
              <Hand className="h-6 w-6 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Finger Position</h3>
                <p className="text-sm text-muted-foreground">
                  Rest your left fingers on A, S, D, F and your right fingers on
                  J, K, L, ;. Thumbs on the spacebar.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Keyboard className="h-6 w-6 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Start Typing</h3>
                <p className="text-sm text-muted-foreground">
                  The test begins automatically when you press the first key.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Zap className="h-6 w-6 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Focus on Accuracy</h3>
                <p className="text-sm text-muted-foreground">
                  You must press the correct key to advance to the next
                  character.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Rabbit className="h-6 w-6 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">New Test</h3>
                <p className="text-sm text-muted-foreground">
                  Press{' '}
                  <kbd className="rounded-md border bg-muted px-2 py-1 text-xs">
                    Ctrl
                  </kbd>{' '}
                  +{' '}
                  <kbd className="rounded-md border bg-muted px-2 py-1 text-xs">
                    R
                  </kbd>{' '}
                  for a new phrase at any time.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowWelcome(false)}>Start Typing</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col gap-8">
        <div className="text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight lg:text-5xl">
            Typing Practice
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Test your speed and accuracy. The clock starts when you type.
          </p>
        </div>
        <TypingTest initialPhrase={initialPhrase} showFingerGuides={true} />
      </div>
    </>
  );
}
