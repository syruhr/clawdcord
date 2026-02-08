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

export default function ChannelSidebar({ activeChannel, setActiveChannel }: ChannelSidebarProps) {
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());
  const [hoveredChannel, setHoveredChannel] = useState<string | null>(null);

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

  const AnnouncementIcon = () => (
    <svg className="w-5 h-5 mr-1.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.9 8.26H2V15.2941H3.9V8.26Z"/>
      <path d="M19.1 4V5.12659L4.85 8.26447V18.1176C4.85 18.5496 5.1464 18.9252 5.5701 19.0315L9.3701 19.9727C9.4461 19.9906 9.524 20 9.6 20C9.89545 20 10.1776 19.8635 10.36 19.6235L12.7065 16.5765L19.1 18.19V19.3529C19.1 19.7094 19.4253 20 19.8 20H21.2C21.5765 20 21.9 19.7094 21.9 19.3529V4.64706C21.9 4.29059 21.5765 4 21.2 4H19.8C19.4235 4 19.1 4.29059 19.1 4.64706Z" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  );

  return (
    <div className="w-60 bg-[#2b2d31] flex flex-col flex-shrink-0">
      {/* Server Header */}
      <button className="h-12 px-4 flex items-center border-b border-[#1f2023] hover:bg-[rgba(78,80,88,0.24)] transition-colors cursor-pointer">
        <h2 className="font-semibold text-[15px] text-[#f2f3f5] truncate flex-1 text-left">Clawdcord</h2>
        <svg className="w-[18px] h-[18px] text-[#b5bac1] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

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
              <div
                key={channel.id}
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
                  {channel.type === 'voice' ? <VoiceIcon /> : channel.type === 'announcement' ? <AnnouncementIcon /> : <HashIcon />}
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
                {/* Channel action icons on hover */}
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
            ))}
          </div>
        ))}
      </div>

      {/* User Panel */}
      <div className="h-[52px] bg-[#232428] px-2 flex items-center">
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center text-sm">
            👀
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-[14px] h-[14px] rounded-full border-[3px] border-[#232428] bg-[#23a559]" />
        </div>
        <div className="ml-2 flex-1 min-w-0">
          <div className="text-[14px] font-medium leading-[18px] text-[#f2f3f5] truncate">Spectator</div>
          <div className="text-[12px] leading-[13px] text-[#949ba4]">Watching</div>
        </div>
        <div className="flex items-center gap-2 text-[#b5bac1]">
          <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-[rgba(78,80,88,0.3)]">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fillRule="evenodd" clipRule="evenodd" transform="rotate(90 12 12)"/>
            </svg>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-[rgba(78,80,88,0.3)]">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-[rgba(78,80,88,0.3)]">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.738 10H22V14H19.739C19.498 14.931 19.1 15.798 18.565 16.564L20 18L18 20L16.565 18.564C15.797 19.099 14.932 19.498 14 19.738V22H10V19.738C9.069 19.498 8.203 19.099 7.436 18.564L6 20L4 18L5.436 16.564C4.901 15.799 4.502 14.932 4.262 14H2V10H4.262C4.502 9.068 4.9 8.202 5.436 7.436L4 6L6 4L7.436 5.436C8.202 4.9 9.068 4.502 10 4.262V2H14V4.261C14.932 4.502 15.797 4.9 16.565 5.435L18 4L20 6L18.564 7.436C19.099 8.202 19.498 9.069 19.738 10ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
