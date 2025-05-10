import UnsecretIcon from '@/public/svgs/UnsecretIcon.svg';
import ModalLayout from '@/components/common/modal/ModalLayout';
import ModalContent from './GoalModalContent';
import CloseButton from '@/public/svgs/CloseButton.svg';
import { Todo } from '@/types/todo';

interface GoalModalWrapperProps {
  onClose: () => void;
  mode: 'add' | 'edit';
  todos?: Todo[];
}

const GoalModalWrapper = ({ onClose, mode, todos }: GoalModalWrapperProps) => {
  return (
    <ModalLayout onClose={onClose} width="660px" height="880px">
      {/* <button
        className="absolute top-7 right-7 text-gray-500"
        onClick={onClose}
      >
        <CloseButton />
      </button> */}

      {/* 헤더 */}
      <div className="flex flex-col gap-[10px] mb-[50px]">
        <div className="w-full flex justify-between">
          <span className="text-[32px] text-[#555555] font-semibold">
            나의 목표 관리
          </span>
          <UnsecretIcon className="w-[30px] h-[38px]" />
        </div>
        <span className="text-lg text-[#a7a7a7] font-semibold">
          나의 목표를 자유롭게 설정할 수 있어요
        </span>
      </div>

      <ModalContent todos={todos || []} mode={mode} />

      {/* 하단 버튼 */}
      <div className="w-full absolute bottom-[50px] flex items-center gap-5 h-[84px]">
        <button className="w-[187px] px-10 py-[30px] border border-[#e8e8e8] text-[#27cfa5] tracking-[-0.02em] bg-white rounded-[10px] text-[18px] font-semibold">
          목표 생성하기
        </button>
        <button className="w-[353px] px-10 py-[30px] text-white bg-[#27cfa5] rounded-[10px] text-[20px] font-semibold">
          완료하기
        </button>
      </div>
    </ModalLayout>
  );
};

export default GoalModalWrapper;
