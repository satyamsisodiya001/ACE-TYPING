import { Keyboard } from 'lucide-react';
import React from 'react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2 p-2">
      <Keyboard className="h-8 w-8 text-primary" />
      <div className="duration-200 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=offcanvas]:opacity-0">
        <h2 className="font-headline text-lg font-bold">Type Ace</h2>
      </div>
    </div>
  );
}
