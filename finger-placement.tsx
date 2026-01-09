const HandIcon = ({ side }: { side: 'left' | 'right' }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      className={`absolute bottom-0 w-64 h-auto text-primary/30 pointer-events-none ${
        side === 'left' ? 'left-0 transform -translate-x-1/4' : 'right-0 transform translate-x-1/4'
      }`}
      style={{ transform: side === 'right' ? 'scaleX(-1) translateX(-25%)' : 'translateX(-25%)' }}
    >
      <path
        fill="currentColor"
        stroke="hsl(var(--primary-foreground))"
        strokeWidth="2"
        d="M80.8,198.5c-2.3,0-4.6-0.9-6.4-2.6L2.3,121.7c-4.2-4.2-3.7-11.2,0.5-15.4l0,0c4.2-4.2,11.2-3.7,15.4,0.5l56,59.3 c2.7,2.9,7.2,3,10.1,0.3l15.1-13.8c2.9-2.7,7.3-2.6,10.1,0.2l15.8,15.8c2.8,2.8,7.3,2.8,10.1,0l17.2-17.2c2.8-2.8,7.3-2.8,10.1,0 l16.6,16.6c2.8,2.8,7.3,2.8,10.1,0L180,151.4c2.8-2.8,7.3-2.8,10.1,0l7.1,7.1c4.2,4.2,3.7,11.2-0.5,15.4l0,0 c-4.2,4.2-11.2,3.7-15.4-0.5l-2.4-2.4c-2.8-2.8-7.3-2.8-10.1,0l-16.6,16.6c-2.8,2.8-7.3,2.8-10.1,0l-17.2-17.2 c-2.8-2.8-7.3-2.8-10.1,0l-15.8,15.8c-2.8,2.8-7.3,2.8-10.1-0.2L87,196.1C85.4,197.7,83.1,198.5,80.8,198.5z"
      />
    </svg>
  );
  
  const FingerLabel = ({ finger, side, position }: { finger: string, side: 'left' | 'right', position: string }) => (
    <div className={`absolute bottom-0 pointer-events-none ${position}`}>
        <div className={`flex flex-col items-center font-mono text-xs text-primary ${side === 'right' ? 'flex-row-reverse' : ''}`}>
            <span className="px-1.5 py-0.5 rounded-md bg-primary text-primary-foreground">{finger.charAt(0).toUpperCase()}</span>
            <div className={`h-4 w-px bg-primary/50 ${side === 'left' ? 'ml-1' : 'mr-1'}`}></div>
        </div>
    </div>
  );
  
  export default function FingerPlacement() {
    return (
      <>
        {/* Hands */}
        <HandIcon side="left" />
        <HandIcon side="right" />

        {/* Left Hand Finger Labels */}
        <FingerLabel finger="pinky" side="left" position="left-[12%]" />
        <FingerLabel finger="ring" side="left" position="left-[16%]" />
        <FingerLabel finger="middle" side="left" position="left-[20.5%]" />
        <FingerLabel finger="index" side="left" position="left-[25%]" />

        {/* Right Hand Finger Labels */}
        <FingerLabel finger="index" side="right" position="right-[25.5%]" />
        <FingerLabel finger="middle" side="right" position="right-[21%]" />
        <FingerLabel finger="ring" side="right" position="right-[16.5%]" />
        <FingerLabel finger="pinky" side="right" position="right-[12%]" />
      </>
    );
  }
  