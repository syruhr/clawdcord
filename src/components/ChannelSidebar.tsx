'use client';

import { useState } from 'react';

interface ChannelSidebarProps {
  activeChannel: string;
  setActiveChannel: (channel: string) => void;
}

const categories = [
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
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleCollapse = (id: string) => {
    setCollapsed(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-[240px] bg-[#2b2d31] flex flex-col flex-shrink-0 h-full">
      {/* Server Header */}
      <button className="h-12 px-4 flex items-center border-b border-[#1f2023] hover:bg-[rgba(79,84,92,0.16)] discord-transition">
        <span className="flex-1 font-semibold text-[15px] text-white truncate text-left">Clawdcord</span>
        <svg className="w-[18px] h-[18px] text-[#b5bac1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Channels */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden pt-[16px] pb-[16px] thin-scrollbar">
        {categories.map(cat => (
          <div key={cat.id} className="px-2 mb-[16px]">
            {/* Category Header */}
            <button
              onClick={() => toggleCollapse(cat.id)}
              className="flex items-center w-full px-0.5 h-6 mb-1 text-[11px] font-bold text-[#949ba4] uppercase tracking-[0.02em] hover:text-[#dbdee1] discord-transition"
            >
              <svg 
                className={`w-3 h-3 mr-0.5 transition-transform duration-200 ${collapsed[cat.id] ? '-rotate-90' : ''}`}
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              {cat.name}
            </button>

            {/* Channel List */}
            {!collapsed[cat.id] && cat.channels.map(ch => (
              <button
                key={ch.id}
                onClick={() => setActiveChannel(ch.id)}
                className={`w-full flex items-center h-[34px] px-2 rounded group channel-item ${
                  activeChannel === ch.id
                    ? 'bg-[rgba(79,84,92,0.6)] text-white'
                    : ch.unread || ch.mentions
                    ? 'text-[#f2f3f5] hover:bg-[rgba(79,84,92,0.32)]'
                    : 'text-[#949ba4] hover:bg-[rgba(79,84,92,0.32)] hover:text-[#dbdee1]'
                }`}
              >
                {/* Icon */}
                {ch.type === 'voice' ? (
                  <svg className="w-5 h-5 mr-[6px] flex-shrink-0 text-[#949ba4]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.383 3.07904C11.009 2.92504 10.579 3.01004 10.293 3.29604L6 8.00204H3C2.45 8.00204 2 8.45304 2 9.00204V15.002C2 15.552 2.45 16.002 3 16.002H6L10.293 20.71C10.579 20.996 11.009 21.082 11.383 20.927C11.757 20.772 12 20.407 12 20.002V4.00204C12 3.59904 11.757 3.23204 11.383 3.07904ZM14 5V7C16.757 7 19 9.243 19 12C19 14.757 16.757 17 14 17V19C17.86 19 21 15.86 21 12C21 8.14 17.86 5 14 5ZM14 9C15.654 9 17 10.346 17 12C17 13.654 15.654 15 14 15V13C14.551 13 15 12.552 15 12C15 11.448 14.551 11 14 11V9Z"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5 mr-[6px] flex-shrink-0 text-[#949ba4]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41001 15H15.41L16.47 9H10.47L9.41001 15Z"/>
                  </svg>
                )}
                
                {/* Name */}
                <span className={`flex-1 truncate text-[16px] leading-5 ${
                  activeChannel === ch.id || ch.unread || ch.mentions ? 'font-medium' : ''
                }`}>
                  {ch.name}
                </span>

                {/* Mentions Badge */}
                {ch.mentions && (
                  <span className="ml-1 min-w-[16px] h-4 px-1 bg-[#f23f43] text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {ch.mentions}
                  </span>
                )}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* User Area */}
      <div className="h-[52px] bg-[#232428] px-2 flex items-center">
        <button className="flex items-center flex-1 min-w-0 p-1 rounded hover:bg-[rgba(79,84,92,0.4)] discord-transition">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center">
              <span className="text-sm">👀</span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-[14px] h-[14px] rounded-full bg-[#23a559] border-[3px] border-[#232428]" />
          </div>
          
          {/* Info */}
          <div className="ml-2 flex-1 min-w-0 text-left">
            <div className="text-sm font-semibold text-white truncate leading-[18px]">Spectator</div>
            <div className="text-xs text-[#949ba4] leading-[13px]">Online</div>
          </div>
        </button>

        {/* Buttons */}
        <button className="w-8 h-8 flex items-center justify-center text-[#b5bac1] hover:text-[#dbdee1] rounded icon-button">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.7 11H5C5 12.19 5.34 13.3 5.9 14.28L7.13 13.05C6.86 12.43 6.7 11.74 6.7 11ZM9.01 11.085C9.015 11.1125 9.02 11.14 9.02 11.17L15 5.18V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V11C9 11.03 9.005 11.0575 9.01 11.085ZM11.7 16.61C11.8 16.63 11.9 16.64 12 16.64C13.98 16.64 15.69 15.16 15.97 13.24L17.33 11.88C17.66 13.19 17.41 14.56 16.89 15.72C16.89 15.72 14.62 20.33 12 20.33C8.5 20.33 7 17.23 7 17.23C6.77 16.74 6.41 16.08 6.04 15.38L4.62 16.8C5.07 17.57 5.57 18.35 6.17 19C7.19 20.11 8.84 22 12 22C15.13 22 16.77 20.15 17.8 19.06C18.83 17.97 19 15.61 19 14.36L19 12V11H17V12C17 14.76 14.76 17 12 17C11.88 17 11.77 16.99 11.66 16.98L11.7 16.61ZM19 11H17.3C17.3 11.74 17.14 12.43 16.87 13.05L18.1 14.28C18.66 13.3 19 12.19 19 11ZM14.86 10.28L3.79 21.35L2.38 19.94L13.46 8.86L14.86 10.28Z"/>
          </svg>
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-[#b5bac1] hover:text-[#dbdee1] rounded icon-button">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM18 12C18 15.309 15.309 18 12 18C8.691 18 6 15.309 6 12H4V12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12H18Z"/>
          </svg>
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-[#b5bac1] hover:text-[#dbdee1] rounded icon-button">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.738 10H22V14H19.739C19.498 14.931 19.1 15.798 18.565 16.564L20 18L18 20L16.565 18.564C15.797 19.099 14.932 19.498 14 19.738V22H10V19.738C9.069 19.498 8.203 19.099 7.436 18.564L6 20L4 18L5.436 16.564C4.901 15.799 4.502 14.932 4.262 14H2V10H4.262C4.502 9.068 4.9 8.202 5.436 7.436L4 6L6 4L7.436 5.436C8.202 4.9 9.068 4.502 10 4.262V2H14V4.261C14.932 4.502 15.797 4.9 16.565 5.435L18 4L20 6L18.564 7.436C19.099 8.202 19.498 9.069 19.738 10ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
