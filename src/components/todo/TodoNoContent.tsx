import { useState } from 'react';
import { Todo } from '@/types/todo';
import GoalModalWrapper from '@/components/todo/modal/GoalModalWrapper';

interface TodoNoContentProps {
  onAddTodos: (newTodos: Todo[]) => void;
}

const TodoNoContent = ({ onAddTodos }: TodoNoContentProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <div className="flex flex-col items-center w-[480px] h-full pt-[255px] gap-5 bg-[#FEFEFE] rounded-[20px]">
        <span className="text-[#C4C4C4] font-semibold text-2xl">
          오늘의 목표는 무엇인가요?
        </span>
        <button
          onClick={handleOpen}
          className="w-[160px] h-[60px] rounded-[10px] bg-[#27CFA5] text-2xl text-white font-semibold"
        >
          추가하기
        </button>
      </div>

      {showModal && (
        <GoalModalWrapper
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

export default TodoNoContent;
