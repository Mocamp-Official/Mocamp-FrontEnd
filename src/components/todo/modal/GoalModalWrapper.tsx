import { useState } from 'react';

import ModalLayout from '@/components/common/modal/ModalLayout';
import GoalModalContent from './GoalModalContent';

import UnlockButton from '@/public/svgs/UnlockIcon.svg';
import LockButton from '@/public/svgs/LockIcon.svg';

import { useRoomPublisher } from '@/hooks/room/useRoomPublisher';
import { Todo } from '@/types/todo';

interface GoalModalWrapperProps {
  onClose: () => void;
  mode: 'add' | 'edit';
  todos?: Todo[];
  onSubmit: (updatedTodos: Todo[]) => void;
  roomId: string;
  isSecret: boolean;
}

const GoalModalWrapper = ({
  onClose,
  mode,
  todos = [],
  onSubmit,
  roomId,
  isSecret,
}: GoalModalWrapperProps) => {
  const [currentTodos, setCurrentTodos] = useState<Todo[]>(todos);
  const { updateGoals } = useRoomPublisher(roomId);
  const [isPrivate, setIsPrivate] = useState(isSecret);

  const handleAddTodo = () => {
    setCurrentTodos((prev) => [
      {
        goalId: Date.now(),
        content: '',
        isCompleted: false,
      },
      ...prev,
    ]);
  };

  const handleSubmit = () => {
    const filtered = currentTodos.filter((todo) => todo.content.trim() !== '');

    const createGoals = filtered
      .filter((todo) => !todos.some((t) => t.goalId === todo.goalId))
      .map((todo) => ({ content: todo.content }));

    const deleteGoals = todos
      .filter((t) => !filtered.some((todo) => todo.goalId === t.goalId))
      .map((t) => {
        const idAsNumber = Number(t.goalId);
        return isNaN(idAsNumber) ? undefined : idAsNumber;
      })
      .filter((id): id is number => id !== undefined);

    updateGoals(createGoals, deleteGoals, isPrivate);
    onSubmit(filtered);
    onClose();
  };

  return (
    <ModalLayout onClose={onClose} width="660px" height="880px">
      <button
        className="absolute top-[50px] right-[50px] h-[30px] w-[30px] cursor-pointer"
        onClick={() => setIsPrivate((prev) => !prev)}
      >
        {isPrivate ? <LockButton /> : <UnlockButton />}
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
