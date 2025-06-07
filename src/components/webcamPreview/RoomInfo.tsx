import { RoomInfo } from '../../types/preview';

const RoomInfoSection = ({ room }: { room: RoomInfo }) => (
  <div className="box-border flex w-full flex-row items-center rounded-[10px] bg-white px-[40px] pt-[40px] pb-[24px]">
    {/* 대표 이미지 */}
    <div className="flex h-[91px] w-[91px] flex-shrink-0 items-center justify-center rounded-[10px] bg-[#D9D9D9]">
      {room.imageUrl ? (
        <img
          src={room.imageUrl}
          alt="대표 이미지"
          className="h-full w-full rounded-[10px] object-cover"
        />
      ) : null}
    </div>
    {/* 방 진행 + 방 이름 + 날짜 + 설정 시간 */}
    <div className="ml-[14px] flex h-[91px] flex-col justify-center">
      <span
        className={`font-pre text-[20px] font-semibold tracking-[-0.4px] ${room.status === '진행 전' ? 'text-[#C4C4C4]' : 'text-[var(--color-primary)]'} `}
      >
        {room.status}
      </span>
      <span className="font-pre mt-[4px] text-[20px] font-semibold tracking-[-0.4px] text-[#4B4B4B]">
        {room.name}
      </span>
      <div className="mt-[8px] flex gap-[12px]">
        <span className="font-pre text-[20px] font-medium tracking-[-0.4px] text-[#C4C4C4]">
          {room.date}
        </span>
        <span className="font-pre text-[20px] font-medium tracking-[-0.4px] text-[#C4C4C4]">
          {room.duration}
        </span>
      </div>
    </div>
  </div>
);

export default RoomInfoSection;
