interface Todo {
  text: string;
  done: boolean;
}

interface TodoCardProps {
  items: Todo[];
  onToggle: (index: number) => void;
}

const TodoCard = ({ items, onToggle }: TodoCardProps) => {
  return (
    <div className="flex h-[479.6px] w-full rounded-[20px] bg-[#fefefe] py-[20.32px] pl-[50px] pr-[10px]">
      <div className="custom-scrollbar flex w-full flex-col gap-[20.32px] overflow-y-auto pt-[30.48px]">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex cursor-pointer items-center gap-5"
            onClick={() => onToggle(index)}
          >
            <div
              className={`h-[40.645px] w-[40px] shrink-0 rounded-[10px] border transition-colors duration-200 ${item.done ? 'border-[#27cfa5] bg-[#BEF1E4]' : 'border-[#E8E8E8] bg-[#ffffff]'}`}
            />
            <span
              className={`max-w-[320px] overflow-hidden whitespace-nowrap pr-5 text-xl font-medium transition-all duration-200 ${item.done ? 'text-[#a7a7a7] line-through' : 'text-[#555]'}`}
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
