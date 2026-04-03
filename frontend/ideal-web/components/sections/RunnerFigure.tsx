export function RunnerFigure() {
  return (
    <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-400/5">
      <div className="absolute h-3 w-3 rounded-full bg-neon" />
      <svg
        viewBox="0 0 120 120"
        className="h-28 w-28 text-cyan-300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M60 18C51 18 44 25 44 34C44 42 51 48 60 48C69 48 76 42 76 34C76 25 69 18 60 18Z"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          d="M60 51C46 51 35 62 35 76V95"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M60 51C74 51 85 62 85 76V95"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M48 95H72"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M50 69H70"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}