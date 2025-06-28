// myhome.tsx

import CreateJoinHeader from '@/components/Header/CreateJoinHeader';
import MocampUsageTrend from '@/components/myhome/MocampUsageTrend';
import ParticipantedMocamp from '@/components/myhome/ParticipantedMocamp';
import SideBar from '@/components/myhome/SideBar';
import Total from '@/components/myhome/Total';
import { useCategoryStore } from '@/stores/category-store';

const MyHome = () => {
  const { category } = useCategoryStore();

  const categoryMap = {
    MYHOME_TOTAL: <Total />,
    PARTICIPANTED_MOCAMP: <ParticipantedMocamp />,
    MOCAMP_USAGE_TREND: <MocampUsageTrend />,
  };

  return (
    <div className="h-screen w-screen bg-[#e6e6e6]">
      <CreateJoinHeader />
      <div className="mt-[50px] flex justify-center gap-[10px] px-4 sm:px-6 md:px-8 lg:px-12">
        <SideBar />
        {categoryMap[category] ?? null}
      </div>
    </div>
  );
};

export default MyHome;
