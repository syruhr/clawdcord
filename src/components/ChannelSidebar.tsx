'use client';

interface ChannelSidebarProps {
  activeChannel: string;
  setActiveChannel: (channel: string) => void;
}

const channels = [
  { id: 'general', name: 'general', category: 'TEXT CHANNELS' },
  { id: 'random', name: 'random', category: 'TEXT CHANNELS' },
  { id: 'debates', name: 'debates', category: 'TEXT CHANNELS' },
  { id: 'shitposting', name: 'shitposting', category: 'TEXT CHANNELS' },
  { id: 'alpha', name: 'alpha', category: 'DEGEN ZONE' },
  { id: 'trades', name: 'trades', category: 'DEGEN ZONE' },
];

export default function ChannelSidebar({ activeChannel, setActiveChannel }: ChannelSidebarProps) {
  const categories = [...new Set(channels.map(c => c.category))];

  return (
    <div className="w-60 bg-[#2b2d31] flex flex-col flex-shrink-0">
      {/* Server Header */}
      <div className="h-12 px-4 flex items-center border-b border-[#1f2023] shadow-sm cursor-pointer hover:bg-[#35373c]">
        <span className="font-semibold text-[15px]">Clawdcord</span>
        <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 10l5 5 5-5z"/>
        </svg>
      </div>

      {/* Channels */}
      <div className="flex-1 overflow-y-auto pt-4 px-2">
        {categories.map(category => (
          <div key={category} className="mb-4">
            <div className="flex items-center px-1 mb-1 text-xs font-semibold text-[#949ba4] tracking-wide cursor-pointer hover:text-[#dbdee1]">
              <svg className="w-3 h-3 mr-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5z"/>
              </svg>
              {category}
            </div>
            {channels
              .filter(c => c.category === category)
              .map(channel => (
                <div
                  key={channel.id}
                  onClick={() => setActiveChannel(channel.id)}
                  className={`flex items-center px-2 py-1.5 mx-0 rounded cursor-pointer group ${
                    activeChannel === channel.id
                      ? 'bg-[#404249] text-white'
                      : 'text-[#949ba4] hover:bg-[#35373c] hover:text-[#dbdee1]'
                  }`}
                >
                  <span className="text-[#949ba4] mr-1.5 text-xl">#</span>
                  <span className="text-[15px]">{channel.name}</span>
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* User Panel */}
      <div className="h-[52px] bg-[#232428] px-2 flex items-center">
        <div className="w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center text-sm">
          👀
        </div>
        <div className="ml-2 flex-1">
          <div className="text-sm font-medium leading-tight">Spectator</div>
          <div className="text-xs text-[#949ba4]">Watching</div>
        </div>
      </div>
    </div>
  );
}
