import { Participant } from '@/types/webCam';
import CloseButton from '@/public/svgs/CloseButton.svg';

interface DelegationModalProps {
  participants: Participant[];
  currentUserId: number;
  selectedUserId: number | null;
  onSelect: (userId: number) => void;
  onConfirm: () => void;
  onClose: () => void;
}

const DelegationModal = ({
  participants,
  currentUserId,
  selectedUserId,
  onSelect,
  onConfirm,
  onClose,
}: DelegationModalProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="relative h-[406px] w-[660px] rounded-[16px] bg-white p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-[50px] left-[585px] h-[25px] w-[25px]">
          <CloseButton />
        </button>
        <h3 className="text-[32px] font-semibold tracking-[-0.64px] text-[#555]">
          방장 권한 위임하기
        </h3>
        <p className="text-[18px] font-medium tracking-[-0.36px] text-[#A7A7A7]">
          모캠프는 방장이 꼭 필요해요!
        </p>

        <div className="mt-6 inline-flex max-h-[150px] flex-col gap-[50px] overflow-y-auto rounded-[10px] border border-[#E8E8E8] bg-white p-[50px]">
          {participants
            .filter((p) => p.userId !== currentUserId)
            .map((p) => (
              <label key={p.userId} className="flex cursor-pointer items-center gap-4">
                <div
                  className={`h-[20px] w-[20px] rounded-full ${p.userId === selectedUserId ? 'border-[6px] border-[#27CFA5]' : 'border border-[#E8E8E8]'} bg-white`}
                />
                <span className="text-[20px] font-medium tracking-[-0.4px] text-[#C4C4C4]">
                  {p.username}
                </span>
                <input
                  type="radio"
                  name="delegation"
                  checked={p.userId === selectedUserId}
                  onChange={() => onSelect(p.userId)}
                  className="hidden"
                />
              </label>
            ))}
        </div>

        <button
          onClick={onConfirm}
          disabled={!selectedUserId}
          className={`mt-6 flex h-[84px] w-[560px] items-center justify-center rounded-[10px] px-[40px] py-[30px] text-[20px] font-semibold tracking-[-0.4px] ${selectedUserId ? 'bg-[#27CFA5] text-white' : 'bg-[#E9E9E9] text-white'}`}
        >
          권한 위임하기
        </button>
      </div>
    </div>
  );
};

export default DelegationModal;
