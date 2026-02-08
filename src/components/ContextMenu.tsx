'use client';

import { useEffect, useRef } from 'react';

interface ContextMenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
  divider?: boolean;
}

interface ContextMenuProps {
  isOpen: boolean;
  onClose: () => void;
  position: { x: number; y: number };
  items: ContextMenuItem[];
}

export default function ContextMenu({ isOpen, onClose, position, items }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Calculate position to keep menu in viewport
  const menuWidth = 188;
  const menuHeight = items.length * 32 + 8;
  const x = Math.min(position.x, window.innerWidth - menuWidth - 8);
  const y = Math.min(position.y, window.innerHeight - menuHeight - 8);

  return (
    <div
      ref={menuRef}
      className="fixed z-[100] w-[188px] bg-[#111214] rounded-md shadow-xl py-1.5 border border-[#232428]"
      style={{ left: x, top: y }}
    >
      {items.map((item, index) => (
        <div key={index}>
          {item.divider && index > 0 && (
            <div className="h-px bg-[#35373c] mx-2 my-1" />
          )}
          <button
            onClick={() => {
              item.onClick();
              onClose();
            }}
            className={`w-full flex items-center gap-2 px-2 py-1.5 mx-1.5 rounded text-[14px] transition-colors ${
              item.danger
                ? 'text-[#f23f43] hover:bg-[#f23f43] hover:text-white'
                : 'text-[#b5bac1] hover:bg-[#5865f2] hover:text-white'
            }`}
            style={{ width: 'calc(100% - 12px)' }}
          >
            {item.icon && <span className="w-4 h-4">{item.icon}</span>}
            <span>{item.label}</span>
          </button>
        </div>
      ))}
    </div>
  );
}

// Common menu items for messages
export const messageContextMenuItems: ContextMenuItem[] = [
  {
    label: 'Add Reaction',
    icon: <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>,
    onClick: () => console.log('Add reaction'),
  },
  {
    label: 'Reply',
    icon: <svg fill="currentColor" viewBox="0 0 24 24"><path d="M10 8.26667V4L3 11.4667L10 18.9333V14.56C15 14.56 18.5 16.2667 21 20C20 14.6667 17 9.33333 10 8.26667Z"/></svg>,
    onClick: () => console.log('Reply'),
  },
  {
    label: 'Create Thread',
    icon: <svg fill="currentColor" viewBox="0 0 24 24"><path d="M5.43309 21C5.35842 21 5.30189 20.9325 5.31494 20.859L5.99991 17H2.14274C2.06819 17 2.01168 16.9327 2.02453 16.8593L2.33253 15.0993C2.34258 15.0419 2.39244 15 2.45074 15H6.34991L7.40991 9H3.55274C3.47819 9 3.42168 8.93274 3.43453 8.85931L3.74253 7.09931C3.75258 7.04189 3.80244 7 3.86074 7H7.75991L8.45234 3.09903C8.46251 3.04174 8.51231 3 8.57049 3H10.3267C10.4014 3 10.4579 3.06746 10.4449 3.14097L9.75991 7H15.7599L16.4523 3.09903C16.4625 3.04174 16.5123 3 16.5765 3H18.3267C18.4014 3 18.4579 3.06746 18.4449 3.14097L17.7599 7H21.6171C21.6916 7 21.7481 7.06725 21.7353 7.14069L21.4273 8.90069C21.4172 8.95811 21.3674 9 21.3091 9H17.4099L16.3499 15H20.2071C20.2816 15 20.3381 15.0673 20.3253 15.1407L20.0173 16.9007C20.0072 16.9581 19.9574 17 19.8991 17H15.9999L15.3075 20.901C15.2973 20.9583 15.2475 21 15.1893 21H13.4331C13.3584 21 13.3019 20.9325 13.3149 20.859L13.9999 17H7.99991L7.30749 20.901C7.29732 20.9583 7.24752 21 7.18934 21H5.43309Z"/></svg>,
    onClick: () => console.log('Create thread'),
  },
  {
    label: 'Mark Unread',
    icon: <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>,
    onClick: () => console.log('Mark unread'),
    divider: true,
  },
  {
    label: 'Copy Text',
    icon: <svg fill="currentColor" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>,
    onClick: () => console.log('Copy text'),
  },
  {
    label: 'Copy Message Link',
    icon: <svg fill="currentColor" viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>,
    onClick: () => console.log('Copy link'),
  },
  {
    label: 'Delete Message',
    icon: <svg fill="currentColor" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>,
    onClick: () => console.log('Delete'),
    danger: true,
    divider: true,
  },
];
