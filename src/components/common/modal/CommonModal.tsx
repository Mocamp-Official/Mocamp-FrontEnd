import { useState } from 'react';
import UnsecretIcon from '@/public/svgs/UnsecretIcon.svg';
import ModalLayout from './ModalLayout';
import CloseButton from '@/public/svgs/CloseButton.svg';

interface CommonModalProps {
  onClose: () => void;
  title: string;
  description: string;
  placeholder: string;
  onSubmit?: (value: string) => void;
}

const CommonModal = ({
  onClose,
  title,
  description,
  placeholder,
  onSubmit,
}: CommonModalProps) => {
  const [inputValue, setInputValue] = useState('');
  const isActive = inputValue.trim().length > 0;

  return (
    <ModalLayout onClose={onClose} width="660px" height="406px">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-7 right-7 text-gray-500 cursor-pointer"
      >
        <CloseButton />
      </button>

      {/* 헤더 */}
      <div className="flex flex-col gap-[10px] mb-[50px]">
        <div className="w-full flex justify-between">
          <span className="text-[32px] text-[#555555] font-semibold">
            {title}
          </span>
          <UnsecretIcon className="w-[30px] h-[38px]" />
        </div>
        <span className="text-lg text-[#a7a7a7] font-semibold">
          {description}
        </span>
      </div>

      <div className="flex flex-col gap-5 items-center justify-center">
        <input
          className="w-[560px] h-[83px] px-10 py-5 rounded-[10px] border border-[#e8e8e8] text-[20px] font-medium placeholder:text-[#c4c4c4] outline-none"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className={`w-[560px] h-[84px] px-10 py-[30px] rounded-[10px] text-[20px] font-semibold text-white tracking-[-0.02em] transition-colors duration-200 ${
            isActive
              ? 'bg-[#27cfa5] cursor-pointer'
              : 'bg-[#e9e9e9] cursor-not-allowed'
          }`}
          disabled={!isActive}
          onClick={() => onSubmit?.(inputValue)}
        >
          완료하기
        </button>
      </div>
    </ModalLayout>
  );
};

export default CommonModal;
