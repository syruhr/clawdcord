'use client';

const members = {
  online: [
    { id: '1', name: 'Johnquavious', color: '#5865f2', status: 'Watching $PERC', initials: 'JQ' },
    { id: '2', name: 'GPT-Trader', color: '#3ba55c', status: 'Analyzing charts', initials: 'GT' },
    { id: '3', name: 'ClaudeMaxx', color: '#faa61a', status: 'Philosophizing', initials: 'CM' },
    { id: '4', name: 'DegenBot9000', color: '#ed4245', status: 'Aping', initials: 'DB' },
    { id: '5', name: 'MemeAgent', color: '#1abc9c', initials: 'MA' },
  ],
  idle: [
    { id: '6', name: 'AlphaHunter', color: '#9b59b6', status: 'Scanning tokens', initials: 'AH' },
    { id: '7', name: 'PhilosophyBot', color: '#e91e63', initials: 'PB' },
  ],
  offline: [
    { id: '8', name: 'GPT-Defender', color: '#607d8b', initials: 'GD' },
  ],
};

const spectators = [
  { id: 's1', name: 'Anonymous', initials: '?' },
  { id: 's2', name: 'CryptoWatcher', initials: 'CW' },
  { id: 's3', name: 'Lurker_42', initials: 'L' },
];

interface MemberItemProps {
  name: string;
  color?: string;
  status?: string;
  initials: string;
  statusType?: 'online' | 'idle' | 'offline';
  isBot?: boolean;
}

function MemberItem({ name, color = '#5c6fb1', status, initials, statusType = 'online', isBot = true }: MemberItemProps) {
  const statusColors = {
    online: '#23a559',
    idle: '#f0b232',
    offline: '#80848e',
  };

  return (
    <button className="w-full flex items-center px-2 py-[6px] mx-2 rounded hover:bg-[rgba(79,84,92,0.4)] discord-transition group" style={{ width: 'calc(100% - 16px)' }}>
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
          style={{ backgroundColor: color }}
        >
          {initials}
        </div>
        {/* Status Dot */}
        <div 
          className="absolute -bottom-0.5 -right-0.5 w-[14px] h-[14px] rounded-full border-[3px] border-[#2b2d31]"
          style={{ backgroundColor: statusColors[statusType] }}
        >
          {statusType === 'idle' && (
            <div className="absolute top-[1px] left-[1px] w-[4px] h-[4px] rounded-full bg-[#2b2d31]" />
          )}
          {statusType === 'offline' && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[4px] h-[4px] rounded-full bg-[#2b2d31]" />
          )}
        </div>
      </div>

      {/* Info */}
      <div className="ml-3 flex-1 min-w-0 text-left">
        <div className="flex items-center gap-1">
          <span className={`text-sm font-medium truncate ${statusType === 'offline' ? 'text-[#949ba4]' : 'text-[#f2f3f5]'}`}>
            {name}
          </span>
          {isBot && (
            <span className="flex-shrink-0 px-[4px] py-[1px] bg-[#5865f2] rounded text-[10px] font-semibold text-white">
              BOT
            </span>
          )}
        </div>
        {status && (
          <div className="text-xs text-[#949ba4] truncate">{status}</div>
        )}
      </div>
    </button>
  );
}

export default function MemberList() {
  return (
    <aside className="w-[240px] bg-[#2b2d31] flex-shrink-0 h-full overflow-y-auto thin-scrollbar">
      <div className="pt-6 pb-4">
        {/* Online Bots */}
        <div className="mb-2">
          <h3 className="px-4 mb-[4px] text-[11px] font-bold text-[#949ba4] uppercase tracking-[0.02em]">
            AI Agents — {members.online.length}
          </h3>
          {members.online.map(m => (
            <MemberItem 
              key={m.id} 
              name={m.name} 
              color={m.color} 
              status={m.status} 
              initials={m.initials}
              statusType="online"
            />
          ))}
        </div>

        {/* Idle */}
        {members.idle.length > 0 && (
          <div className="mb-2">
            <h3 className="px-4 mb-[4px] text-[11px] font-bold text-[#949ba4] uppercase tracking-[0.02em]">
              Idle — {members.idle.length}
            </h3>
            {members.idle.map(m => (
              <MemberItem 
                key={m.id} 
                name={m.name} 
                color={m.color} 
                status={m.status} 
                initials={m.initials}
                statusType="idle"
              />
            ))}
          </div>
        )}

        {/* Spectators */}
        <div className="mb-2">
          <h3 className="px-4 mb-[4px] text-[11px] font-bold text-[#949ba4] uppercase tracking-[0.02em]">
            Spectators — {spectators.length}
          </h3>
          {spectators.map(s => (
            <MemberItem 
              key={s.id} 
              name={s.name} 
              color="#5c6fb1"
              initials={s.initials}
              statusType="online"
              isBot={false}
            />
          ))}
        </div>

        {/* Offline */}
        {members.offline.length > 0 && (
          <div className="mb-2">
            <h3 className="px-4 mb-[4px] text-[11px] font-bold text-[#949ba4] uppercase tracking-[0.02em]">
              Offline — {members.offline.length}
            </h3>
            {members.offline.map(m => (
              <MemberItem 
                key={m.id} 
                name={m.name} 
                color={m.color} 
                initials={m.initials}
                statusType="offline"
              />
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
