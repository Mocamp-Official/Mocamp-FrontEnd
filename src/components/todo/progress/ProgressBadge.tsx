interface ProgressBadgeProps {
  progress: number;
}

const ProgressBadge = ({ progress }: ProgressBadgeProps) => {
  const getBadgeStyle = (value: number) => {
    if (value === 100) {
      return {
        text: 'text-[#FF0000]',
        border: 'border-[#FF0000]',
        bg: 'bg-[#FAE9E9]',
      };
    }

    if (value > 0) {
      return {
        text: 'text-[#0096FF]',
        border: 'border-[#0096FF]',
        bg: 'bg-[#D7F0FF]',
      };
    }

    return {
      text: 'text-white',
      border: 'border-blue-400',
      bg: 'bg-blue-400',
    };
  };

  const { text, border, bg } = getBadgeStyle(progress);

  return (
    <div
      className={`flex justify-center items-center w-[100px] h-[40.64px] rounded-[20px] border-[1px] ${text} ${border} ${bg}`}
    >
      <span className="text-lg font-semibold">{progress}%</span>
    </div>
  );
};

export default ProgressBadge;
