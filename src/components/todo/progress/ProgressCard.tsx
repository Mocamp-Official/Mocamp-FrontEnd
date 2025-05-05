import ProgressBadge from './ProgressBadge';
import ProgressText from './ProgressText';
import ProgressBar from './ProgressBar';
import MoreMenu from './MoreMenu';

interface ProgressCardProps {
  done: number;
  total: number;
}

const ProgressCard = ({ done, total }: ProgressCardProps) => {
  const progress = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="flex flex-col justify-between w-[480px] h-[150.38px] px-[30px] py-[30.48px] rounded-[20px] bg-[#FEFEFE]">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <ProgressBadge done={done} total={total} />
          <ProgressText progress={progress} />
        </div>
        <MoreMenu
          onEditCommitment={() => console.log('다짐 수정')}
          onEditGoal={() => console.log('목표 수정')}
        />
      </div>
      <ProgressBar progress={progress} />
    </div>
  );
};

export default ProgressCard;
