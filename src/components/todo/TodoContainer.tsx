import { useState } from 'react';
import TodoNoContent from './TodoNoContent';
import ProgressCard from '@/components/todo/progress/ProgressCard';
import TodoCard from './TodoCard';
import { Todo } from '@/types/todo';

interface TodoContainerProps {
  items: Todo[];
  onUpdateTodos: (updatedTodos: Todo[]) => void;
}

const TodoContainer = ({ items, onUpdateTodos }: TodoContainerProps) => {
  const [todos, setTodos] = useState(items);

  const doneCount = todos.filter((item) => item.done).length;
  const totalCount = todos.length;

  const handleToggleDone = (targetIndex: number) => {
    setTodos((prev) =>
      prev.map((todo, index) =>
        index === targetIndex ? { ...todo, done: !todo.done } : todo,
      ),
    );
  };

  return (
    <div className="flex h-[630px] w-[480px] items-center justify-center">
      {totalCount ? (
        <div className="relative flex h-full w-full flex-col items-center">
          <div className="absolute top-[149.5px] h-[2px] w-[445px] bg-[repeating-linear-gradient(to_right,#F2F2F2_0_10px,transparent_10px_20px)] bg-[length:20px_2px] bg-repeat-x" />
          <ProgressCard
            todos={todos}
            done={doneCount}
            total={totalCount}
            onUpdateTodos={setTodos}
          />
          <TodoCard items={todos} onToggle={handleToggleDone} />
        </div>
      ) : (
        <TodoNoContent
          onAddTodos={(newTodos) => {
            setTodos(newTodos);
          }}
        />
      )}
    </div>
  );
};

export default TodoContainer;
