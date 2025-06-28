import ParticipantedMocampItem from './content/ParticipantedMocampItem';

const ParticipantedMocamp = () => {
  return (
    <div className="flex h-[880px] w-[982px] flex-col rounded-[20px] bg-[#ffffff] p-12.5 text-2xl">
      <p className="mb-7.5">최근 참여한 모캠프</p>
      <div className="flex flex-col gap-5 overflow-y-auto">
        <ParticipantedMocampItem
          size="lg"
          isCompleted={false}
          roomName="은학샘과 아이들"
          createdAt="2025. 04. 27"
          time="3h 30m"
        />
        <ParticipantedMocampItem
          size="lg"
          isCompleted={false}
          roomName="은학샘과 아이들"
          createdAt="2025. 04. 27"
          time="3h 30m"
        />
        <ParticipantedMocampItem
          size="lg"
          isCompleted={true}
          roomName="은학샘과 아이들"
          createdAt="2025. 04. 27"
          time="3h 30m"
        />
      </div>
    </div>
  );
};

export default ParticipantedMocamp;
