interface ButtonsProps {
  isHost: boolean;
  roomName: string;
  onEditRoom: () => void;
  onEnterRoom: () => void;
}

const Buttons = ({ isHost, roomName, onEditRoom, onEnterRoom }: ButtonsProps) => {
  if (isHost) {
    return (
      <div className="flex gap-4">
        <button
          className="font-pre flex h-[84px] w-[250px] items-center justify-center rounded-[10px] border border-[var(--color-primary)] bg-[var(--color-gray1)] p-[30px_40px] text-[20px] font-semibold tracking-[-0.4px] text-[var(--color-primary)]"
          onClick={onEditRoom}
        >
          방 정보 수정하기
        </button>
        <button
          className="font-pre flex h-[84px] w-[290px] items-center justify-center rounded-[10px] bg-[var(--color-primary)] p-[30px_40px] text-[20px] font-semibold tracking-[-0.4px] text-white"
          onClick={onEnterRoom}
        >
          {roomName} 입장하기
        </button>
      </div>
    );
  }
  return (
    <button
      className="font-pre flex h-[84px] w-[560px] items-center justify-center rounded-[10px] bg-[var(--color-primary)] p-[30px_40px] text-[20px] font-semibold tracking-[-0.4px] text-white"
      onClick={onEnterRoom}
    >
      {roomName} 입장하기
    </button>
  );
};

export default Buttons;
