interface LabeledBoxProps {
  label: string;
  children: React.ReactNode;
}

const LabeledBox = ({ label, children }: LabeledBoxProps) => {
  const parts = label.split('*');

  return (
    <div className="flex flex-col gap-5">
      <span className="text-2xl font-semibold text-[#555555]">
        {parts[0].trim()}
        {label.includes('*') && <span className="text-[#27cfa5]"> *</span>}
      </span>
      {children}
    </div>
  );
};

export default LabeledBox;
