import clsx from 'clsx';
import { Todo } from '@/types/todo';

interface TodoCardProps {
  items: Todo[];
  onToggle: (id: number, isCompleted: boolean) => void;
  editable?: boolean;
}

const TodoCard = ({ items, onToggle, editable }: TodoCardProps) => {
  const handleKeyDown = (e: React.KeyboardEvent, id: number, done: boolean) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle(id, done);
    }
  };

  return (
    <div className="flex h-[479.6px] w-full rounded-[20px] bg-[#fefefe] py-[50px] pr-[10px] pl-[50px]">
      <div className="custom-scrollbar flex w-full flex-col gap-[20.32px] overflow-y-auto">
        {items.map((item) => (
          <div
            key={item.goalId}
            role={editable ? 'button' : undefined}
            tabIndex={editable ? 0 : -1}
            aria-checked={item.isCompleted}
            aria-disabled={!editable}
            onClick={editable ? () => onToggle(item.goalId, !item.isCompleted) : undefined}
            onKeyDown={(e) => handleKeyDown(e, item.goalId, !item.isCompleted)}
            className={clsx(
              'flex items-center gap-5',
              editable ? 'cursor-pointer' : 'cursor-default',
            )}
          >
            <div
              className={clsx(
                'h-[40.645px] w-[40px] shrink-0 self-baseline rounded-[10px] border transition-colors duration-200',
                item.isCompleted
                  ? 'border-[#27cfa5] bg-[#BEF1E4]'
                  : 'border-[#E8E8E8] bg-[#ffffff]',
              )}
            />
            <span
              className={clsx(
                'w-full max-w-[320px] overflow-hidden text-xl font-medium whitespace-pre-line transition-all duration-200',
                item.isCompleted ? 'text-[#a7a7a7] line-through' : 'text-[#555]',
              )}
            >
              {item.content}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoCard;
