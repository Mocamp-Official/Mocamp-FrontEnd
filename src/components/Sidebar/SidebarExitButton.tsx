import React, { useState } from 'react';
import SidebarExitModal from './modal/SidebarExitModal';

const SidebarExit: React.FC = () => {
  const [isExitModalOpen, setExitModalOpen] = useState(false);

  const handleExitClick = () => setExitModalOpen(true);
  const handleConfirmExit = () => {
    setExitModalOpen(false);
  };
  const handleCancelExit = () => setExitModalOpen(false);

  return (
    <>
      <div className="w-[150px] h-[64px] absolute left-[25px] bottom-[100px] rounded-[10px] border border-[#E8E8E8] bg-white flex items-center justify-center p-[20px]">
        <button
          onClick={handleExitClick}
          className="w-[110px] h-[24px] flex items-center justify-center font-pre font-bold text-[18px] leading-[1] tracking-[-0.02em] text-[#555555] bg-transparent rounded"
        >
          방 나가기
        </button>
      </div>

      {isExitModalOpen && (
        <SidebarExitModal
          onConfirm={handleConfirmExit}
          onCancel={handleCancelExit}
        />
      )}
    </>
  );
};

export default SidebarExit;
