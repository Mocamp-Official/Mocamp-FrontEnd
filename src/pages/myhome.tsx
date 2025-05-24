import BasicHeader from '@/components/Header/BasicHeader';
import MocampUsageTrend from '@/components/myhome/MocampUsageTrend';
import ParticipantedMocamp from '@/components/myhome/ParticipantedMocamp';
import ProfileSetting from '@/components/myhome/ProfileSetting';
import SideBar from '@/components/myhome/SideBar';
import Total from '@/components/myhome/Total';
import { useCategoryStore } from '@/stores/category-store';

const myhome = () => {
  const { category } = useCategoryStore();

  return (
    <div className="min-w-[1920px] min-h-[1080px] bg-[#e6e6e6]">
      <BasicHeader />
      <div className="flex justify-center mt-[50px] gap-[10px]">
        <SideBar />
        {category === 'MYHOME_TOTAL' && <Total />}
        {category === 'PROFILE_SETTING' && <ProfileSetting />}
        {category === 'PARTICIPANTED_MOCAMP' && <ParticipantedMocamp />}
        {category === 'MOCAMP_USAGE_TREND' && <MocampUsageTrend />}
      </div>
    </div>
  );
};

export default myhome;
