import { RoomInfo } from '../../types/preview';

const RoomInfoSection = ({ room }: { room: RoomInfo }) => (
  <div className="box-border flex w-full flex-row items-center rounded-[5.333px] bg-white px-[21.33px] py-[21.33px] lg:rounded-[7.5px] lg:px-[30px] lg:py-[30px] xl:rounded-[10px] xl:px-[40px] xl:py-[40px]">
    {/* 대표 이미지 */}
    <div className="flex h-[48.533px] w-[48.533px] flex-shrink-0 items-center justify-center rounded-[5.333px] bg-[#D9D9D9] lg:h-[68.25px] lg:w-[68.25px] lg:rounded-[7.5px] xl:h-[91px] xl:w-[91px] xl:rounded-[10px]">
      {room.imageUrl ? (
        <img
          src={room.imageUrl}
          alt="대표 이미지"
          className="h-full w-full rounded-[5.333px] object-cover lg:rounded-[7.5px] xl:rounded-[10px]"
        />
      ) : null}
    </div>
    {/* 방 진행 + 방 이름 + 날짜 + 설정 시간 */}
    <div className="ml-[7.47px] flex h-[48.533px] flex-col justify-center text-[10.67px] lg:ml-[10.5px] lg:h-[68.25px] lg:text-[15px] xl:ml-[14px] xl:h-[91px] xl:text-[20px]">
      <span
        className={`font-pre font-semibold tracking-[-0.4px] ${room.status === '진행 전' ? 'text-gray6' : 'text-primary'} `}
      >
        {room.status}
      </span>
      <span className="font-pre mt-[3px] font-semibold tracking-[-0.4px] text-[#4B4B4B] lg:mt-[4px] xl:mt-[5px]">
        {room.name}
      </span>
      <div className="mt-[1px] flex gap-[6px] lg:mt-[3px] lg:gap-[8px] xl:mt-[4px] xl:gap-[10px]">
        <span className="font-pre text-gray6 font-medium tracking-[-0.4px]">{room.date}</span>
        <span className="font-pre text-gray6 font-medium tracking-[-0.4px]">{room.duration}</span>
      </div>
    </div>
  </div>
);

export default RoomInfoSection;
