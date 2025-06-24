import { useState, useEffect } from 'react';
import { useGroupCall } from '@/hooks/useGroupCall';
import WebCamGrid from '@/components/WebCam/WebCamGrid';
import { getOrCreateUserId, getOrCreateUserName, resetUserIdentity } from '@/utils/userIdGenerator';

const MOCK_ROOM_ID = 1;

const MockGroupCallPage = () => {
  const [myUniqueUserId, setMyUniqueUserId] = useState<number>(0);
  const [myUniqueUsername, setMyUniqueUsername] = useState<string>('');

  useEffect(() => {
    const userId = getOrCreateUserId();
    const username = getOrCreateUserName(userId);
    setMyUniqueUserId(userId);
    setMyUniqueUsername(username);
  }, []);

  const { participants, localStream, error, toggleMedia, removeParticipant } = useGroupCall({
    roomId: MOCK_ROOM_ID,
    myUserId: myUniqueUserId,
    myUsername: myUniqueUsername,
    initialParticipants: [],
  });


  if (error) {
    return <div className="bg-white p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex h-screen flex-col bg-white text-gray-800">
      <header className="flex items-center justify-between border-b border-gray-200 bg-white p-4 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">N:N 웹캠 테스트</h1>
      </header>

      <main className="flex-grow overflow-auto p-4">
        <div className="mb-6">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">방 ID: {MOCK_ROOM_ID}</h2>
          {participants.length === 0 && <p className="text-gray-600">현재 참가자가 없습니다.</p>}
          <WebCamGrid
            participants={participants}
            myUserId={myUniqueUserId}
            onToggleMedia={toggleMedia}
          />
        </div>
      </main>
    </div>
  );
};

export default MockGroupCallPage;
