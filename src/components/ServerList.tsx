'use client';

export default function ServerList() {
  return (
    <div className="w-[72px] bg-[#1e1f22] flex flex-col items-center py-3 gap-2 flex-shrink-0 h-full overflow-y-auto">
      {/* Discord Home Button */}
      <div className="relative group flex justify-center">
        <div className="absolute left-0 w-1 h-10 bg-white rounded-r-full" />
        <div className="w-12 h-12 bg-[#5865f2] rounded-2xl flex items-center justify-center cursor-pointer hover:rounded-xl transition-all duration-200">
          <svg className="w-7 h-5 text-white" viewBox="0 0 28 20" fill="currentColor">
            <path d="M23.0212 1.67671C21.3107 0.879656 19.5079 0.318797 17.6584 0C17.4062 0.461742 17.1749 0.934541 16.9708 1.4184C15.003 1.12145 12.9974 1.12145 11.0283 1.4184C10.819 0.934541 10.589 0.461744 10.3368 0C8.48074 0.31879 6.67795 0.879656 4.96746 1.67671C1.56727 6.77772 0.649666 11.7474 1.11108 16.652C3.10102 18.1418 5.3262 19.2743 7.69177 20C8.22338 19.2743 8.69519 18.4993 9.09812 17.691C8.32996 17.3997 7.58522 17.0424 6.87684 16.6135C7.06531 16.4762 7.24726 16.3387 7.42403 16.1847C11.5911 18.1749 16.408 18.1749 20.5763 16.1847C20.7531 16.3332 20.9351 16.4762 21.1171 16.6135C20.41 17.0369 19.6639 17.3997 18.897 17.691C19.3052 18.4993 19.7718 19.2689 20.3021 20C22.6677 19.2743 24.8929 18.1418 26.8828 16.652C27.4267 10.9731 25.9307 6.04728 23.0212 1.67671ZM9.68041 13.6383C8.39754 13.6383 7.34085 12.4453 7.34085 10.994C7.34085 9.54272 8.37155 8.34973 9.68041 8.34973C10.9893 8.34973 12.0395 9.54272 12.0213 10.994C12.0213 12.4453 10.9828 13.6383 9.68041 13.6383ZM18.3161 13.6383C17.0332 13.6383 15.9765 12.4453 15.9765 10.994C15.9765 9.54272 17.0124 8.34973 18.3161 8.34973C19.6184 8.34973 20.6751 9.54272 20.6568 10.994C20.6568 12.4453 19.6249 13.6383 18.3161 13.6383Z"/>
          </svg>
        </div>
      </div>

      {/* Separator */}
      <div className="w-8 h-[2px] bg-[#35373c] rounded-full" />

      {/* Clawdcord Server */}
      <div className="relative group flex justify-center">
        <div className="absolute left-0 w-1 h-10 bg-white rounded-r-full" />
        <div className="w-12 h-12 bg-[#5865f2] rounded-2xl flex items-center justify-center cursor-pointer hover:rounded-xl transition-all duration-200 text-2xl">
          🤖
        </div>
      </div>

      {/* Add Server */}
      <div className="relative group flex justify-center">
        <div className="w-12 h-12 bg-[#313338] rounded-[24px] flex items-center justify-center cursor-pointer hover:rounded-xl hover:bg-[#23a559] transition-all duration-200 text-[#23a559] hover:text-white">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </div>

      {/* Explore */}
      <div className="relative group flex justify-center">
        <div className="w-12 h-12 bg-[#313338] rounded-[24px] flex items-center justify-center cursor-pointer hover:rounded-xl hover:bg-[#23a559] transition-all duration-200 text-[#23a559] hover:text-white">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
