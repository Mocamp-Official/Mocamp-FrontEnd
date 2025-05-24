// 차트 데이터 (높이는 실제 데이터에 맞게 조정)
const chartData = [
  { date: '4.20', value: 2, height: 50, color: 'bg-[#E9FAF6]' }, // 가장 연한 색
  { date: '4.21', value: 4, height: 100, color: 'bg-[#D4F5ED]' },
  { date: '4.22', value: 6, height: 150, color: 'bg-[#BEF1E4]' },
  { date: '4.23', value: 8, height: 200, color: 'bg-[#A9ECDB]' },
  { date: '4.24', value: 10, height: 250, color: 'bg-[#93E7D2]' },
  { date: '4.25', value: 12, height: 300, color: 'bg-[#7DE2C9]' },
  { date: '4.26', value: 13, height: 325, color: 'bg-[#68DDC0]' },
  { date: '4.27', value: 14, height: 350, color: 'bg-[#52D9B7]' }, // 가장 진한 색
];

const GoalGraph = () => {
  return (
    <div className="flex items-start gap-4 w-[536px]">
      {/* y축 라벨 */}
      <div className="flex flex-col justify-between h-[350px] text-sm text-[#999] pt-2 w-[40px] text-right">
        <span>14개</span>
        <span>12개</span>
        <span>10개</span>
        <span>8개</span>
        <span>6개</span>
        <span>4개</span>
        <span>2개</span>
        <span>0개</span>
      </div>

      {/* 차트 영역 */}
      <div className="flex flex-col flex-1">
        {/* 바 차트 */}
        <div className="h-[350px] flex items-end justify-between gap-3 relative px-2">
          {/* 그리드 라인들 (배경) */}
          <div className="absolute inset-0  flex flex-col justify-between pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-full h-px bg-[#E8E8E8]" />
            ))}
          </div>

          {/* 바 차트 막대들 */}
          {chartData.map((item, index) => (
            <div
              key={item.date}
              className={`w-[48px] ${item.color} rounded-t-sm relative transition-all duration-300 hover:opacity-80 mix-blend-multiply border border-1 border-[#27CFA5] border-opacity-50`}
              style={{ height: `${item.height}px` }}
            />
          ))}
        </div>

        {/* x축 라벨 */}
        <div className="flex justify-between mt-3 text-sm text-[#999] px-2">
          {chartData.map((item) => (
            <span key={item.date} className="w-[48px] text-center">
              {item.date}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoalGraph;
