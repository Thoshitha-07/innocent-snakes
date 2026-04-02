import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-cyan flex flex-col items-center justify-center relative overflow-hidden font-digital">
      <div className="absolute inset-0 bg-static z-50 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute inset-0 scanlines z-40 pointer-events-none"></div>

      <header className="z-10 mb-8 w-full max-w-7xl px-4 flex flex-col items-start border-b-4 border-magenta pb-4">
        <h1 className="text-6xl md:text-8xl font-glitch tracking-widest text-white glitch-tear" data-text="SYS.OP.CORE">
          SYS.OP.CORE
        </h1>
        <p className="text-magenta text-2xl mt-2 bg-cyan text-black px-2 inline-block font-bold">WARNING: UNSTABLE CONNECTION</p>
      </header>

      <main className="z-10 flex flex-col lg:flex-row items-start gap-8 max-w-7xl w-full px-4">
        <div className="hidden xl:flex flex-col gap-6 w-64">
          <div className="p-4 border-glitch bg-black">
            <h4 className="text-2xl text-magenta mb-2 border-b-2 border-cyan pb-1">DIAGNOSTICS</h4>
            <div className="space-y-2 text-xl mt-2">
              <div className="flex justify-between">
                <span>MEM_LEAK</span>
                <span className="text-yellow animate-pulse">DETECTED</span>
              </div>
              <div className="flex justify-between">
                <span>DATA_STREAM</span>
                <span className="text-cyan">ACTIVE</span>
              </div>
              <div className="flex justify-between">
                <span>NEURAL_LINK</span>
                <span className="text-magenta">UNSTABLE</span>
              </div>
            </div>
          </div>
          <div className="p-4 border-glitch-alt bg-black">
            <h4 className="text-2xl text-cyan mb-2 border-b-2 border-magenta pb-1">SECTOR_MAP</h4>
            <div className="w-full h-32 bg-magenta/20 relative overflow-hidden">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-cyan animate-pulse"></div>
              <div className="absolute top-0 left-1/2 w-0.5 h-full bg-cyan animate-pulse"></div>
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow animate-ping"></div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center w-full">
          <SnakeGame />
        </div>

        <div className="w-full lg:w-auto">
          <MusicPlayer />
        </div>
      </main>
    </div>
  );
}

