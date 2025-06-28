import TodoEmptyContent from './TodoEmptyContent';
import ProgressCard from '@/components/todo/progress/ProgressCard';
import TodoSecretContent from './TodoSecretContent';
import TodoCard from './TodoCard';

import { Todo } from '@/types/todo';
import { useRoomPublisher } from '@/hooks/room/useRoomPublisher';

interface TodoSectionProps {
  roomId: string;
  todos: Todo[];
  resolution: string;
  isMyGoal: boolean;
  isSecret: boolean;
  setTodos: (newTodos: Todo[]) => void;
}
const TodoSection = ({
  roomId,
  todos,
  setTodos,
  resolution,
  isMyGoal,
  isSecret,
}: TodoSectionProps) => {
  const { toggleTodo } = useRoomPublisher(roomId);

  const handleToggleDone = (targetId: number, newDone: boolean) => {
    const updatedTodos = todos.map((todo) =>
      todo.goalId === targetId ? { ...todo, isCompleted: newDone } : todo,
    );
    setTodos(updatedTodos);
    toggleTodo(targetId, newDone);
  };

  const doneCount = todos.filter((t) => t.isCompleted).length;
  const shouldHide = isSecret && !isMyGoal;

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
          resolution={resolution}
          isMyGoal={isMyGoal}
          isSecret={isSecret}
        />

        {todos.length > 0 ? (
          <TodoCard items={todos} onToggle={handleToggleDone} editable={isMyGoal} />
        ) : (
          <TodoEmptyContent
            onAddTodos={setTodos}
            roomId={roomId}
            isMyGoal={isMyGoal}
            isSecret={isSecret}
          />
        )}

        {/* 비공개 오버레이 */}
        {shouldHide && <TodoSecretContent />}
      </div>
    </div>
  );
};

export default TodoSection;
