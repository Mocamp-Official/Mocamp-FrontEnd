import { useState } from 'react';
import TodoContainer from '@/components/todo/TodoContainer';

const initialTodos = [
  {
    id: '1',
    items: [
      { id: '1-1', text: '할 일 1', done: true },
      { id: '1-2', text: '할 일 2', done: false },
      { id: '1-3', text: '할 일 2', done: false },
      { id: '1-4', text: '할 일 2', done: false },
      { id: '1-5', text: '할 일 2', done: false },
      { id: '1-6', text: '할 일 2', done: false },
      { id: '1-7', text: '할 일 2', done: false },
      { id: '1-8', text: '할 일 2', done: false },
      { id: '1-9', text: '할 일 2', done: true },
      { id: '1-10', text: '할 일 2', done: false },
      { id: '1-11', text: '할 일 2', done: false },
      { id: '1-12', text: '할 일 2', done: false },
    ],
  },
  {
    id: '2',
    items: [],
  },
  {
    id: '3',
    items: [{ id: '3-1', text: '할 일 3', done: true }],
  },
];

const WorkspacePage = () => {
  const [todoGroups, setTodoGroups] = useState(initialTodos);

  const handleUpdateTodos = (
    groupId: string,
    updatedTodos: (typeof initialTodos)[0]['items'],
  ) => {
    setTodoGroups((prev) =>
      prev.map((group) =>
        group.id === groupId ? { ...group, items: updatedTodos } : group,
      ),
    );
  };

  return (
    <div className="flex items-center justify-center gap-5 bg-[#F2F2F2] w-screen h-screen">
      {todoGroups.map((group) => (
        <TodoContainer
          key={group.id}
          items={group.items}
          onUpdateTodos={(updated) => handleUpdateTodos(group.id, updated)}
        />
      ))}
    </div>
  );
};

export default WorkspacePage;
