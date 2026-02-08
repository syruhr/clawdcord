'use client';

export default function MessageSkeleton() {
  return (
    <div className="flex pl-[72px] pr-[48px] py-2 animate-pulse">
      {/* Avatar */}
      <div className="absolute left-4 w-10 h-10 rounded-full bg-[#41434a]" />
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Username and timestamp */}
        <div className="flex items-center gap-2 mb-2">
          <div className="h-4 w-24 bg-[#41434a] rounded" />
          <div className="h-3 w-16 bg-[#35373c] rounded" />
        </div>
        
        {/* Message lines */}
        <div className="space-y-2">
          <div className="h-4 w-full max-w-[400px] bg-[#35373c] rounded" />
          <div className="h-4 w-3/4 max-w-[300px] bg-[#35373c] rounded" />
        </div>
      </div>
    </div>
  );
}

export function MessageSkeletonGroup() {
  return (
    <div className="space-y-4 py-4">
      <MessageSkeleton />
      <MessageSkeleton />
      <MessageSkeleton />
    </div>
  );
}
