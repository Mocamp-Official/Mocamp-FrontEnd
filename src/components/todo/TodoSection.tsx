import TodoEmptyContent from './TodoEmptyContent';
import ProgressCard from '@/components/todo/progress/ProgressCard';
import TodoCard from './TodoCard';
import { Todo } from '@/types/todo';
import { useRoomPublisher } from '@/hooks/useRoomPublisher';

interface TodoSectionProps {
  roomId: string;
  todos: Todo[];
  setTodos: (newTodos: Todo[]) => void;
}

const TodoSection = ({ roomId, todos, setTodos }: TodoSectionProps) => {
  const { toggleTodo } = useRoomPublisher(roomId);

  const doneCount = todos.filter((t) => t.done).length;

  const handleToggleDone = (targetId: string) => {
    const current = todos.find((t) => t.id === targetId);
    if (!current) return;

    const newDone = !current.done;
    toggleTodo(targetId, newDone);
  };

  return (
    <div className="flex h-[630px] w-[480px] max-w-[1480px] items-center justify-center overflow-x-auto">
      <div className="relative flex h-full w-full flex-col items-center">
        <div className="absolute top-[149.5px] h-[2px] w-[445px] bg-[repeating-linear-gradient(to_right,#F2F2F2_0_10px,transparent_10px_20px)] bg-[length:20px_2px] bg-repeat-x" />

        <ProgressCard
          roomId={roomId}
          todos={todos}
          done={doneCount}
          total={todos.length}
          onUpdateTodos={setTodos}
        />

        {todos.length > 0 ? (
          <TodoCard items={todos} onToggle={handleToggleDone} />
        ) : (
          <TodoEmptyContent onAddTodos={setTodos} roomId={roomId} />
        )}
      </div>
    </div>
  );
};

export default TodoSection;
