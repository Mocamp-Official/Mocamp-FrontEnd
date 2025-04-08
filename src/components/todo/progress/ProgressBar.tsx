interface ProgressBarProps {
  progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="w-[420px] h-[29px] rounded-[20px] bg-[#f2f2f2] overflow-hidden">
      <div
        className="h-full bg-[#27cfa5] transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
