interface ProgressRateBadgeProps {
  progress: number;
}

const ProgressBadge = ({ progress }: ProgressRateBadgeProps) => {
  const getColor = (value: number) => {
    if (value === 100) return 'text-[#FF0000] border-[#FF0000] bg-[#FAE9E9]';
    if (value > 0) return 'text-[#0096FF] border-[#0096FF] bg-[#D7F0FF]';
    return 'bg-blue-400'; // 여기 스타일 수정
  };

  return (
    <div
      className={`flex justify-center items-center w-[100px] h-[40.64px] rounded-[20px] border-[1px] ${getColor(progress)}`}
    >
      <span className="flex items-center h-[21.33px] text-lg font-semibold">
        {progress}%
      </span>
    </div>
  );
};
export default ProgressBadge;
