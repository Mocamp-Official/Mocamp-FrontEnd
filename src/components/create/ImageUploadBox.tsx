import CameraIcon from '@/public/svgs/cameraIcon.svg';

interface ImageUploadBoxProps {
  label: string;
  onImageSelect: (file: File) => void;
}

const ImageUploadBox = ({ label, onImageSelect }: ImageUploadBoxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelect(e.target.files[0]);
    }
  };
  const mainLabel = label.split('*')[0];

  return (
    <div className="flex flex-col gap-5">
      <span className="text-2xl font-semibold text-[#555555]">
        {mainLabel.trim()}
        {label.includes('*') && <span className="text-[#27cfa5]"> *</span>}
      </span>

      <label className="w-[560px] h-[249px] bg-[#f2f2f2] flex items-center justify-center rounded-[10px] cursor-pointer">
        <div className="flex flex-col items-center justify-center gap-[10px]">
          <CameraIcon />
          <span className="text-[20px] font-medium text-[#c4c4c4] pb-[5px]">
            이미지를 삽입하세요
          </span>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default ImageUploadBox;
