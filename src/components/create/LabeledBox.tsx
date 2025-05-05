interface LabeledBoxProps {
  label: string;
  children: React.ReactNode;
}

const LabeledBox = ({ label, children }: LabeledBoxProps) => (
  <div className="flex flex-col gap-5">
    <span className="text-2xl font-semibold text-[#555555]">{label}</span>
    {children}
  </div>
);

export default LabeledBox;
