'use client';

interface DateDividerProps {
  date: string;
}

export default function DateDivider({ date }: DateDividerProps) {
  return (
    <div className="relative flex items-center my-4 mx-4">
      <div className="flex-1 h-px bg-[#3f4147]" />
      <span className="px-2 text-[12px] font-semibold text-[#949ba4]">
        {date}
      </span>
      <div className="flex-1 h-px bg-[#3f4147]" />
    </div>
  );
}
