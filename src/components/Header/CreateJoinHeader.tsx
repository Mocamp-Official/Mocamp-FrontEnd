import React, { useState } from 'react';

const CreateJoinHeader = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setJoinModalOpen] = useState(false);

  const handleCreateClick = () => setCreateModalOpen(true);
  const handleJoinClick = () => setJoinModalOpen(true);

  const closeModals = () => {
    setCreateModalOpen(false);
    setJoinModalOpen(false);
  };

  return (
    <header className="h-[100px] justify-center bg-white">
      <div className="mx-auto flex h-full max-w-[1280px] justify-between">
        <img
          src="/svgs/MocampIcon.svg"
          alt="모캠프 로고"
          className="my-auto h-[48.46px] w-[120px]"
        />
        <div className="my-auto flex flex-row gap-[8.45px]">
          <button
            type="button"
            className="my-auto flex h-[50.4px] w-[171px] items-center justify-center rounded-[10px] bg-gray-100 text-[17.9px] leading-[100%] font-semibold tracking-[-0.02em] text-[#555555] hover:bg-gray-200"
          >
            모캠프 참여하기
          </button>

          <button
            type="button"
            className="my-auto flex h-[50.4px] w-[171px] items-center justify-center rounded-[10px] bg-[#27CFA5] text-[17.9px] leading-[100%] font-semibold tracking-[-0.02em] text-white hover:bg-teal-500"
          >
            모캠프 생성하기
          </button>
        </div>
      </div>
    </header>
  );
};

export default CreateJoinHeader;
