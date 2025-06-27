import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useGroupCall } from '@/hooks/useGroupCall';
import WebCamGrid from '@/components/WebCam/WebCamGrid';
import Sidebar from '@/components/Sidebar/Sidebar'; 
import { Participant } from '@/types/webCam';
import { getOrCreateUserId, getOrCreateUserName } from '@/utils/userIdGenerator';

//전부 테스트
const MOCK_ROOM_ID = 1; 
const MockGroupCallPage = () => {
  const router = useRouter();
  const [myUniqueUserId, setMyUniqueUserId] = useState<number>(0);
  const [myUniqueUsername, setMyUniqueUsername] = useState<string>('');
  const [roomActive, setRoomActive] = useState(true); 

  useEffect(() => {
    const userId = getOrCreateUserId();
    const username = getOrCreateUserName(userId);
    setMyUniqueUserId(userId);
    setMyUniqueUsername(username);
  }, []);

  // 방을 나갔을 때 창 아예 닫히기
  const handleRoomLeft = useCallback(() => {
    console.log('[MockPage] Room left callback triggered. Closing the room window.');
    setRoomActive(false); 
    window.close(); 
  }, []);

  const { participants, localStream, error, toggleMedia, leaveRoom } = useGroupCall({
    roomId: MOCK_ROOM_ID,
    myUserId: myUniqueUserId,
    myUsername: myUniqueUsername,
    initialParticipants: [],
    onRoomLeft: handleRoomLeft,
  });

  const myParticipant = participants.find((p) => p.userId === myUniqueUserId);

  if (myUniqueUserId === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-white text-gray-800">
        Initializing user identity...
      </div>
    );
  }

  if (!roomActive) {
    return null; 
  }

  if (error) {
    return <div className="bg-white p-4 text-red-500">Error: {error}</div>;
  }


  const startTime = new Date();
  const endTime = new Date(startTime.getTime() + 3 * 60 * 60 * 1000);

  return (
    <div className="flex h-screen bg-white text-gray-800">
      <Sidebar
        startTime={startTime}
        endTime={endTime}
        participants={participants.length} 
        onLeaveRoom={leaveRoom} 
      />

      <div className="flex-grow flex flex-col">
        <header className="flex items-center justify-between border-b border-gray-200 bg-white p-4 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">N:N 웹캠 테스트</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">
              내 ID: <span className="font-semibold">{myUniqueUserId}</span> (
              <span className="font-semibold">{myUniqueUsername}</span>)
            </span>
          </div>
        </header>

        <main className="flex-grow overflow-auto p-4">
          <div className="mb-6">
            <h2 className="mb-3 text-xl font-semibold text-gray-900">
              방 ID: {MOCK_ROOM_ID}
            </h2>
            {participants.length === 0 && <p className="text-gray-600">현재 참가자가 없습니다.</p>}
            <WebCamGrid
              participants={participants}
              myUserId={myUniqueUserId}
              onToggleMedia={toggleMedia}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MockGroupCallPage;