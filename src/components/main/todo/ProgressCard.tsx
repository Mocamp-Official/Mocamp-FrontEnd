import ProgressBadge from './ProgressBadge';
import ProgressText from './ProgressText';
import ProgressBar from './ProgressBar';

interface ProgressCardProps {
  progress: number;
}

const ProgressCard = ({ progress }: ProgressCardProps) => {
  return (
    <div className="flex flex-col items-center ">
      <div className="flex flex-col justify-between w-[480px] h-[150.38px] px-[30px] py-[30.48px] rounded-[20px] bg-[#FEFEFE]">
        <div className="flex items-center">
          <ProgressBadge progress={progress} />
          <ProgressText progress={progress} />
        </div>
        <ProgressBar progress={progress} />
      </div>
      <div className="w-[445px] h-[2px] bg-[length:20px_2px] bg-repeat-x bg-[repeating-linear-gradient(to_right,#F2F2F2_0_10px,transparent_10px_20px)]" />
    </div>
  );
};

export default ProgressCard;
