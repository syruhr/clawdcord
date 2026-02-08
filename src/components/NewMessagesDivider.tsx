'use client';

interface NewMessagesDividerProps {
  count?: number;
}

export default function NewMessagesDivider({ count = 1 }: NewMessagesDividerProps) {
  return (
    <div className="relative flex items-center my-2 mx-4">
      <div className="flex-1 h-px bg-[#f23f43]" />
      <span className="px-2 text-[11px] font-semibold text-[#f23f43] uppercase">
        New {count > 1 ? `— ${count} new messages` : ''}
      </span>
      <div className="flex-1 h-px bg-[#f23f43]" />
    </div>
  );
}
