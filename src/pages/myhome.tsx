import BasicHeader from '@/components/Header/BasicHeader';
import SideBar from '@/components/myhome/SideBar';
import Content from '@/components/myhome/Content';
import { useMyhomeStore } from '@/stores/myhome-store';
import { useEffect } from 'react';

const myhome = () => {
  const { setMyhome } = useMyhomeStore();

  return (
    <div className="w-full h-full min-h-[1080px] bg-[#e6e6e6]">
      <BasicHeader />
      <div className="flex justify-center mt-[50px] gap-[10px]">
        <SideBar />
        <Content />
      </div>
    </div>
  );
};

export default myhome;
