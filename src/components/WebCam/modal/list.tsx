import { Participant } from '@/types/webCam';

interface DelegationModalProps {
  participants: Participant[];
  currentUserId: number;
  onSelect: (newAdminId: number) => void;
  onClose: () => void;
}

const DelegationModal = ({
  participants,
  currentUserId,
  onSelect,
  onClose,
}: DelegationModalProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-[400px] rounded-[16px] bg-white px-6 py-8 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mb-2 text-center text-xl font-bold">방장 위임하기</h3>
        <p className="mb-5 text-center text-sm text-gray-500">모캠프는 방장이 꼭 필요해요!</p>

        <ul className="max-h-[260px] space-y-3 overflow-y-auto">
          {participants
            .filter((p) => p.userId !== currentUserId)
            .map((p) => (
              <li key={p.userId} className="flex items-center justify-between">
                <span className="font-medium text-gray-800">{p.username}</span>
                <button
                  onClick={() => {
                    onSelect(p.userId);
                    onClose();
                  }}
                  className="rounded-md bg-[#27CFA5] px-4 py-1.5 text-sm text-white hover:brightness-105"
                >
                  위임
                </button>
              </li>
            ))}
        </ul>

        <button
          onClick={onClose}
          className="mt-6 w-full text-center text-sm text-gray-400 hover:text-gray-600"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default DelegationModal;
