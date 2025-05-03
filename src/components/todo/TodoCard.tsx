interface Todo {
  text: string;
  done: boolean;
}

interface TodoCardProps {
  items: Todo[];
  onToggle: (idx: number) => void;
}

const TodoCard = ({ items, onToggle }: TodoCardProps) => {
  return (
    <div className="flex w-full h-[479.6px] rounded-[20px] bg-[#fefefe] py-[20.32px] pl-[50px] pr-[10px] ">
      <div className="flex w-full pt-[30.48px] gap-[20.32px] flex-col overflow-y-auto custom-scrollbar">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-5 cursor-pointer"
            onClick={() => onToggle(idx)}
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
    </div>
  );
};

export default TodoCard;
