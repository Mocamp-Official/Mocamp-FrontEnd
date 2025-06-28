import { useState } from 'react';
import { Todo } from '@/types/todo';
import GoalModalWrapper from '@/components/todo/modal/GoalModalWrapper';

interface TodoEmptyContentProps {
  onAddTodos: (newTodos: Todo[]) => void;
  roomId: string;
  isMine: boolean;
}

const TodoEmptyContent = ({ onAddTodos, roomId, isMine }: TodoEmptyContentProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  if (!isMine) {
    return (
      <div className="flex h-full w-[480px] flex-col items-center justify-center rounded-[20px] bg-[#FEFEFE]">
        <span className="text-title3 text-gray6">오늘의 목표를 추가하지 않았어요</span>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-full w-[480px] flex-col items-center justify-center gap-5 rounded-[20px] bg-[#FEFEFE]">
        <span className="text-title3 text-gray6">오늘의 목표는 무엇인가요?</span>
        <button
          onClick={handleOpen}
          className="bg-primary text-body2 h-[60px] w-[160px] rounded-[10px] font-semibold text-white"
        >
          추가하기
        </button>
      </div>

      {showModal && (
        <GoalModalWrapper
          roomId={roomId}
          onClose={handleClose}
          mode="add"
          onSubmit={(newTodos) => {
            onAddTodos(newTodos);
            handleClose();
          }}
        />
      )}
    </>
  );
};

export default TodoEmptyContent;
