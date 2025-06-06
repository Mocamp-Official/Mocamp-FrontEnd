import CommentIcon from '@/public/svgs/comment_icon.svg';

const TimeAchievement = () => {
  return (
    <div>
      <div className="flex flex-col w-[250px]">
        <div className="h-[50px] rounded-tl-[10px] rounded-tr-[10px] bg-[#27cfa5] flex items-center justify-center">
          <p className="text-base font-semibold text-white">주은님이 그동안 집중한 시간은?</p>
        </div>
        <div className="h-20 rounded-bl-[10px] rounded-br-[10px] bg-white border border-[#e8e8e8] flex items-center justify-center">
          <p className="text-[28px] font-semibold text-[#4b4b4b]">123개</p>
        </div>
      </div>
      <div className="flex relative justify-center mt-2">
        <CommentIcon />
        <p className="absolute top-3 inset-0 flex items-center justify-center text-base font-medium text-[#00af83]">
          영화 한 편 볼 시간동안 집중했어요!
        </p>
      </div>
    </div>
  );
};

export default TimeAchievement;
