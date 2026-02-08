'use client';

import { useState } from 'react';

interface EmojiPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (emoji: string) => void;
  position: { x: number; y: number };
}

const emojiCategories = {
  'Frequently Used': ['😂', '❤️', '🔥', '👍', '😭', '🙏', '😍', '💀', '✨', '😊'],
  'Smileys': ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '😉', '😌', '😍', '🥰', '😘', '😋', '😛', '😜', '🤪', '😝'],
  'Gestures': ['👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '👇', '👍', '👎', '✊'],
  'Animals': ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐸', '🐵', '🐔', '🐧', '🐦', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴'],
  'Food': ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦'],
  'Objects': ['⌚', '📱', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📽️', '🎬', '📺', '📻'],
  'Symbols': ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '✨', '⭐'],
  'Flags': ['🏳️', '🏴', '🏁', '🚩', '🎌', '🏴‍☠️', '🇺🇸', '🇬🇧', '🇨🇦', '🇦🇺', '🇯🇵', '🇰🇷', '🇨🇳', '🇮🇳', '🇧🇷', '🇲🇽', '🇫🇷', '🇩🇪', '🇮🇹', '🇪🇸'],
};

export default function EmojiPicker({ isOpen, onClose, onSelect, position }: EmojiPickerProps) {
  const [activeCategory, setActiveCategory] = useState('Frequently Used');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div 
        className="fixed z-50 w-[420px] h-[400px] bg-[#2b2d31] rounded-lg shadow-xl overflow-hidden flex flex-col border border-[#1f2023]"
        style={{ 
          left: Math.min(position.x, window.innerWidth - 440),
          top: Math.max(position.y - 420, 20),
        }}
      >
        {/* Search */}
        <div className="p-3 border-b border-[#1f2023]">
          <input
            type="text"
            placeholder="Search emoji"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 bg-[#1e1f22] rounded text-[14px] text-[#dbdee1] placeholder-[#949ba4] outline-none focus:ring-1 focus:ring-[#5865f2]"
          />
        </div>
        
        {/* Category tabs */}
        <div className="flex gap-1 px-3 py-2 border-b border-[#1f2023] overflow-x-auto thin-scrollbar">
          {Object.keys(emojiCategories).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-2 py-1 text-[12px] rounded whitespace-nowrap transition-colors ${
                activeCategory === category
                  ? 'bg-[#5865f2] text-white'
                  : 'text-[#949ba4] hover:bg-[#35373c] hover:text-[#dbdee1]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Emoji grid */}
        <div className="flex-1 overflow-y-auto p-2 thin-scrollbar">
          <div className="grid grid-cols-10 gap-0.5">
            {emojiCategories[activeCategory as keyof typeof emojiCategories]?.map((emoji, i) => (
              <button
                key={i}
                onClick={() => {
                  onSelect(emoji);
                  onClose();
                }}
                className="w-9 h-9 flex items-center justify-center text-2xl rounded hover:bg-[#35373c] transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
        
        {/* Preview bar */}
        <div className="h-12 px-3 flex items-center bg-[#232428] border-t border-[#1f2023]">
          <div className="w-8 h-8 bg-[#35373c] rounded flex items-center justify-center text-xl">
            {emojiCategories[activeCategory as keyof typeof emojiCategories]?.[0] || '😀'}
          </div>
          <div className="ml-2 text-[14px] text-[#dbdee1] font-medium">
            {activeCategory}
          </div>
        </div>
      </div>
    </>
  );
}
