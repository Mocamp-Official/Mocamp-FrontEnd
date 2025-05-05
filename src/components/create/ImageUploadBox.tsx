import CameraIcon from '@/public/svgs/cameraIcon.svg';

interface ImageUploadBoxProps {
  label: string;
}

const ImageUploadBox = ({ label }: ImageUploadBoxProps) => (
  <div className="flex flex-col gap-5">
    <span className="text-2xl font-semibold text-[#555555]">{label}</span>
    <div className="w-[560px] h-[249px] bg-[#f2f2f2] flex items-center justify-center rounded-[10px] cursor-pointer">
      <div className="flex items-center justify-center flex-col gap-[10px]">
        <CameraIcon />
        <span className="text-[20px] font-medium text-[#c4c4c4] pb-[5px]">
          이미지를 삽입하세요
        </span>
      </div>
    </div>
  </div>
);

export default ImageUploadBox;
