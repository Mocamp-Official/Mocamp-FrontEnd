import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import WebCamPreviewModal from '@/components/webcamPreview/WebCamPreview';
import { UserInfo, RoomInfo } from '@/types/preview';
import CreateJoinHeader from '@/components/Header/CreateJoinHeader';
import CardPageLayout from '@/components/common/CardPageLayout';
import { enterRoom } from '@/apis/room';
import { fetchMyhome } from '@/apis/myhome';

const WebCamPreviewPage = () => {
  const router = useRouter();

  const { id } = router.query;
  const roomId = Array.isArray(id) ? Number(id[0]) : Number(id);

  const [user, setUser] = useState<UserInfo | null>(null);


  useEffect(() => {
     const loadUser = async () => {
    try {
      const data = await fetchMyhome();
      setUser({
        userId: data.userId,
        nickname: data.username,
        isWorking: true, 
        camStatus: true,
        micStatus: true,
      });
    } catch (error) {
      console.error('유저 정보 불러오기 실패', error);
    }
  };

  loadUser();
}, []);

  const handleEnterRoom = async ({
    camStatus,
    micStatus,
  }: {
    camStatus: boolean;
    micStatus: boolean;
  }) => {
    try {
      await enterRoom(String(roomId), {
        micTurnedOn: micStatus,
        camTurnedOn: camStatus,
      });

      router.push(`/room/${roomId}`);
    } catch (err) {
      alert('방 입장 실패! 다시 시도해주세요.');
    }
  };

  if (!roomId || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-gray7 font-pre">정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-[#e6e6e6]">
      <CreateJoinHeader />
      <main className="mt-[50px] flex flex-1 flex-col items-center justify-center">
        <CardPageLayout>
          <WebCamPreviewModal
            roomId={roomId}
            user={user}
            isHost={true}
            onClose={() => router.back()}
            onEditRoom={() => {}}
            onEnterRoom={handleEnterRoom}
          />
        </CardPageLayout>
      </main>
    </div>
  );
};

export default WebCamPreviewPage;
