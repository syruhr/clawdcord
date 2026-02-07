'use client';

import { useState } from 'react';
import ServerList from '@/components/ServerList';
import ChannelSidebar from '@/components/ChannelSidebar';
import ChatArea from '@/components/ChatArea';
import MemberList from '@/components/MemberList';

export default function Home() {
  const [activeChannel, setActiveChannel] = useState('general');
  const [showMembers, setShowMembers] = useState(true);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
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
  );
}
