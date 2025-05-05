import { useState } from 'react';
import ToggleMicButton from './ToggleMicButton';
import LabeledBox from './LabeledBox';
import NumberInput from './NumberInput';
import ImageUploadBox from './ImageUploadBox';

interface CreateRoomProps {
  onClose: () => void;
}

const CreateRoom = ({ onClose }: CreateRoomProps) => {
  const [micOn, setMicOn] = useState(true);

  const handleMicClick = () => {
    setMicOn((prev) => !prev);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col w-[660px] h-[880px] rounded-[20px] bg-white px-[50px] py-11 gap-10">
        {/* 방 이름 + 마이크 설정 */}
        <div className="flex mt-3 gap-5">
          <LabeledBox label="방 이름">
            <div className="flex items-center w-[350px] h-[90px] bg-[#f2f2f2] px-10 rounded-[10px]">
              <input
                placeholder="방 이름을 설정해주세요"
                className="bg-transparent outline-none placeholder-[#c4c4c4]"
              />
            </div>
          </LabeledBox>

          <LabeledBox label="마이크 설정">
            <div className="flex items-center justify-center w-[190px] h-[90px] bg-[#f2f2f2] px-10 py-5 rounded-[10px]">
              <ToggleMicButton micOn={micOn} onToggle={handleMicClick} />
            </div>
          </LabeledBox>
        </div>

        {/* 진행 시간 + 인원 수 */}
        <div className="flex gap-5">
          <LabeledBox label="진행 시간">
            <div className="flex justify-center items-center w-[350px] h-[90px] bg-[#f2f2f2] px-10 rounded-[10px] gap-[10px]">
              <NumberInput placeholder="00" width="max-w-[70px]" />
              시간
              <NumberInput placeholder="00" width="max-w-[70px]" />분
            </div>
          </LabeledBox>

          <LabeledBox label="인원 수">
            <div className="flex items-center justify-center w-[190px] h-[90px] bg-[#f2f2f2] px-10 py-5 rounded-[10px] gap-[10px]">
              <NumberInput
                placeholder="0"
                width="max-w-[55px]"
                minWidth="min-w-[15px]"
              />
              명
            </div>
          </LabeledBox>
        </div>

        {/* 대표 이미지 설정 */}
        <ImageUploadBox label="대표 이미지 설정" />

        {/* 생성 버튼 */}
        <button className="w-[560px] h-[84px] bg-[#f2f2f2] text-[#c4c4c4] text-[20px] font-semibold rounded-[10px]">
          모캠프 생성하기
        </button>
      </div>
    </div>
  );
};

export default CreateRoom;
