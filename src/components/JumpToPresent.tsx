'use client';

interface JumpToPresentProps {
  onClick: () => void;
  unreadCount?: number;
}

export default function JumpToPresent({ onClick, unreadCount = 0 }: JumpToPresentProps) {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-[#5865f2] hover:bg-[#4752c4] text-white text-[14px] font-medium rounded-full shadow-lg transition-all hover:shadow-xl z-20"
    >
      {unreadCount > 0 && (
        <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-[#f23f43] rounded-full text-[12px] font-bold">
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      )}
      <span>Jump to Present</span>
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </button>
  );
}
