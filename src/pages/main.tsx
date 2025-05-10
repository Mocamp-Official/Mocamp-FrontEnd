import TodoContainer from '@/components/todo/TodoContainer';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar'; //확인
const mockTodos = [
  {
    id: 1,
    items: [
      { text: '할 일 1', done: true },
      { text: '할 일 2', done: false },
      { text: '할 일 2', done: false },
      { text: '할 일 2', done: false },
      { text: '할 일 2', done: false },
      { text: '할 일 2', done: false },
      { text: '할 일 2', done: false },
      { text: '할 일 2', done: false },
      { text: '할 일 2', done: true },
      { text: '할 일 2', done: false },
      { text: '할 일 2', done: false },
      { text: '할 일 2', done: false },
    ],
  },
  { id: 2, items: [] },
  { id: 3, items: [{ text: '할 일 3', done: true }] },

  
];
// sidebar 목업업 //확인
const startTime = new Date();
const endTime = new Date(Date.now() + 60 * 60 * 1000); 
const participants = 6;


const WorkspacePage = () => {
  return (
    <>
    <Header status="workspace" />
      <Sidebar //확인
        startTime={startTime}
        endTime={endTime}
        participants={participants}
      />
      <div className="flex items-center justify-center gap-5 bg-[#F2F2F2] w-screen h-screen">
        {mockTodos.map((todo) => (
          <TodoContainer key={todo.id} items={todo.items} />
        ))}
      </div>
    </>
  );
};

export default WorkspacePage;
