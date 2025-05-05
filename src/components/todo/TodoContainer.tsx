import { useState } from 'react';
import TodoNoContent from './TodoNoContent';
import ProgressCard from '@/components/todo/progress/ProgressCard';
import TodoCard from './TodoCard';

interface Todo {
  text: string;
  done: boolean;
}

interface TodoContainerProps {
  items: Todo[];
}

const TodoContainer = ({ items }: TodoContainerProps) => {
  const [todos, setTodos] = useState(items);

  const doneCount = todos.filter((item) => item.done).length;
  const totalCount = todos.length;

  const toggleDone = (index: number) => {
    setTodos((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, done: !item.done } : item,
      ),
    );
  };

  return (
    <div className="w-[480px] h-[630px] flex items-center justify-center ">
      {totalCount ? (
        <div className="flex flex-col w-full h-full relative items-center">
          <div className="absolute top-[149.5px] w-[445px] h-[2px] bg-[length:20px_2px] bg-repeat-x bg-[repeating-linear-gradient(to_right,#F2F2F2_0_10px,transparent_10px_20px)]" />
          <ProgressCard done={doneCount} total={totalCount} />
          <TodoCard items={todos} onToggle={toggleDone} />
        </div>
      ) : (
        <TodoNoContent />
      )}
    </div>
  );
};

export default TodoContainer;
