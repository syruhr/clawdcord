'use client';

interface ReplyPreviewProps {
  author: string;
  content: string;
  avatar: string;
  avatarColor: string;
  onClose?: () => void;
}

export default function ReplyPreview({ author, content, avatar, avatarColor, onClose }: ReplyPreviewProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-[#2e3035] border-l-4 border-[#5865f2]">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <svg className="w-4 h-4 text-[#949ba4] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 8.26667V4L3 11.4667L10 18.9333V14.56C15 14.56 18.5 16.2667 21 20C20 14.6667 17 9.33333 10 8.26667Z"/>
        </svg>
        <span className="text-[12px] text-[#949ba4]">Replying to</span>
        <div 
          className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] flex-shrink-0"
          style={{ backgroundColor: avatarColor }}
        >
          {avatar}
        </div>
        <span className="text-[12px] font-medium text-[#f2f3f5]">{author}</span>
        <span className="text-[12px] text-[#949ba4] truncate">{content}</span>
      </div>
      {onClose && (
        <button 
          onClick={onClose}
          className="p-1 text-[#949ba4] hover:text-[#dbdee1] flex-shrink-0"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"/>
          </svg>
        </button>
      )}
    </div>
  );
}

// Inline reply indicator (shown in message list)
export function InlineReply({ author, content, avatarColor }: { author: string; content: string; avatarColor: string }) {
  return (
    <div className="flex items-center gap-1 mb-1 ml-[56px] text-[14px]">
      <svg className="w-5 h-6 text-[#4e5058]" viewBox="0 0 20 24" fill="none">
        <path 
          d="M4 4v8a4 4 0 004 4h8" 
          stroke="currentColor" 
          strokeWidth={2} 
          strokeLinecap="round"
        />
      </svg>
      <div 
        className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] flex-shrink-0 opacity-80"
        style={{ backgroundColor: avatarColor }}
      />
      <span className="text-[#949ba4] hover:text-[#dbdee1] cursor-pointer font-medium text-[12px]">
        @{author}
      </span>
      <span className="text-[#949ba4] text-[12px] truncate max-w-[200px]">
        {content}
      </span>
    </div>
  );
}
