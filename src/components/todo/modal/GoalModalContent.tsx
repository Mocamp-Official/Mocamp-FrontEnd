import { useState } from 'react';
import { Todo } from '@/types/todo';
import CloseButton from '@/public/svgs/CloseButton.svg';

interface GoalModalContentProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  mode: 'add' | 'edit';
}

const GoalModalContent = ({ todos, setTodos }: GoalModalContentProps) => {
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleRemove = (targetId: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.goalId !== targetId));
  };

  const sortedTodos = [...todos].sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));

  return (
    <div className="custom-scrollbar flex h-[470px] flex-col gap-[10px] overflow-auto overflow-x-hidden">
      {todos.length === 0 ? (
        <span className="flex flex-1 items-center justify-center text-[20px] font-medium tracking-[0.02em] text-[#c4c4c4]">
          목표 생성하기 버튼을 눌러 <br /> 오늘의 목표를 설정하세요
        </span>
      ) : (
        sortedTodos.map((todoItem) => {
          const isCompleted = todoItem.isCompleted;
          const isEditing = editingId === todoItem.goalId || todoItem.content === '';

          return (
            <div
              key={todoItem.goalId}
              className={`flex h-fit w-full max-w-[560px] items-center justify-between rounded-[10px] border px-10 py-[23px] ${isCompleted ? 'border-[#e8e8e8] bg-[#fafafa]' : 'border-[#e8e8e8] bg-white'} `}
              style={{
                maxWidth: todos.length > 6 ? '530px' : '560px',
              }}
            >
              <div className="flex min-h-6 w-[404px]">
                {isEditing ? (
                  <textarea
                    autoFocus
                    rows={1}
                    maxLength={40}
                    className="h-6 max-h-12 w-full resize-none overflow-hidden bg-transparent pt-[2px] text-[20px] leading-snug font-medium whitespace-pre-wrap text-[#555555] outline-none placeholder:text-[#c4c4c4]"
                    placeholder="세부 목표를 입력하세요"
                    value={todoItem.content}
                    onChange={(e) => {
                      const text = e.target.value;
                      const maxNewlines = 1; // 2줄까지 허용

                      const newlineCount = (text.match(/\n/g) || []).length;
                      if (newlineCount > maxNewlines) return;

                      setTodos((prev) =>
                        prev.map((t) =>
                          t.goalId === todoItem.goalId ? { ...t, content: text } : t,
                        ),
                      );
                    }}
                    onFocus={() => setEditingId(todoItem.goalId)}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = `${target.scrollHeight}px`;
                    }}
                  />
                ) : (
                  <span
                    onClick={() => setEditingId(todoItem.goalId)}
                    className={`cursor-text text-[20px] font-medium whitespace-pre-wrap ${
                      isCompleted ? 'text-[#c4c4c4] line-through' : 'text-[#555555]'
                    }`}
                  >
                    {todoItem.content}
                  </span>
                )}
              </div>

              <button onClick={() => handleRemove(todoItem.goalId)}>
                <CloseButton
                  className={`h-4 w-4 cursor-pointer ${isCompleted ? 'hidden' : 'text-[#A7A7A7]'}`}
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
