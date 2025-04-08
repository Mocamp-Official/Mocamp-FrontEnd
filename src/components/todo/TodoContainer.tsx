import TodoNoContent from './TodoNoContent';
import ProgressCard from '@/components/todo/progress/ProgressCard';
import TodoCard from './TodoCard';

interface TodoContainerProps {
  items: { text: string; done: boolean }[];
}

const TodoContainer = ({ items }: TodoContainerProps) => {
  const doneCount = items.filter((item) => item.done).length;
  const progress = items.length
    ? Math.round((doneCount / items.length) * 100)
    : 0;

  return (
    <div className="w-[480px] h-[630px] flex items-center justify-center ">
      {items.length ? (
        <div className="flex flex-col w-full h-full relative items-center">
          <div className="absolute top-[149.5px] w-[445px] h-[2px] bg-[length:20px_2px] bg-repeat-x bg-[repeating-linear-gradient(to_right,#F2F2F2_0_10px,transparent_10px_20px)]" />
          <ProgressCard progress={progress} />
          <TodoCard items={items} />
        </div>
      ) : (
        <TodoNoContent />
      )}
    </div>
  );
};

export default TodoContainer;
