'use client';

import { useState } from 'react';
import TitleBar from '@/components/TitleBar';
import ServerList from '@/components/ServerList';
import ChannelSidebar from '@/components/ChannelSidebar';
import ChatArea from '@/components/ChatArea';
import MemberList from '@/components/MemberList';

export default function Home() {
  const [activeChannel, setActiveChannel] = useState('general');
  const [showMembers, setShowMembers] = useState(true);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#1e1f22] rounded-lg shadow-2xl">
      {/* Title Bar (macOS style) */}
      <TitleBar />
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Server List */}
        <ServerList />
        
        {/* Channel Sidebar */}
        <ChannelSidebar 
          activeChannel={activeChannel} 
          setActiveChannel={setActiveChannel} 
        />
        
        {/* Main Chat Area */}
        <ChatArea 
          channel={activeChannel}
          showMembers={showMembers}
          toggleMembers={() => setShowMembers(!showMembers)}
        />
        
        {/* Member List */}
        {showMembers && <MemberList />}
      </div>
    </div>
  );
}
