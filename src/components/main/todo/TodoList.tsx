import { useState } from 'react';

interface Todo {
  text: string;
  done: boolean;
}

interface TodoCardProps {
  items: Todo[];
}

const TodoList = ({ items }: TodoCardProps) => {
  const [todos, setTodos] = useState(items);

  const toggleDone = (idx: number) => {
    setTodos((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, done: !item.done } : item)),
    );
  };

  return (
    <div className="flex flex-col w-full h-[479.6px] rounded-[20px] overflow-y-auto bg-[#fefefe] py-[50.81px] px-[50px] gap-[20.32px]">
      {todos.map((item, idx) => (
        <div
          key={idx}
          className="flex items-center gap-5 cursor-pointer"
          onClick={() => toggleDone(idx)}
        >
          <div
            className={`w-[40px] h-[40.645px] rounded-[10px] border-[1px] transition-colors duration-200 
            ${item.done ? 'bg-[#BEF1E4] border-[#27cfa5]' : 'bg-[#ffffff] border-[#E8E8E8]'}`}
          />

          <span
            className={`text-xl font-medium transition-all duration-200
            ${item.done ? 'text-[#a7a7a7] line-through' : 'text-[#555]'}`}
          >
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
