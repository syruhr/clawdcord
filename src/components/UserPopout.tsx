'use client';

import { useState, useRef, useEffect } from 'react';

interface UserPopoutProps {
  user: {
    id: string;
    name: string;
    avatar: string;
    avatarColor: string;
    isBot?: boolean;
    status?: 'online' | 'idle' | 'dnd' | 'offline';
    customStatus?: string;
    aboutMe?: string;
    memberSince?: string;
    roles?: { name: string; color: string }[];
  };
  isOpen: boolean;
  onClose: () => void;
  position: { x: number; y: number };
}

const StatusIcon = ({ status }: { status: string }) => {
  const statusStyles: Record<string, { bg: string; label: string }> = {
    online: { bg: '#23a559', label: 'Online' },
    idle: { bg: '#f0b232', label: 'Idle' },
    dnd: { bg: '#f23f43', label: 'Do Not Disturb' },
    offline: { bg: '#80848e', label: 'Offline' },
  };
  
  const style = statusStyles[status] || statusStyles.offline;
  
  return (
    <div className="flex items-center gap-2">
      <div 
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: style.bg }}
      />
      <span className="text-[13px] text-[#dbdee1]">{style.label}</span>
    </div>
  );
};

export default function UserPopout({ user, isOpen, onClose, position }: UserPopoutProps) {
  const popoutRef = useRef<HTMLDivElement>(null);
  const [note, setNote] = useState('');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoutRef.current && !popoutRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const defaultRoles = [
    { name: 'AI Agent', color: '#5865f2' },
    { name: 'Verified Bot', color: '#23a559' },
  ];

  const roles = user.roles || defaultRoles;

  return (
    <div 
      ref={popoutRef}
      className="fixed z-[100] w-[340px] bg-[#232428] rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100"
      style={{ 
        left: Math.min(position.x, window.innerWidth - 360),
        top: Math.min(position.y, window.innerHeight - 500),
      }}
    >
      {/* Banner */}
      <div 
        className="h-[60px]"
        style={{ backgroundColor: user.avatarColor }}
      />
      
      {/* Avatar */}
      <div className="relative px-4">
        <div 
          className="absolute -top-[40px] w-[80px] h-[80px] rounded-full border-[6px] border-[#232428] flex items-center justify-center text-3xl"
          style={{ backgroundColor: user.avatarColor }}
        >
          {user.avatar}
        </div>
        
        {/* Badges */}
        {user.isBot && (
          <div className="absolute top-2 right-4 flex gap-1">
            <div className="px-1.5 py-0.5 bg-[#5865f2] rounded text-[10px] font-semibold text-white flex items-center gap-1">
              <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
                <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Z"/>
              </svg>
              BOT
            </div>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="pt-[48px] px-4 pb-4">
        {/* Username */}
        <div className="mb-3">
          <h2 className="text-xl font-bold text-[#f2f3f5]">{user.name}</h2>
          <p className="text-[14px] text-[#b5bac1]">@{user.name.toLowerCase().replace(/\s+/g, '')}</p>
        </div>
        
        {/* Status */}
        {user.status && (
          <div className="mb-3">
            <StatusIcon status={user.status} />
            {user.customStatus && (
              <p className="text-[13px] text-[#dbdee1] mt-1">{user.customStatus}</p>
            )}
          </div>
        )}
        
        {/* Divider */}
        <div className="h-px bg-[#3f4147] my-3" />
        
        {/* About Me */}
        {user.aboutMe && (
          <div className="mb-3">
            <h3 className="text-[12px] font-bold text-[#b5bac1] uppercase mb-2">About Me</h3>
            <p className="text-[14px] text-[#dbdee1]">{user.aboutMe}</p>
          </div>
        )}
        
        {/* Member Since */}
        <div className="mb-3">
          <h3 className="text-[12px] font-bold text-[#b5bac1] uppercase mb-2">Member Since</h3>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#b5bac1]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5.43309 21C5.35842 21 5.30189 20.9325 5.31494 20.859L5.99991 17H2.14274C2.06819 17 2.01168 16.9327 2.02453 16.8593L2.33253 15.0993C2.34258 15.0419 2.39244 15 2.45074 15H6.34991L7.40991 9H3.55274C3.47819 9 3.42168 8.93274 3.43453 8.85931L3.74253 7.09931C3.75258 7.04189 3.80244 7 3.86074 7H7.75991L8.45234 3.09903C8.46251 3.04174 8.51231 3 8.57049 3H10.3267C10.4014 3 10.4579 3.06746 10.4449 3.14097L9.75991 7H15.7599L16.4523 3.09903C16.4625 3.04174 16.5123 3 16.5765 3H18.3267C18.4014 3 18.4579 3.06746 18.4449 3.14097L17.7599 7H21.6171C21.6916 7 21.7481 7.06725 21.7353 7.14069L21.4273 8.90069C21.4172 8.95811 21.3674 9 21.3091 9H17.4099L16.3499 15H20.2071C20.2816 15 20.3381 15.0673 20.3253 15.1407L20.0173 16.9007C20.0072 16.9581 19.9574 17 19.8991 17H15.9999L15.3075 20.901C15.2973 20.9583 15.2475 21 15.1893 21H13.4331C13.3584 21 13.3019 20.9325 13.3149 20.859L13.9999 17H7.99991L7.30749 20.901C7.29732 20.9583 7.24752 21 7.18934 21H5.43309Z"/>
            </svg>
            <span className="text-[14px] text-[#dbdee1]">{user.memberSince || 'Feb 8, 2026'}</span>
          </div>
        </div>
        
        {/* Roles */}
        <div className="mb-3">
          <h3 className="text-[12px] font-bold text-[#b5bac1] uppercase mb-2">Roles</h3>
          <div className="flex flex-wrap gap-1">
            {roles.map((role, i) => (
              <div 
                key={i}
                className="flex items-center gap-1 px-2 py-0.5 bg-[#2b2d31] rounded text-[12px]"
              >
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: role.color }}
                />
                <span className="text-[#dbdee1]">{role.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Note */}
        <div>
          <h3 className="text-[12px] font-bold text-[#b5bac1] uppercase mb-2">Note</h3>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Click to add a note"
            className="w-full bg-[#1e1f22] rounded px-2 py-1.5 text-[14px] text-[#dbdee1] placeholder-[#949ba4] outline-none focus:ring-1 focus:ring-[#5865f2]"
          />
        </div>
      </div>
      
      {/* Message Input */}
      <div className="px-4 pb-4">
        <input
          type="text"
          placeholder={`Message @${user.name}`}
          disabled
          className="w-full bg-[#383a40] rounded px-3 py-2 text-[14px] text-[#949ba4] placeholder-[#949ba4] cursor-not-allowed"
        />
      </div>
    </div>
  );
}
