import ParticipatedCard from './content/ParticipatedCard';
import ArrowIcon from '@/public/svgs/arrow_icon.svg';

const Content = () => {
  const isCompleted = false;
  const roomName = '은학샘과 아이들';
  const createdAt = '2025.04.27';
  const time = '3h 30m';
  return (
    <div className="w-[982px] h-[880px] rounded-[20px] bg-[#ffffff] p-8 flex flex-col gap-8">
      <div>
        <p className="text-2xl font-semibold text-[#4b4b4b] mb-4">참여한 모캠프</p>
        <div className="flex gap-5 items-center">
          {/* 캠프 카드 1 */}
          <ParticipatedCard
            size={'l'}
            isCompleted={isCompleted}
            roomName={roomName}
            createdAt={createdAt}
            time={time}
          ></ParticipatedCard>
          <ParticipatedCard
            size={'l'}
            isCompleted={true}
            roomName={roomName}
            createdAt={createdAt}
            time={time}
          ></ParticipatedCard>
          <div className="flex cursor-pointer w-[60px] h-[60px] rounded-full border border-[#E8E8E8] justify-center items-center ">
            <ArrowIcon />
          </div>
        </div>
      </div>

      {/* 중간: 목표 달성 수 및 그래프 */}
      <div className="flex flex-col gap-4 bg-white border border-[#e8e8e8] rounded-[10px] p-6">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-semibold text-[#4b4b4b]">모캠프 사용 추이</p>
          <div className="flex items-center gap-2.5 p-2.5 rounded-[10px] bg-white border border-[#e8e8e8]">
            <p className="text-base font-semibold text-[#555]">목표 달성 수</p>
            <svg width={10} height={9} viewBox="0 0 10 9" fill="none">
              <path
                d="M1 1.5L4.58398 6.87596C4.78189 7.17283 5.21811 7.17283 5.41603 6.87596L9 1.5"
                stroke="#27CFA5"
                strokeWidth={2}
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        {/* 목표 달성 요약 */}
        <div className="flex gap-4 items-center">
          <div className="flex flex-col w-[250px]">
            <div className="h-[50px] rounded-tl-[10px] rounded-tr-[10px] bg-[#27cfa5] flex items-center justify-center">
              <p className="text-base font-semibold text-white">
                주은님이 그동안 완료한 목표 수는?
              </p>
            </div>
            <div className="h-20 rounded-bl-[10px] rounded-br-[10px] bg-white border border-[#e8e8e8] flex items-center justify-center">
              <p className="text-[28px] font-semibold text-[#4b4b4b]">123개</p>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center">
            {/* 그래프 영역 */}
            <div className="w-full h-[300px] flex items-end gap-2">
              {/* 예시: 바 차트 */}
              <div className="w-[50px] h-[51px] bg-[#e9faf6] border border-[#27cfa5]/50" />
              <div className="w-[50px] h-[101px] bg-[#d4f5ed] border border-[#27cfa5]/50" />
              <div className="w-[50px] h-[151px] bg-[#bef1e4] border border-[#27cfa5]/50" />
              <div className="w-[50px] h-[201px] bg-[#a9ecdb] border border-[#27cfa5]/50" />
              <div className="w-[50px] h-[251px] bg-[#93e7d2] border border-[#27cfa5]/50" />
              <div className="w-[50px] h-[301px] bg-[#7de2c9] border border-[#27cfa5]/50" />
              <div className="w-[50px] h-[351px] bg-[#68ddc0] border border-[#27cfa5]/50" />
              <div className="w-[50px] h-[351px] bg-[#52d9b7] border border-[#27cfa5]/50" />
            </div>
            {/* x축 라벨 */}
            <div className="flex justify-between w-full mt-2 text-base text-[#555]">
              <span>4.20</span>
              <span>4.21</span>
              <span>4.22</span>
              <span>4.23</span>
              <span>4.24</span>
              <span>4.25</span>
              <span>4.26</span>
              <span>4.27</span>
            </div>
          </div>
          {/* y축 라벨 */}
          <div className="flex flex-col justify-between h-[300px] ml-4 text-base text-right text-[#555]">
            <span>14개</span>
            <span>12개</span>
            <span>10개</span>
            <span>8개</span>
            <span>6개</span>
            <span>4개</span>
            <span>2개</span>
          </div>
        </div>
        {/* 하단 멘트 */}
        <div className="flex justify-center mt-2">
          <svg width={246} height={57} viewBox="0 0 246 57" fill="none">
            <path
              d="M128.773 10H241C243.761 10 246 12.2386 246 15V52C246 54.7614 243.761 57 241 57H5C2.23858 57 5.63741e-08 54.7614 0 52V15C0 12.2386 2.23858 10 5 10H117.227L123 0L128.773 10Z"
              fill="#BEF1E4"
            />
            <path
              d="M128.773 10H241C243.761 10 246 12.2386 246 15V52C246 54.7614 243.761 57 241 57H5C2.23858 57 5.63741e-08 54.7614 0 52V15C0 12.2386 2.23858 10 5 10H117.227L123 0L128.773 10Z"
              stroke="#27CFA5"
            />
          </svg>
          <p className="absolute text-base font-medium text-[#00af83]">여기 멘트 뭐하지</p>
        </div>
      </div>
    </div>
  );
};

export default Content;
