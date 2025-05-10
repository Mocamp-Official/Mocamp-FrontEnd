import { useEffect, useRef, useState } from 'react';
import TodoMoreIcon from '@/public/svgs/TodoMoreIcon.svg';
import PencilIcon from '@/public/svgs/PencilIcon.svg';

interface MoreMenuProps {
  onEditGoal: () => void;
  onEditCommitment?: () => void;
}

const MoreMenu = ({ onEditGoal, onEditCommitment }: MoreMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className="relative">
      <TodoMoreIcon
        className="cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      />
      {isOpen && (
        <div className="absolute right-0 top-[35px] w-[155px] bg-white rounded-[10px] border border-[#e8e8e8] p-5 z-10">
          <div
            className="flex items-center gap-[9px] cursor-pointer"
            onClick={onEditCommitment}
          >
            <PencilIcon className="w-[21px] h-[15px]" />
            <button className="w-full text-base font-medium">
              다짐 수정하기
            </button>
          </div>
          <div className="my-5 h-[1px] bg-[#e8e8e8]" />
          <div
            className="flex items-center gap-[9px] cursor-pointer"
            onClick={() => {
              setIsOpen(false);
              onEditGoal();
            }}
          >
            <PencilIcon className="w-[21px] h-[15px]" />
            <button className="w-full text-base font-medium">
              목표 수정하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoreMenu;
