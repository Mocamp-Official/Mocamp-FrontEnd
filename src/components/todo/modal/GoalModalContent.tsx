import { useState } from 'react';
import { Todo } from '@/types/todo';
import CloseButton from '@/public/svgs/CloseButton.svg';

interface GoalModalContentProps {
  todos: Todo[];
  mode: 'add' | 'edit';
}

const GoalModalContent = ({ todos, mode }: GoalModalContentProps) => {
  const [currentTodos, setCurrentTodos] = useState<Todo[]>(
    mode === 'edit' ? todos : [],
  );

  const handleRemove = (targetIndex: number) => {
    setCurrentTodos((prevTodos) =>
      prevTodos.filter((_, index) => index !== targetIndex),
    );
  };

  return (
    <div className="flex flex-col gap-[25px] h-[460px] overflow-auto custom-scrollbar">
      {currentTodos.length === 0 ? (
        <div className="flex justify-between items-center w-[530px] h-[70px] px-[40px] py-[20px] border border-[#e8e8e8] rounded-[10px] bg-[#f9f9f9]">
          <span className="font-medium text-[20px] text-[#A7A7A7]">
            세부 목표를 입력하세요
          </span>
          <button disabled>
            <CloseButton className="w-[20px] h-[20px] text-[#D3D3D3] cursor-default" />
          </button>
        </div>
      ) : (
        currentTodos.map((todoItem, todoIndex) => {
          const isCompleted = todoItem.done;

          return (
            <div
              key={todoIndex}
              className={`flex justify-between items-center w-[530px] h-[70px] px-[40px] py-[20px] border rounded-[10px]
                ${isCompleted ? 'bg-[#bef1e4] border-[#27cfa5]' : 'bg-white border-[#e8e8e8]'}
              `}
            >
              <span
                className={`font-medium text-[20px] ${
                  isCompleted ? 'text-[#27cfa5] line-through' : 'text-[#555555]'
                }`}
              >
                {todoItem.text}
              </span>
              <button onClick={() => handleRemove(todoIndex)}>
                <CloseButton
                  className={`w-[20px] h-[20px] cursor-pointer ${
                    isCompleted ? 'text-[#27cfa5]' : 'text-[#A7A7A7]'
                  }`}
                />
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default GoalModalContent;
