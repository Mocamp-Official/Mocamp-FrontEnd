import type { ReactNode } from 'react';

interface CardPageLayoutProps {
  children: ReactNode;
}

const CardPageLayout = ({ children }: CardPageLayoutProps) => {
  return (
    <div className="flex w-screen items-center justify-center bg-[#f8f8f8]">
      <div className="flex h-[469.333px] w-[352px] flex-col gap-4 rounded-[10.67px] bg-white p-[26.67px] lg:h-[660px] lg:w-[495px] lg:gap-[22.5px] lg:rounded-[15px] lg:p-[37.5px] xl:h-[880px] xl:w-[660px] xl:gap-[30px] xl:rounded-[20px] xl:p-[50px]">
        {children}
      </div>
    </div>
  );
};

export default CardPageLayout;
