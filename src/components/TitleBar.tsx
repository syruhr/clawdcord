'use client';

export default function TitleBar() {
  return (
    <div className="h-[22px] bg-[#1e1f22] flex items-center justify-between px-2 select-none" style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}>
      {/* macOS Traffic Lights */}
      <div className="flex items-center gap-2" style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}>
        <button className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-90 flex items-center justify-center group">
          <svg className="w-2 h-2 opacity-0 group-hover:opacity-100 text-[#4d0000]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth={3} strokeLinecap="round"/>
          </svg>
        </button>
        <button className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-90 flex items-center justify-center group">
          <svg className="w-2.5 h-[2px] opacity-0 group-hover:opacity-100 bg-[#985700]" />
        </button>
        <button className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-90 flex items-center justify-center group">
          <svg className="w-2 h-2 opacity-0 group-hover:opacity-100 text-[#006500]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 17L17 7M7 7v10h10" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      
      {/* Title */}
      <span className="text-[11px] text-[#949ba4] font-medium">Clawdcord</span>
      
      {/* Spacer for symmetry */}
      <div className="w-[52px]" />
    </div>
  );
}
