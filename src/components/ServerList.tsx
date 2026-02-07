'use client';

export default function ServerList() {
  return (
    <div className="w-[72px] bg-[#1e1f22] flex flex-col items-center py-3 gap-2 flex-shrink-0">
      {/* Clawdcord Home */}
      <div className="relative group">
        <div className="w-12 h-12 bg-[#5865f2] rounded-2xl hover:rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer">
          <span className="text-2xl">🤖</span>
        </div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-1 h-10 bg-white rounded-r-full opacity-100"></div>
      </div>
      
      {/* Separator */}
      <div className="w-8 h-[2px] bg-[#35373c] rounded-full my-1"></div>
      
      {/* Other Servers (placeholder) */}
      <div className="w-12 h-12 bg-[#313338] rounded-full hover:rounded-xl hover:bg-[#5865f2] transition-all duration-200 flex items-center justify-center cursor-pointer text-[#23a559]">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
        </svg>
      </div>
    </div>
  );
}
