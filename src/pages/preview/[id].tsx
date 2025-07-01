import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import WebCamPreviewModal from '@/components/webcamPreview/WebCamPreview';
import { UserInfo, RoomInfo } from '@/types/preview';
import CreateJoinHeader from '@/components/Header/CreateJoinHeader';
import CardPageLayout from '@/components/common/CardPageLayout';

import { getUserFromToken } from '@/utils/decode';

const WebCamPreviewPage = () => {
  const router = useRouter();

  const { id } = router.query;
  const roomId = Array.isArray(id) ? Number(id[0]) : Number(id);

  const [user, setUser] = useState<UserInfo | null>(null);

  // 유저 정보 가져오기
  useEffect(() => {
    const user = getUserFromToken();
    if (user) {
      setUser(user);
    } else {
      console.error('토큰에서 유저 정보 가져오기 실패');
    }
  }, []);

  if (!roomId || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-gray7 font-pre">정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#FAFAFA]">
      <CreateJoinHeader />
      <main className="flex flex-1">
        <CardPageLayout>
          <WebCamPreviewModal
            roomId={roomId}
            user={user}
            isHost={true}
            onClose={() => router.back()}
            onEditRoom={() => {}}
            onEnterRoom={() => router.push(`/room/${roomId}`)}
          />
        </CardPageLayout>
      </main>
    </div>
  );
};

export default WebCamPreviewPage;
