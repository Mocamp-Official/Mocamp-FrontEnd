import ProgressBadge from './ProgressBadge';
import ProgressText from './ProgressText';
import ProgressBar from './ProgressBar';

interface ProgressCardProps {
  done: number;
  total: number;
}

const ProgressCard = ({ done, total }: ProgressCardProps) => {
  const progress = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <div className="flex flex-col justify-between w-[480px] h-[150.38px] px-[30px] py-[30.48px] rounded-[20px] bg-[#FEFEFE]">
      <div className="flex items-center">
        <ProgressBadge done={done} total={total} />
        <ProgressText progress={progress} />
      </div>
      <ProgressBar progress={progress} />
    </div>
  );
};

export default ProgressCard;
