'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';

import Arrow from '@/public/svgs/LeftArrowButton.svg';
import TodoSection from '@/components/todo/TodoSection';
import WorkspaceHeader from '@/components/Header/WorkSpaceHeader';
import Sidebar from '@/components/Sidebar/Sidebar';

import { leaveRoom } from '@/apis/room';
import { useRoomContext } from '@/hooks/room/useRoomContext';

const RoomPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const roomId = Array.isArray(id) ? id[0] : id;

  const { todoGroups, setTodosByUser, notice, roomData, participants, alertInfo, setAlertVisible } =
    useRoomContext(roomId);

  const [slideIndex, setSlideIndex] = useState(0);
  const MAX_VISIBLE = 2;

  if (!router.isReady || !roomId || !roomData || todoGroups.length === 0) return null;

  const slidingItems = todoGroups.slice(1);
  const visibleSlide = slidingItems.slice(slideIndex, slideIndex + MAX_VISIBLE);
  const visibleGroups = [todoGroups[0], ...visibleSlide];

  const canSlideLeft = slideIndex > 0;
  const canSlideRight = slideIndex + MAX_VISIBLE < slidingItems.length;

  const handleLeaveRoom = async () => {
    try {
      await leaveRoom(roomId as string);
      router.push('/myhome');
    } catch (e) {
      alert('방 퇴장 실패');
    }
  };

  return (
    <div className="bg-gray3 relative flex h-screen w-screen items-center gap-5 pl-[170.67px] lg:pl-60 xl:pl-[320px]">
      <WorkspaceHeader roomName={roomData.roomName} initialNotice={notice} />
      <Sidebar
        startTime={roomData.startedAt}
        endTime={roomData.endedAt}
        participants={participants.length}
        onLeaveRoom={handleLeaveRoom}
        alertInfo={alertInfo}
        onCloseAlert={() => setAlertVisible(false)}
      />

      {/* 왼쪽 화살표 */}
      {canSlideLeft && todoGroups.length > 3 && (
        <Arrow
          onClick={() => setSlideIndex((prev) => prev - 1)}
          className="absolute left-[122.67px] h-8 w-8 cursor-pointer lg:left-[172.5px] lg:h-[45px] lg:w-[45px] xl:left-[230px] xl:h-15 xl:w-15"
        />
      )}

      {/* 투두 그룹 렌더 */}
      {visibleGroups.map((g) => (
        <TodoSection
          key={g.id}
          resolution={g.resolution}
          isMyGoal={g.isMyGoal}
          isSecret={g.isSecret}
          roomId={String(roomId)}
          todos={g.items}
          setTodos={(updated) => setTodosByUser(g.id, updated)}
        />
      ))}

      {/* 오른쪽 화살표 */}
      {canSlideRight && todoGroups.length > 3 && (
        <Arrow
          onClick={() => setSlideIndex((prev) => prev + 1)}
          className="absolute left-[976px] h-8 w-8 rotate-180 cursor-pointer lg:left-[1372.5px] lg:h-[45px] lg:w-[45px] xl:left-[1830px] xl:h-15 xl:w-15"
        />
      )}
    </div>
  );
};

export default RoomPage;
