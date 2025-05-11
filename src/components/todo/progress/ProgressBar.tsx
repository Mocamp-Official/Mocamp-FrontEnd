interface ProgressBarProps {
  progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="h-[29px] w-[420px] overflow-hidden rounded-[20px] bg-[#f2f2f2]">
      <div
        className="h-full bg-[#27cfa5] transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
