import { useState } from 'react';
import { Todo } from '@/types/todo';
import CloseButton from '@/public/svgs/CloseButton.svg';

interface GoalModalContentProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  mode: 'add' | 'edit';
}

const GoalModalContent = ({ todos, setTodos }: GoalModalContentProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleRemove = (targetId: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== targetId));
  };

  const sortedTodos = [...todos].sort(
    (a, b) => Number(a.done) - Number(b.done),
  );

  return (
    <div className="flex flex-col gap-[10px] h-[470px] overflow-auto overflow-x-hidden custom-scrollbar">
      {todos.length === 0 ? (
        <span className="flex flex-1 justify-center items-center text-[20px] font-medium text-[#c4c4c4] tracking-[0.02em]">
          목표 생성하기 버튼을 눌러 <br /> 오늘의 목표를 설정하세요
        </span>
      ) : (
        sortedTodos.map((todoItem) => {
          const isCompleted = todoItem.done;
          const isEditing = editingId === todoItem.id || todoItem.text === '';

          return (
            <div
              key={todoItem.id}
              className={`flex justify-between items-center w-full max-w-[560px] h-[70px] px-[40px] py-[20px] border rounded-[10px]
                ${isCompleted ? 'bg-[#fafafa] border-[#e8e8e8]' : 'bg-white border-[#e8e8e8]'}
              `}
              style={{
                maxWidth: todos.length > 6 ? '530px' : '560px',
              }}
            >
              {isEditing ? (
                <input
                  autoFocus
                  className="w-full h-6 bg-transparent outline-none pr-5 text-[20px] font-medium text-[#555555] placeholder:text-[#c4c4c4]"
                  placeholder="세부 목표를 입력하세요"
                  value={todoItem.text}
                  onChange={(e) => {
                    const newText = e.target.value;
                    setTodos((prev) =>
                      prev.map((t) =>
                        t.id === todoItem.id ? { ...t, text: newText } : t,
                      ),
                    );
                  }}
                  onBlur={() => {
                    if (todoItem.text.trim() !== '') setEditingId(null);
                  }}
                  onFocus={() => setEditingId(todoItem.id)}
                />
              ) : (
                <span
                  onClick={() => setEditingId(todoItem.id)}
                  className={`font-medium text-[20px] cursor-text ${
                    isCompleted
                      ? 'text-[#c4c4c4] line-through'
                      : 'text-[#555555]'
                  }`}
                >
                  {todoItem.text}
                </span>
              )}

              <button onClick={() => handleRemove(todoItem.id)}>
                <CloseButton
                  className={`w-4 h-4 cursor-pointer ${
                    isCompleted ? 'hidden' : 'text-[#A7A7A7]'
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
