const TodoNoContent = () => {
  return (
    <div className="flex flex-col items-center w-[480px] h-full pt-[255px] gap-5 bg-[#FEFEFE]  rounded-[20px]">
      <span className="text-[#C4C4C4] font-semibold text-2xl">
        오늘의 목표는 무엇인가요?
      </span>
      <button className="w-[160px] h-[60px] rounded-[10px] bg-[#27CFA5] text-2xl text-white font-semibold">
        추가하기
      </button>
    </div>
  );
};

export default TodoNoContent;
