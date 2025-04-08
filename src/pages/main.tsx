import TodoCard from '@/components/main/todo/TodoCard';

const mockTodos = [
  {
    id: 1,
    items: [
      { text: '할 일 1', done: true },
      { text: '할 일 2', done: false },
    ],
  },
  { id: 2, items: [] },
  { id: 3, items: [{ text: '할 일 3', done: true }] },
];

const WorkspacePage = () => {
  return (
    <div className="flex items-center justify-center gap-5 bg-[#F2F2F2] w-screen h-screen">
      {mockTodos.map((todo) => (
        <TodoCard key={todo.id} items={todo.items} />
      ))}
    </div>
  );
};

export default WorkspacePage;
