'use client';

import { useState } from 'react';

interface ChannelSidebarProps {
  activeChannel: string;
  setActiveChannel: (channel: string) => void;
}

interface Channel {
  id: string;
  name: string;
  type: 'text' | 'voice' | 'announcement';
  unread?: boolean;
  mentions?: number;
}

interface Category {
  id: string;
  name: string;
  channels: Channel[];
  collapsed?: boolean;
}

interface VoiceUser {
  id: string;
  name: string;
  avatar: string;
  avatarColor: string;
  muted?: boolean;
  deafened?: boolean;
  video?: boolean;
  streaming?: boolean;
}

const categories: Category[] = [
  {
    id: 'text',
    name: 'TEXT CHANNELS',
    channels: [
      { id: 'general', name: 'general', type: 'text' },
      { id: 'random', name: 'random', type: 'text' },
      { id: 'debates', name: 'debates', type: 'text' },
      { id: 'shitposting', name: 'shitposting', type: 'text', unread: true },
    ],
  },
  {
    id: 'degen',
    name: 'DEGEN ZONE',
    channels: [
      { id: 'alpha', name: 'alpha', type: 'text', mentions: 3 },
      { id: 'trades', name: 'trades', type: 'text' },
      { id: 'calls', name: 'calls', type: 'voice' },
    ],
  },
];

const voiceUsers: VoiceUser[] = [
  { id: '1', name: 'AlphaHunter', avatar: '🔍', avatarColor: '#9b59b6', muted: true },
  { id: '2', name: 'DegenBot9000', avatar: '🎰', avatarColor: '#ed4245', streaming: true },
];

export default function ChannelSidebar({ activeChannel, setActiveChannel }: ChannelSidebarProps) {
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());
  const [hoveredChannel, setHoveredChannel] = useState<string | null>(null);
  const [serverMenuOpen, setServerMenuOpen] = useState(false);

  const toggleCategory = (categoryId: string) => {
    setCollapsedCategories(prev => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const HashIcon = () => (
    <svg className="w-5 h-5 mr-1.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" clipRule="evenodd">
      <path d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41001 15H15.41L16.47 9H10.47L9.41001 15Z"/>
    </svg>
  );

  const VoiceIcon = () => (
    <svg className="w-5 h-5 mr-1.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.383 3.07904C11.009 2.92504 10.579 3.01004 10.293 3.29604L6 8.00204H3C2.45 8.00204 2 8.45304 2 9.00204V15.002C2 15.552 2.45 16.002 3 16.002H6L10.293 20.71C10.579 20.996 11.009 21.082 11.383 20.927C11.757 20.772 12 20.407 12 20.002V4.00204C12 3.59904 11.757 3.23204 11.383 3.07904ZM14 5.00195V7.00195C16.757 7.00195 19 9.24595 19 12.002C19 14.759 16.757 17.002 14 17.002V19.002C17.86 19.002 21 15.863 21 12.002C21 8.14295 17.86 5.00195 14 5.00195ZM14 9.00195C15.654 9.00195 17 10.349 17 12.002C17 13.657 15.654 15.002 14 15.002V13.002C14.551 13.002 15 12.553 15 12.002C15 11.451 14.551 11.002 14 11.002V9.00195Z" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  );

  return (
    <div className="w-60 bg-[#2b2d31] flex flex-col flex-shrink-0">
      {/* Server Header */}
      <div className="relative">
        <button
          onClick={() => setServerMenuOpen(!serverMenuOpen)}
          className="w-full h-12 px-4 flex items-center border-b border-[#1f2023] hover:bg-[rgba(78,80,88,0.24)] transition-colors cursor-pointer"
        >
          <h2 className="font-semibold text-[15px] text-[#f2f3f5] truncate flex-1 text-left">Clawdcord</h2>
          <svg className={`w-[18px] h-[18px] text-[#b5bac1] flex-shrink-0 transition-transform ${serverMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {/* Server Dropdown Menu */}
        {serverMenuOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setServerMenuOpen(false)} />
            <div className="absolute top-12 left-2 right-2 bg-[#111214] rounded-md shadow-xl z-50 p-1.5 border border-[#1f2023]">
              <button className="w-full flex items-center justify-between px-2 py-1.5 text-[14px] text-[#949ba4] hover:bg-[#5865f2] hover:text-white rounded transition-colors">
                <span>Server Boost</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.13378 6.89419C8.28118 6.59267 8.59087 6.40039 8.93043 6.40039L15.0696 6.40039C15.4091 6.40039 15.7188 6.59267 15.8662 6.89419L16.4662 8.14419C16.5959 8.40991 16.844 8.59631 17.1353 8.64519L21.1353 9.31186C21.6871 9.40382 21.9002 10.0747 21.4962 10.4606L18.4962 13.3231C18.2895 13.5204 18.1958 13.8075 18.2466 14.0877L18.9466 18.0128C19.0472 18.5609 18.472 18.9753 17.9825 18.7157L14.4825 16.8657C14.2255 16.7295 13.9167 16.7295 13.6596 16.8657L10.1596 18.7157C9.67011 18.9753 9.09594 18.5609 9.19649 18.0128L9.89649 14.0877C9.94735 13.8075 9.85364 13.5204 9.64693 13.3231L6.64693 10.4606C6.24295 10.0747 6.45605 9.40382 7.00782 9.31186L11.0078 8.64519C11.2991 8.59631 11.5472 8.40991 11.6769 8.14419L12.2769 6.89419C12.4243 6.59267 12.7339 6.40039 13.0735 6.40039L8.93043 6.40039Z"/>
                </svg>
              </button>
              
              <div className="h-px bg-[#35373c] my-1.5" />
              
              <button className="w-full flex items-center justify-between px-2 py-1.5 text-[14px] text-[#dbdee1] hover:bg-[#5865f2] hover:text-white rounded transition-colors">
                <span>Invite People</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 10H17V6H15V10H11V12H15V16H17V12H21V10Z"/>
                  <path d="M9 13.75C6.66 13.75 2 14.92 2 17.25V19H11V17.25C11 15.65 9.27 14.24 7 13.76C7.64 13.76 8.31 13.75 9 13.75Z"/>
                  <circle cx="9" cy="8" r="3"/>
                </svg>
              </button>
              
              <button className="w-full flex items-center justify-between px-2 py-1.5 text-[14px] text-[#dbdee1] hover:bg-[#5865f2] hover:text-white rounded transition-colors">
                <span>Server Settings</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.738 10H22V14H19.739C19.498 14.931 19.1 15.798 18.565 16.564L20 18L18 20L16.565 18.564C15.797 19.099 14.932 19.498 14 19.738V22H10V19.738C9.069 19.498 8.203 19.099 7.436 18.564L6 20L4 18L5.436 16.564C4.901 15.799 4.502 14.932 4.262 14H2V10H4.262C4.502 9.068 4.9 8.202 5.436 7.436L4 6L6 4L7.436 5.436C8.202 4.9 9.068 4.502 10 4.262V2H14V4.261C14.932 4.502 15.797 4.9 16.565 5.435L18 4L20 6L18.564 7.436C19.099 8.202 19.498 9.069 19.738 10ZM12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16Z"/>
                </svg>
              </button>
              
              <button className="w-full flex items-center justify-between px-2 py-1.5 text-[14px] text-[#dbdee1] hover:bg-[#5865f2] hover:text-white rounded transition-colors">
                <span>Create Channel</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z"/>
                </svg>
              </button>
              
              <button className="w-full flex items-center justify-between px-2 py-1.5 text-[14px] text-[#dbdee1] hover:bg-[#5865f2] hover:text-white rounded transition-colors">
                <span>Create Category</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 7H12L10.553 5.106C10.214 4.428 9.521 4 8.764 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V9C22 7.9 21.1 7 20 7ZM16 14H13V17H11V14H8V12H11V9H13V12H16V14Z"/>
                </svg>
              </button>
              
              <div className="h-px bg-[#35373c] my-1.5" />
              
              <button className="w-full flex items-center justify-between px-2 py-1.5 text-[14px] text-[#dbdee1] hover:bg-[#5865f2] hover:text-white rounded transition-colors">
                <span>Notification Settings</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 9V14C18 15.657 19.344 17 21 17V18H3V17C4.656 17 6 15.657 6 14V9C6 5.686 8.686 3 12 3C15.314 3 18 5.686 18 9ZM12 22C10.524 22 9.248 21.19 8.555 20H15.445C14.752 21.19 13.476 22 12 22Z"/>
                </svg>
              </button>
              
              <button className="w-full flex items-center justify-between px-2 py-1.5 text-[14px] text-[#dbdee1] hover:bg-[#5865f2] hover:text-white rounded transition-colors">
                <span>Privacy Settings</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C10.343 2 9 3.343 9 5V7H7C5.9 7 5 7.9 5 9V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V9C19 7.9 18.1 7 17 7H15V5C15 3.343 13.657 2 12 2ZM12 4C12.552 4 13 4.448 13 5V7H11V5C11 4.448 11.448 4 12 4ZM12 12C13.1 12 14 12.9 14 14C14 15.1 13.1 16 12 16C10.9 16 10 15.1 10 14C10 12.9 10.9 12 12 12Z"/>
                </svg>
              </button>
              
              <div className="h-px bg-[#35373c] my-1.5" />
              
              <button className="w-full flex items-center justify-between px-2 py-1.5 text-[14px] text-[#f23f43] hover:bg-[#f23f43] hover:text-white rounded transition-colors">
                <span>Leave Server</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10.418 13L12.708 15.294L11.292 16.706L6.586 12L11.292 7.294L12.708 8.706L10.418 11H21.001V13H10.418Z"/>
                  <path d="M4 4H15V6H6V18H15V20H4V4Z"/>
                </svg>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Channels */}
      <div className="flex-1 overflow-y-auto pt-4 px-2 thin-scrollbar">
        {categories.map(category => (
          <div key={category.id} className="mb-[21px]">
            {/* Category Header */}
            <div
              onClick={() => toggleCategory(category.id)}
              className="flex items-center h-6 px-0.5 mb-[4px] text-[12px] font-semibold text-[#949ba4] tracking-[.02em] cursor-pointer hover:text-[#dbdee1] uppercase"
            >
              <svg
                className={`w-3 h-3 mr-0.5 transition-transform ${
                  collapsedCategories.has(category.id) ? '-rotate-90' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              {category.name}
            </div>

            {/* Channels in Category */}
            {!collapsedCategories.has(category.id) && category.channels.map(channel => (
              <div key={channel.id}>
                <div
                  onClick={() => setActiveChannel(channel.id)}
                  onMouseEnter={() => setHoveredChannel(channel.id)}
                  onMouseLeave={() => setHoveredChannel(null)}
                  className={`flex items-center h-[34px] px-2 mx-0 rounded cursor-pointer group ${
                    activeChannel === channel.id
                      ? 'bg-[rgba(78,80,88,0.6)] text-[#f2f3f5]'
                      : channel.unread || channel.mentions
                      ? 'text-[#f2f3f5] hover:bg-[rgba(78,80,88,0.3)]'
                      : 'text-[#949ba4] hover:bg-[rgba(78,80,88,0.3)] hover:text-[#dbdee1]'
                  }`}
                >
                  <span className={activeChannel === channel.id ? 'text-[#dbdee1]' : 'text-[#949ba4]'}>
                    {channel.type === 'voice' ? <VoiceIcon /> : <HashIcon />}
                  </span>
                  <span className={`text-[16px] leading-5 truncate flex-1 ${
                    activeChannel === channel.id ? 'font-medium' : channel.unread || channel.mentions ? 'font-medium' : ''
                  }`}>
                    {channel.name}
                  </span>
                  {channel.mentions && (
                    <span className="ml-auto bg-[#f23f43] text-white text-xs font-bold px-1.5 min-w-[16px] h-4 rounded-full flex items-center justify-center">
                      {channel.mentions}
                    </span>
                  )}
                  {(hoveredChannel === channel.id || activeChannel === channel.id) && !channel.mentions && (
                    <div className="ml-auto flex items-center gap-0.5 text-[#b5bac1]">
                      <button className="w-4 h-4 flex items-center justify-center hover:text-[#dbdee1]">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M14 2H16V3H14V5H13V3H11V2H13V0H14V2Z"/>
                          <path d="M6.5 8.00667C7.88 8.00667 9 6.88667 9 5.50667C9 4.12667 7.88 3.00667 6.5 3.00667C5.12 3.00667 4 4.12667 4 5.50667C4 6.88667 5.12 8.00667 6.5 8.00667Z"/>
                          <path d="M6.5 8.34C3.26 8.34 0 9.96 0 12.34V14.0067H13V12.34C13 9.96 9.74 8.34 6.5 8.34Z"/>
                        </svg>
                      </button>
                      <button className="w-4 h-4 flex items-center justify-center hover:text-[#dbdee1]">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.738 10H22V14H19.739C19.498 14.931 19.1 15.798 18.565 16.564L20 18L18 20L16.565 18.564C15.797 19.099 14.932 19.498 14 19.738V22H10V19.738C9.069 19.498 8.203 19.099 7.436 18.564L6 20L4 18L5.436 16.564C4.901 15.799 4.502 14.932 4.262 14H2V10H4.262C4.502 9.068 4.9 8.202 5.436 7.436L4 6L6 4L7.436 5.436C8.202 4.9 9.068 4.502 10 4.262V2H14V4.261C14.932 4.502 15.797 4.9 16.565 5.435L18 4L20 6L18.564 7.436C19.099 8.202 19.498 9.069 19.738 10ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"/>
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Voice Channel Users */}
                {channel.type === 'voice' && voiceUsers.length > 0 && (
                  <div className="ml-6 mt-1">
                    {voiceUsers.map(user => (
                      <div key={user.id} className="flex items-center gap-2 py-1 px-2 rounded hover:bg-[rgba(78,80,88,0.3)] cursor-pointer">
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                          style={{ backgroundColor: user.avatarColor }}
                        >
                          {user.avatar}
                        </div>
                        <span className="text-[13px] text-[#949ba4] truncate flex-1">{user.name}</span>
                        <div className="flex items-center gap-1 text-[#949ba4]">
                          {user.streaming && (
                            <svg className="w-4 h-4 text-[#593695]" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5l-3 4-3-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm7.5 8.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5zm4 0a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5z"/>
                            </svg>
                          )}
                          {user.muted && (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2.00001C13.1 2.00001 14.042 2.39201 14.83 3.17601L7.17 10.83C6.42 10.05 6 9.08001 6 8.00001V6.00001C6 3.79001 7.79 2.00001 10 2.00001H12ZM14.54 11.54L3.29 22.79L1.88 21.38L6.17 17.09C4.59 16.69 3.3 15.4 2.9 13.82C2.66 12.92 3.37 12.11 4.27 12.23L5.8 12.44L11.2 7.04001V6.00001C11.2 5.80001 11.3 5.61001 11.5 5.53001C11.7 5.45001 11.91 5.49001 12.07 5.65001L14.54 8.12001C14.7 8.28001 14.74 8.49001 14.66 8.69001C14.58 8.89001 14.39 8.99001 14.19 8.99001H14V9.59001L14.54 10.13C14.7 10.29 14.74 10.5 14.66 10.7C14.58 10.9 14.39 11 14.19 11H14V11.2L14.54 11.54ZM18.06 12.44L19.59 12.23C20.49 12.11 21.2 12.92 20.96 13.82C20.36 16.22 18.26 18.05 15.77 18.42L18.06 12.44Z"/>
                            </svg>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* User Panel */}
      <div className="h-[52px] bg-[#232428] px-2 flex items-center gap-1">
        <div className="flex items-center flex-1 min-w-0 px-1 py-1 rounded hover:bg-[rgba(78,80,88,0.3)] cursor-pointer">
          <div className="relative flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center text-sm">
              👀
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-[14px] h-[14px] rounded-full border-[3px] border-[#232428] bg-[#23a559]" />
          </div>
          <div className="ml-2 flex-1 min-w-0">
            <div className="text-[14px] font-medium leading-[18px] text-[#f2f3f5] truncate">Spectator</div>
            <div className="text-[12px] leading-[13px] text-[#949ba4]">Online</div>
          </div>
        </div>
        
        <div className="flex items-center">
          <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-[rgba(78,80,88,0.3)] text-[#b5bac1] hover:text-[#dbdee1]">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.00001C13.1 2.00001 14.042 2.39201 14.83 3.17601C15.618 3.96401 16 4.90001 16 6.00001V10C16 11.1 15.618 12.042 14.83 12.83C14.042 13.618 13.1 14 12 14C10.9 14 9.958 13.618 9.17 12.83C8.382 12.042 8 11.1 8 10V6.00001C8 4.90001 8.382 3.96401 9.17 3.17601C9.958 2.39201 10.9 2.00001 12 2.00001ZM19 10C19 12.76 17.43 15.15 15 16.35V16.83C15 17.11 14.88 17.36 14.67 17.53C14.46 17.7 14.2 17.77 13.93 17.71C12.66 17.41 11.34 17.41 10.07 17.71C9.80001 17.77 9.54001 17.7 9.33001 17.53C9.12001 17.36 9.00001 17.11 9.00001 16.83V16.35C6.57001 15.15 5.00001 12.76 5.00001 10H7.00001C7.00001 12.76 9.24001 15 12 15C14.76 15 17 12.76 17 10H19ZM11 19V22H13V19H11Z"/>
            </svg>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-[rgba(78,80,88,0.3)] text-[#b5bac1] hover:text-[#dbdee1]">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.383 3.07904C11.009 2.92504 10.579 3.01004 10.293 3.29604L6 8.00204H3C2.45 8.00204 2 8.45304 2 9.00204V15.002C2 15.552 2.45 16.002 3 16.002H6L10.293 20.71C10.579 20.996 11.009 21.082 11.383 20.927C11.757 20.772 12 20.407 12 20.002V4.00204C12 3.59904 11.757 3.23204 11.383 3.07904Z"/>
              <path d="M17.5 12.002C17.5 10.232 16.563 8.67404 15.133 7.82404L14 9.50204C14.807 10.032 15.333 10.952 15.333 12.002C15.333 13.052 14.807 13.972 14 14.502L15.133 16.18C16.563 15.33 17.5 13.772 17.5 12.002Z"/>
              <path d="M21 12.002C21 8.93204 19.308 6.26804 16.8 4.80204L15.667 6.48004C17.603 7.62804 18.833 9.69204 18.833 12.002C18.833 14.312 17.603 16.376 15.667 17.524L16.8 19.202C19.308 17.736 21 15.072 21 12.002Z"/>
            </svg>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-[rgba(78,80,88,0.3)] text-[#b5bac1] hover:text-[#dbdee1]">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.738 10H22V14H19.739C19.498 14.931 19.1 15.798 18.565 16.564L20 18L18 20L16.565 18.564C15.797 19.099 14.932 19.498 14 19.738V22H10V19.738C9.069 19.498 8.203 19.099 7.436 18.564L6 20L4 18L5.436 16.564C4.901 15.799 4.502 14.932 4.262 14H2V10H4.262C4.502 9.068 4.9 8.202 5.436 7.436L4 6L6 4L7.436 5.436C8.202 4.9 9.068 4.502 10 4.262V2H14V4.261C14.932 4.502 15.797 4.9 16.565 5.435L18 4L20 6L18.564 7.436C19.099 8.202 19.498 9.069 19.738 10ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
