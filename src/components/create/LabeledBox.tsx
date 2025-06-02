interface LabeledBoxProps {
  label: string;
  description?: string;
  children: React.ReactNode;
  isError?: boolean;
}

const LabeledBox = ({ label, description, isError = false, children }: LabeledBoxProps) => {
  const parts = label.split('*');

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-[10px]">
        <span className="text-2xl font-semibold text-[#555555]">
          {parts[0].trim()}
          {label.includes('*') && <span className="text-[#27cfa5]"> *</span>}
        </span>
        <span className={`text-base font-medium ${isError ? 'text-red' : 'text-[#c4c4c4]'}`}>
          {description}
        </span>
      </div>
      {children}
    </div>
  );
};

export default LabeledBox;
