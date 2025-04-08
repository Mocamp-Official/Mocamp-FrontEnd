import NoContent from './NoContent';
import ProgressCard from './ProgressCard';

interface TodoCardProps {
  items: { done: boolean }[];
}

const TodoCard = ({ items }: TodoCardProps) => {
  const doneCount = items.filter((item) => item.done).length;
  const progress = items.length
    ? Math.round((doneCount / items.length) * 100)
    : 0;

  return (
    <div className="w-[480px] h-[630px] flex items-center justify-center">
      {items.length ? (
        <div className="flex flex-col w-full h-full">
          <ProgressCard progress={progress} />
        </div>
      ) : (
        <NoContent />
      )}
    </div>
  );
};

export default TodoCard;
