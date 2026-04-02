import React, { useState, useRef, useEffect } from 'react';

interface Track {
  id: number;
  title: string;
  artist: string;
  url: string;
  cover: string;
}

const TRACKS: Track[] = [
  {
    id: 1,
    title: "DATA_CORRUPTION",
    artist: "UNKNOWN_ENTITY",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://picsum.photos/seed/glitch1/300/300"
  },
  {
    id: 2,
    title: "SYSTEM_OVERRIDE",
    artist: "ROGUE_AI",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://picsum.photos/seed/glitch2/300/300"
  },
  {
    id: 3,
    title: "VOID_SIGNAL",
    artist: "NULL_POINTER",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://picsum.photos/seed/glitch3/300/300"
  }
];

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(currentProgress || 0);
    }
  };

  const handleEnded = () => {
    nextTrack();
  };

  return (
    <div className="w-full max-w-[400px] bg-black border-glitch-alt p-6">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      
      <div className="flex items-start gap-4 mb-6">
        <div className="relative w-24 h-24 border-2 border-magenta overflow-hidden shrink-0">
          <img 
            src={currentTrack.cover} 
            alt={currentTrack.title} 
            className="w-full h-full object-cover grayscale contrast-200"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-cyan/30 mix-blend-color"></div>
          {isPlaying && <div className="absolute inset-0 bg-static mix-blend-overlay"></div>}
        </div>
        
        <div className="flex-1 overflow-hidden">
          <h3 className="text-2xl text-cyan uppercase glitch-tear truncate" data-text={currentTrack.title}>
            {currentTrack.title}
          </h3>
          <p className="text-xl text-magenta uppercase truncate">ID: {currentTrack.artist}</p>
          <div className="mt-2 text-lg text-yellow animate-pulse">
            {isPlaying ? 'STREAMING_DATA...' : 'STREAM_PAUSED'}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full h-6 border-2 border-cyan mb-6 bg-black overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-magenta"
          style={{ width: `${progress}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-black font-bold text-sm mix-blend-difference">
          BUFFER: {Math.round(progress)}%
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between text-3xl">
        <button onClick={prevTrack} className="text-cyan hover:text-black hover:bg-cyan px-2 transition-colors">
          [&lt;&lt;]
        </button>
        
        <button 
          onClick={togglePlay}
          className="text-magenta hover:text-black hover:bg-magenta px-4 py-1 border-2 border-magenta transition-colors"
        >
          {isPlaying ? '[ || ]' : '[ > ]'}
        </button>
        
        <button onClick={nextTrack} className="text-cyan hover:text-black hover:bg-cyan px-2 transition-colors">
          [&gt;&gt;]
        </button>
      </div>
    </div>
  );
};

