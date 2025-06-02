import CloseIcon from '@/public/svgs/closeIcon.svg';
import { useRoomForm, RoomFormInput } from '@/hooks/useRoomForm';
import ToggleMicButton from './ToggleMicButton';
import LabeledBox from './LabeledBox';
import NumberInput from './NumberInput';
import ImageUploadBox from './ImageUploadBox';

interface CreateRoomProps {
  onClose: () => void;
}

const CreateRoom = ({ onClose }: CreateRoomProps) => {
  const {
    register,
    values,
    imageFile,
    micOn,
    toggleMic,
    errors,
    setImageFile,
    isValid,
    handleSubmit,
    onImageSelect,
  } = useRoomForm();

  const onSubmit = (data: RoomFormInput) => {
    console.log('제출 데이터:', data);
    // TODO: 방 생성 API 연결
  };

  return (
    <>
      {/* 방 생성 모달 제목 */}
      <div className="flex h-[38px] items-start justify-between">
        <span className="flex h-full items-center text-[32px] leading-[38px] font-semibold text-[#555555]">
          방 생성하기
        </span>
        <CloseIcon className="h-[29px] w-[29px] cursor-pointer" onClick={onClose} />
      </div>

      {/* 방 이름 + 마이크 설정 */}
      <div className="mt-3 flex gap-5">
        <LabeledBox
          label="방 이름 *"
          description={errors.roomName ? errors.roomName.message : '최대 20자'}
          isError={!!errors.roomName}
        >
          <div
            className={`flex h-[90px] w-[350px] items-center rounded-[10px] bg-[#f2f2f2] px-10 ${
              errors.roomName ? 'border-red border' : 'border border-transparent'
            }`}
          >
            <input
              {...register('roomName')}
              value={values.roomName}
              placeholder="방 이름을 설정해주세요"
              className={`w-full bg-transparent text-[20px] placeholder-[#c4c4c4] outline-none ${
                errors.roomName ? 'text-red' : 'text-[#555555]'
              }`}
            />
          </div>
        </LabeledBox>

        <LabeledBox label="마이크 설정">
          <div className="flex h-[90px] w-[190px] items-center justify-center rounded-[10px] bg-[#f2f2f2] px-10 py-5">
            <ToggleMicButton micOn={micOn} onToggle={toggleMic} />
          </div>
        </LabeledBox>
      </div>

      {/* 진행 시간 + 인원 수 */}
      <div className="flex gap-5">
        <LabeledBox
          label="진행 시간 *"
          description={errors.minute ? errors.minute.message : '최대 12시간'}
          isError={!!errors.minute}
        >
          <div
            className={`flex h-[90px] w-[350px] items-center justify-center gap-[10px] rounded-[10px] bg-[#f2f2f2] px-10 ${
              errors.minute ? 'border-red border' : 'border border-transparent'
            }`}
          >
            <NumberInput
              placeholder="00"
              value={values.hour}
              maxLength={2}
              {...register('hour')}
              width="max-w-[70px]"
              inputClassName={errors.minute ? 'text-red' : 'text-[#27cfa5]'}
            />
            시간
            <NumberInput
              placeholder="00"
              value={values.minute}
              maxLength={2}
              {...register('minute')}
              width="max-w-[70px]"
              inputClassName={errors.minute ? 'text-red' : 'text-[#27cfa5]'}
            />
            분
          </div>
        </LabeledBox>

        <LabeledBox
          label="인원 수 *"
          description={errors.headcount ? errors.headcount.message : '최대 5명'}
          isError={!!errors.headcount}
        >
          <div
            className={`flex h-[90px] w-[190px] items-center justify-center gap-[10px] rounded-[10px] bg-[#f2f2f2] px-10 py-5 ${
              errors.headcount ? 'border-red border' : 'border border-transparent'
            }`}
          >
            <NumberInput
              placeholder="0"
              value={values.headcount}
              maxLength={1}
              {...register('headcount')}
              width="max-w-[55px]"
              minWidth="min-w-[15px]"
              inputClassName={errors.headcount ? 'text-red' : 'text-[#27cfa5]'}
            />
            명
          </div>
        </LabeledBox>
      </div>

      {/* 대표 이미지 설정 */}
      <ImageUploadBox
        label="대표 이미지 설정 *"
        onImageSelect={onImageSelect}
        errorMessage={errors.imageFile?.message}
      />

      {/* 생성 버튼 */}
      <button
        onClick={handleSubmit(onSubmit)}
        className={`h-[84px] w-[560px] shrink-0 rounded-[10px] text-[20px] font-semibold ${
          isValid
            ? 'cursor-pointer bg-[#27CFA5] text-white'
            : 'cursor-not-allowed bg-[#f2f2f2] text-[#c4c4c4]'
        }`}
      >
        모캠프 생성하기
      </button>
    </>
  );
};

export default CreateRoom;
