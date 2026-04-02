import React, { useState, useEffect, useCallback, useRef } from 'react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const SPEED = 80;

export const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const gameLoopRef = useRef<number | null>(null);

  const generateFood = useCallback(() => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood());
    setScore(0);
    setGameOver(false);
    setIsPaused(true);
  };

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake((prevSnake) => {
      const head = prevSnake[0];
      const newHead = {
        x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((s) => s + 10);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, isPaused, generateFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction.y === 0) setDirection({ x: 0, y: -1 }); break;
        case 'ArrowDown': if (direction.y === 0) setDirection({ x: 0, y: 1 }); break;
        case 'ArrowLeft': if (direction.x === 0) setDirection({ x: -1, y: 0 }); break;
        case 'ArrowRight': if (direction.x === 0) setDirection({ x: 1, y: 0 }); break;
        case ' ': setIsPaused((p) => !p); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (!gameOver && !isPaused) {
      gameLoopRef.current = window.setInterval(moveSnake, SPEED);
    } else if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [moveSnake, gameOver, isPaused]);

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full">
      <div className="mb-2 flex items-center justify-between w-full max-w-[400px] border-b-4 border-cyan pb-2">
        <h2 className="text-3xl text-cyan glitch-tear" data-text="EXEC://SNAKE.BIN">EXEC://SNAKE.BIN</h2>
        <div className="text-3xl text-magenta">MEM:{score.toString().padStart(4, '0')}</div>
      </div>

      <div 
        className="relative bg-black border-glitch overflow-hidden"
        style={{ width: GRID_SIZE * 20, height: GRID_SIZE * 20 }}
      >
        <div className="absolute inset-0 opacity-20" 
             style={{ 
               backgroundImage: 'linear-gradient(var(--color-cyan) 1px, transparent 1px), linear-gradient(90deg, var(--color-cyan) 1px, transparent 1px)',
               backgroundSize: '20px 20px'
             }} 
        />

        {snake.map((segment, i) => (
          <div
            key={`${i}-${segment.x}-${segment.y}`}
            className="absolute w-[20px] h-[20px]"
            style={{ 
              left: segment.x * 20, 
              top: segment.y * 20,
              backgroundColor: i === 0 ? 'var(--color-yellow)' : (i % 2 === 0 ? 'var(--color-cyan)' : 'var(--color-magenta)'),
              zIndex: snake.length - i
            }}
          />
        ))}

        <div
          className="absolute w-[20px] h-[20px] bg-magenta animate-ping"
          style={{ left: food.x * 20, top: food.y * 20 }}
        />

        {(gameOver || isPaused) && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-50 border-4 border-magenta">
            {gameOver ? (
              <>
                <h3 className="text-4xl text-magenta mb-4 glitch-tear" data-text="FATAL_EXCEPTION">FATAL_EXCEPTION</h3>
                <button
                  onClick={resetGame}
                  className="px-6 py-2 bg-cyan text-black text-2xl font-bold hover:bg-magenta hover:text-white uppercase transition-colors"
                >
                  [ REBOOT ]
                </button>
              </>
            ) : (
              <>
                <h3 className="text-4xl text-cyan mb-4 glitch-tear" data-text="PROCESS_HALTED">PROCESS_HALTED</h3>
                <button
                  onClick={() => setIsPaused(false)}
                  className="px-6 py-2 bg-magenta text-black text-2xl font-bold hover:bg-cyan hover:text-white uppercase transition-colors"
                >
                  [ OVERRIDE ]
                </button>
                <p className="mt-4 text-lg text-yellow animate-pulse">AWAITING INPUT...</p>
              </>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 text-cyan text-lg">
        INPUT_VECTOR: ARROWS | INTERRUPT: SPACE
      </div>
    </div>
  );
};

