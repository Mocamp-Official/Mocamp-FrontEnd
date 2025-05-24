import { INQUIRY_FORM_URL, INSTAGRAM_URL } from '@/constants/link';
import { useRouter } from 'next/router';

const Footer = () => {
  const router = useRouter();

  const handlePesonalInfoClick = () => {
    router.push('/personal');
  };
  const handleServiceClick = () => {
    router.push('/service');
  };

  return (
    <footer className="w-full bg-[#27CFA5] py-12">
      <div className="max-w-[1200px] mx-auto flex justify-between">
        <div>
          {/* 로고 */}
          <img
            src="/svgs/MocampIcon_white.svg"
            alt="모캠프 로고"
            className="w-[150px] h-[60.54px] mb-4 flex-shrink-0"
            style={{ aspectRatio: '150/60.54' }}
          />

          {/* 정책  */}
          <div>
            <div className="flex items-center gap-6">
              <a
                onClick={handlePesonalInfoClick}
                className="text-body2 text-white/70"
              >
                개인정보처리방침
              </a>
              <a
                onClick={handleServiceClick}
                className="text-body2 text-white/70"
              >
                서비스 이용약관
              </a>
            </div>
            <div className="text-body2 text-white mt-2">
              © 2025 Mocamp Inc. All rights reserved.
            </div>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex flex-col justify-end">
          <div className="flex gap-4 mt-2">
            <button
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-[5px] border border-white/50 bg-[#27CFA5] text-body2 font-bold text-white"
              onClick={() => window.open(INQUIRY_FORM_URL, '_blank')}
            >
              문의사항
            </button>
            <button
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-[5px] border border-white/50 bg-[#27CFA5] text-body2 font-bold text-white"
              onClick={() => window.open(INSTAGRAM_URL, '_blank')}
            >
              인스타그램
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
