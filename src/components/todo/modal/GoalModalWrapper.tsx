import { useState } from 'react';
import ModalLayout from '@/components/common/modal/ModalLayout';
import GoalModalContent from './GoalModalContent';
import CloseButton from '@/public/svgs/CloseButton.svg';
import { Todo } from '@/types/todo';
import { v4 as uuidv4 } from 'uuid';
import { useRoomPublisher } from '@/hooks/useRoomPublisher';

interface GoalModalWrapperProps {
  onClose: () => void;
  mode: 'add' | 'edit';
  todos?: Todo[];
  onSubmit: (updatedTodos: Todo[]) => void;
  roomId: string;
}

const GoalModalWrapper = ({
  onClose,
  mode,
  todos = [],
  onSubmit,
  roomId,
}: GoalModalWrapperProps) => {
  const [currentTodos, setCurrentTodos] = useState<Todo[]>(todos);
  const { updateGoals } = useRoomPublisher(roomId);

  const handleAddTodo = () => {
    setCurrentTodos((prev) => [
      {
        id: uuidv4(), // string 타입
        text: '',
        done: false,
      },
      ...prev,
    ]);
  };

  const handleSubmit = () => {
    const filtered = currentTodos.filter((todo) => todo.text.trim() !== '');

    const createGoals = filtered
      .filter((todo) => !todos.some((t) => t.id === todo.id))
      .map((todo) => ({ content: todo.text }));

    const deleteGoals = todos
      .filter((t) => !filtered.some((todo) => todo.id === t.id))
      .map((t) => {
        const idAsNumber = Number(t.id);
        return isNaN(idAsNumber) ? undefined : idAsNumber;
      })
      .filter((id): id is number => id !== undefined);

    updateGoals(createGoals, deleteGoals);
    onSubmit(filtered);
    onClose();
  };

  return (
    <ModalLayout onClose={onClose} width="660px" height="880px">
      <button
        className="absolute top-[50px] right-[50px] h-[25px] w-[25px] text-[#d9d9d9]"
        onClick={onClose}
      >
        <CloseButton />
      </button>

      {/* 헤더 */}
      <div className="mb-[50px] flex flex-col gap-[10px]">
        <div className="flex w-[530px] justify-between">
          <span className="text-[32px] font-semibold text-[#555555]">나의 목표 관리</span>
        </div>
        <span className="text-lg font-semibold text-[#a7a7a7]">
          나의 목표를 자유롭게 설정할 수 있어요
        </span>
      </div>

      <GoalModalContent todos={currentTodos} setTodos={setCurrentTodos} mode={mode} />

      {/* 하단 버튼 */}
      <div className="absolute bottom-[50px] flex h-[84px] w-full items-center gap-5">
        <button
          onClick={handleAddTodo}
          className="w-[187px] rounded-[10px] border border-[#e8e8e8] bg-white px-10 py-[30px] text-[18px] font-semibold tracking-[-0.02em] text-[#27cfa5]"
        >
          목표 생성하기
        </button>
        <button
          onClick={handleSubmit}
          className="w-[353px] rounded-[10px] bg-[#27cfa5] px-10 py-[30px] text-[20px] font-semibold text-white"
        >
          완료하기
        </button>
      </div>
    </ModalLayout>
  );
};

export default GoalModalWrapper;
