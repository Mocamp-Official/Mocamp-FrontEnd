import { useRouter } from 'next/router';
import React, { useState } from 'react';

interface WorkspaceHeaderProps {
  roomName?: string;
  initialNotice?: string;
  isOwner?: boolean;
}

const WorkspaceHeader = ({
  roomName = '',
  initialNotice = '',
  isOwner = true,
}: WorkspaceHeaderProps) => {
  const router = useRouter();
  const [notice, setNotice] = useState(initialNotice);
  const [editing, setEditing] = useState(isOwner && !notice);

  const handleNoticeChange = (e: React.ChangeEvent<HTMLInputElement>) => setNotice(e.target.value);
  const handleNoticeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') setEditing(false);
  };

  const handleNoticeBlur = (e: React.FocusEvent<HTMLInputElement>) => setEditing(false);

  const handleNoticeClick = () => {
    if (isOwner) setEditing(true);
  };

  const handleKakaoShare = () => {
    alert('추후 구현');
  };

  const handleCopyLink = async () => {
    try {
      const link = window.location.href;
      await navigator.clipboard.writeText(link);
      alert('링크가 복사되었습니다!');
    } catch (err) {
      console.error('링크 복사에 실패하였습니다:', err);
    }
  };

  //설정 모달 열고 닫기
  // const handleSettingClick = () => {
  //     setShowModal(true);
  // };

  // const closeModal = () => {
  //     setShowModal(false);
  // };

  return (
    <header className="fixed top-0 left-0 h-[100px] w-full min-w-[1920px] border-b-0 bg-white">
      <div className="relative mx-auto h-full w-[1920px]">
        <img
          src="/svgs/MocampIcon.svg"
          alt="모캠프 로고"
          className="absolute top-[26px] left-[320px] h-[48.46px] w-[120px]"
        />

        {/* 방이름 */}
        <input
          type="text"
          value={roomName}
          readOnly
          className="font-pre absolute top-[20px] left-[495px] h-[60px] w-[300px] rounded-[10px] border border-[#E6E6E6] bg-white pr-[24px] pl-[24px] text-left text-[20px] leading-[100%] font-semibold tracking-[-0.02em] text-[#555555] focus:outline-none"
        />

        {/* 공지사항 필드 */}
        <div
          className="absolute top-[20px] left-[815px] flex h-[60px] w-[765px] items-center rounded-[10px] border border-[#E8E8E8] bg-white pr-[10px] pl-[40px] focus:outline-none"
          onClick={handleNoticeClick}
        >
          {editing && isOwner ? (
            <input
              type="text"
              value={notice}
              onChange={handleNoticeChange}
              onKeyDown={handleNoticeKeyDown}
              onBlur={handleNoticeBlur}
              placeholder="공지사항을 입력하세요"
              className="font-pre flex-1 border-none bg-transparent text-left text-[20px] leading-[100%] font-medium tracking-[-0.02em] text-[#555555] placeholder-[#C4C4C4] outline-none"
              autoFocus
            />
          ) : (
            <span
              className={`font-pre h-full w-full text-[20px] leading-[100%] font-medium tracking-[-0.02em] ${notice ? 'font-semibold text-[#555555]' : 'text-[#C4C4C4]'} flex items-center text-left`}
            >
              {notice || '공지사항을 입력하세요'}
            </span>
          )}
        </div>

        {/* 링크 복사 버튼 */}
        <button
          onClick={handleCopyLink}
          className="absolute top-[20px] left-[1600px] flex h-[60px] w-[60px] items-center justify-center rounded-[10px] border border-[#E6E6E6] bg-white"
        >
          <img src="/svgs/link_icon.svg" alt="링크 복사" className="h-[28px] w-[28px]" />
        </button>

        {/* 카카오 공유 버튼 */}
        <button
          onClick={handleKakaoShare}
          className="absolute top-[20px] left-[1670px] flex h-[60px] w-[60px] items-center justify-center rounded-[10px] border border-[#E6E6E6] bg-white"
        >
          <img src="/svgs/Kakao_link_icon.svg" alt="카카오톡 공유" className="h-[24px] w-[26px]" />
        </button>

        {/* 설정(?) 버튼 */}
        <button
          // onClick={handleSettingClick}
          className="absolute top-[20px] left-[1740px] flex h-[60px] w-[60px] items-center justify-center rounded-[10px] border border-[#E6E6E6] bg-white"
        >
          <img src="/svgs/setting_icon.svg" alt="설정" className="h-[28px] w-[28px]" />
        </button>
      </div>
    </header>
  );
};

export default WorkspaceHeader;
