import LockIcon from '@/public/svgs/LockIcon.svg';

const TodoSecretContent = () => {
  return (
    <div className="absolute top-0 left-0 z-10 flex h-full w-full flex-col items-center gap-4 rounded-[20px] pt-[261px] backdrop-blur-lg">
      <LockIcon className="h-[70px] w-[70px]" />
      <span className="text-title1 text-gray9 text-3xl">비공개 목표입니다.</span>
    </div>
  );
};

export default TodoSecretContent;
