// 나가기 버튼
// 모달은 나중에

import React from 'react';

const SidebarExit= () => {
    
return (
        <div className="w-[200px] h-[1080px] bg-white relative">
            <div className="w-[150px] h-[64px] absolute top-[100px] left-[25px] rounded-[10px] border border-[#E8E8E8] bg-white flex flex-col gap-[19px] p-[20px]">
                <button className="w-[110px] h-[24px] flex items-center justify-center font-pre font-medium text-[18px] leading-[1] tracking-[-0.02em] text-[#555555] bg-transparent rounded">
                    방 나가기
                </button>
            </div>
        </div>
    );
}
export default SidebarExit;


