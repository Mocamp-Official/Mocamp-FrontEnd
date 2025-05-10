interface ProgressBadgeProps {
  done: number;
  total: number;
}

const ProgressBadge = ({ done, total }: ProgressBadgeProps) => {
  const progressPercent = total === 0 ? 0 : Math.round((done / total) * 100);

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
      text: 'text-[#C4C4C4]',
      border: 'border-[#E6E6E6]',
      bg: 'bg-[#F2F2F2]',
    };
  };

  const { text, border, bg } = getBadgeStyle(progressPercent);

  return (
    <div
      className={`flex justify-center items-center w-[100px] h-[40.64px] rounded-[20px] border ${text} ${border} ${bg}`}
    >
      <span className="text-lg font-semibold">
        {done} / {total}
      </span>
    </div>
  );
};

export default ProgressBadge;
