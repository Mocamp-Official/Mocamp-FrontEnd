import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

interface TimeItem {
  date: string;
  duration: number;
}

interface TimeGraphProps {
  timeList: TimeItem[];
}

const TimeGraph = ({ timeList }: TimeGraphProps) => {
  return (
    <div className="h-[390px] w-[553px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={timeList} margin={{ top: 20, right: 30, left: 40, bottom: 20 }}>
          {/* 그래디언트 정의 */}
          <defs>
            <linearGradient id="colorDuration" x1="0" y1="0" x2="0" y2="1">
              <stop offset="60%" stopColor="#27CFA5" stopOpacity={1} />
              <stop offset="100%" stopColor="#BEF1E4" stopOpacity={0.9} />
            </linearGradient>
          </defs>

          {/* x축 */}
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#555555', fontSize: 16, fontWeight: 400 }}
            tickMargin={11.5}
          />

          {/* y축 */}
          {/* <YAxis
            domain={[0, 210]} // 필요 시 최대 duration 기준으로 자동 설정 가능
            ticks={[30, 60, 90, 120, 150, 180, 210]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#555555', fontSize: 16 }}
            tickFormatter={(value) => `${value}분`}
            tickMargin={18}
          /> */}
          <YAxis
            domain={[0, 1200]} // 최대 20시간 (20 * 60)
            ticks={[300, 600, 900, 1200]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#555555', fontSize: 16 }}
            tickFormatter={(value) => `${value / 60}시간`}
            tickMargin={18}
          />

          {/* 배경 그리드 */}
          <CartesianGrid
            stroke="#e0e0e0"
            strokeDasharray="1 1"
            horizontal={true}
            vertical={false}
          />

          {/* 세로 참조선 */}
          {timeList.map((entry, index) => (
            <ReferenceLine
              key={index}
              x={entry.date}
              stroke="#e0e0e0"
              strokeDasharray="1 1"
              segment={[
                { x: entry.date, y: 0 },
                { x: entry.date, y: entry.duration },
              ]}
            />
          ))}

          {/* 툴팁 */}
          <Tooltip
            formatter={(value) => [`${value}분`, '시간']}
            labelStyle={{ color: '#666' }}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />

          {/* 영역 그래프 */}
          <Area
            type="linear"
            dataKey="duration"
            stroke="#27CFA5"
            strokeWidth={2}
            fill="url(#colorDuration)"
            dot={{
              r: 4,
              fill: '#27CFA5',
              strokeWidth: 2,
              stroke: '#27CFA5',
            }}
            activeDot={{ r: 6, fill: '#27CFA5' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeGraph;
