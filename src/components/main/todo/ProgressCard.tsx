import ProgressBadge from './ProgressBadge';
import ProgressText from './ProgressText';
import ProgressBar from './ProgressBar';

interface ProgressCardProps {
  progress: number;
}

const ProgressCard = ({ progress }: ProgressCardProps) => {
  return (
    <div className="flex flex-col justify-between w-[480px] h-[150.38px] px-[30px] py-[30.48px] rounded-[20px] bg-[#FEFEFE]">
      <div className="flex items-center">
        <ProgressBadge progress={progress} />
        <ProgressText progress={progress} />
      </div>
      <ProgressBar progress={progress} />
    </div>
  );
};

export default ProgressCard;
