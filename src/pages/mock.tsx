import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useGroupCall } from '@/hooks/useGroupCall';
import WebCamGrid from '@/components/WebCam/WebCamGrid';
import Sidebar from '@/components/Sidebar/Sidebar';
import { getOrCreateUserId, getOrCreateUserName } from '@/utils/userIdGenerator';
import DelegationModal from '@/components/WebCam/modal/DelegationModal';

const MOCK_ROOM_ID = 1;

const MockGroupCallPage = () => {
  const [myUniqueUserId, setMyUniqueUserId] = useState<number>(0);
  const [myUniqueUsername, setMyUniqueUsername] = useState<string>('');
  const [roomActive, setRoomActive] = useState(true);
  const [isDelegationOpen, setIsDelegationOpen] = useState(false);
  const [selectedDelegateId, setSelectedDelegateId] = useState<number | null>(null);

  useEffect(() => {
    const userId = getOrCreateUserId();
    const username = getOrCreateUserName(userId);
    setMyUniqueUserId(userId);
    setMyUniqueUsername(username);
  }, []);

  const handleRoomLeft = () => {
    setRoomActive(false);
    window.close();
  };

  const {
    participants,
    localStream,
    error,
    toggleMedia,
    leaveRoom,
    adminUsername,
    delegateAdmin,
    setAdminUsername,
  } = useGroupCall({
    roomId: MOCK_ROOM_ID,
    myUserId: myUniqueUserId,
    myUsername: myUniqueUsername,
    onRoomLeft: handleRoomLeft,
  });

  useEffect(() => {
    if (myUniqueUserId === 1) {
      setAdminUsername(myUniqueUsername);
    }
  }, [myUniqueUserId, myUniqueUsername, setAdminUsername]);

  const handleOpenDelegationModal = () => setIsDelegationOpen(true);
  const handleCloseDelegationModal = () => setIsDelegationOpen(false);
  const handleSelectDelegate = (userId: number) => {
    setSelectedDelegateId(userId);
  };
  const handleDelegate = (userId: number | null) => {
    if (userId !== null) {
      delegateAdmin(userId);
      handleCloseDelegationModal();
    }
  };

  if (myUniqueUserId === 0) return <div>Initializing user identity...</div>;
  if (!roomActive) return null;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex h-screen bg-white text-gray-800">
      <Sidebar
        startTime={new Date()}
        endTime={new Date(Date.now() + 3 * 60 * 60 * 1000)}
        participants={participants.length}
        onLeaveRoom={leaveRoom}
      />

      <div className="flex flex-grow flex-col">
        <header className="flex items-center justify-between border-b border-gray-200 bg-white p-4 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">N:N 웹캠 테스트</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">
              내 ID: <span className="font-semibold">{myUniqueUserId}</span>
            </span>
          </div>
        </header>

        <main className="flex-grow overflow-auto p-4">
          <WebCamGrid
            participants={participants}
            myUserId={myUniqueUserId}
            onToggleMedia={toggleMedia}
            adminUsername={adminUsername}
            onOpenDelegationModal={handleOpenDelegationModal}
          />
        </main>
      </div>

      {isDelegationOpen && (
        <DelegationModal
          participants={participants}
          currentUserId={myUniqueUserId}
          selectedUserId={selectedDelegateId}
          onSelect={handleSelectDelegate}
          onConfirm={() => handleDelegate(selectedDelegateId)}
          onClose={handleCloseDelegationModal}
        />
      )}
    </div>
  );
};

export default MockGroupCallPage;
