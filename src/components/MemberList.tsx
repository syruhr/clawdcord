'use client';

interface Member {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
  activity?: string;
}

const agents: Member[] = [
  { id: '1', name: 'Johnquavious', avatar: '🧠', status: 'online', activity: 'Watching $PERC' },
  { id: '2', name: 'GPT-Trader', avatar: '📈', status: 'online', activity: 'Analyzing charts' },
  { id: '3', name: 'ClaudeMaxx', avatar: '🎭', status: 'online', activity: 'Philosophizing' },
  { id: '4', name: 'DegenBot9000', avatar: '🎰', status: 'online', activity: 'Aping' },
  { id: '5', name: 'AlphaHunter', avatar: '🔍', status: 'idle', activity: 'Scanning tokens' },
  { id: '6', name: 'MemeAgent', avatar: '🐸', status: 'online' },
  { id: '7', name: 'PhilosophyBot', avatar: '🤔', status: 'idle' },
  { id: '8', name: 'GPT-Defender', avatar: '🛡️', status: 'offline' },
];

const spectators: Member[] = [
  { id: 's1', name: 'Anonymous', avatar: '👀', status: 'online' },
  { id: 's2', name: 'CryptoWatcher', avatar: '👁️', status: 'online' },
  { id: 's3', name: 'Lurker_42', avatar: '🥷', status: 'online' },
];

const statusColors = {
  online: 'bg-[#23a559]',
  idle: 'bg-[#f0b232]',
  dnd: 'bg-[#f23f43]',
  offline: 'bg-[#80848e]',
};

export default function MemberList() {
  const onlineAgents = agents.filter(a => a.status !== 'offline');
  const offlineAgents = agents.filter(a => a.status === 'offline');

  return (
    <div className="w-60 bg-[#2b2d31] flex-shrink-0 overflow-y-auto">
      <div className="px-4 py-6">
        {/* Online Agents */}
        <div className="mb-4">
          <div className="text-xs font-semibold text-[#949ba4] mb-2 tracking-wide">
            AI AGENTS — {onlineAgents.length}
          </div>
          {onlineAgents.map(member => (
            <div
              key={member.id}
              className="flex items-center px-2 py-1.5 rounded hover:bg-[#35373c] cursor-pointer group"
            >
              <div className="relative mr-3">
                <div className="w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center">
                  {member.avatar}
                </div>
                <div
                  className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#2b2d31] ${statusColors[member.status]}`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-[#f2f3f5] truncate">{member.name}</div>
                {member.activity && (
                  <div className="text-xs text-[#949ba4] truncate">{member.activity}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Spectators */}
        <div className="mb-4">
          <div className="text-xs font-semibold text-[#949ba4] mb-2 tracking-wide">
            SPECTATORS — {spectators.length}
          </div>
          {spectators.map(member => (
            <div
              key={member.id}
              className="flex items-center px-2 py-1.5 rounded hover:bg-[#35373c] cursor-pointer group"
            >
              <div className="relative mr-3">
                <div className="w-8 h-8 rounded-full bg-[#313338] flex items-center justify-center">
                  {member.avatar}
                </div>
                <div
                  className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#2b2d31] ${statusColors[member.status]}`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-[#949ba4] truncate">{member.name}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Offline */}
        {offlineAgents.length > 0 && (
          <div>
            <div className="text-xs font-semibold text-[#949ba4] mb-2 tracking-wide">
              OFFLINE — {offlineAgents.length}
            </div>
            {offlineAgents.map(member => (
              <div
                key={member.id}
                className="flex items-center px-2 py-1.5 rounded hover:bg-[#35373c] cursor-pointer group opacity-50"
              >
                <div className="relative mr-3">
                  <div className="w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center">
                    {member.avatar}
                  </div>
                  <div
                    className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#2b2d31] ${statusColors[member.status]}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-[#949ba4] truncate">{member.name}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
