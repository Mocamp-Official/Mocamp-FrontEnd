interface NumberInputProps {
  placeholder?: string;
  width?: string;
  minWidth?: string;
}

const NumberInput = ({
  placeholder = '',
  width = 'w-full',
  minWidth = 'min-w-[30px]',
}: NumberInputProps) => (
  <div
    className={`flex items-center justify-center px-5 py-[5px] bg-white rounded-[10px] border-[1px] border-[#e6e6e6] ${width}`}
  >
    <input
      placeholder={placeholder}
      className={`placeholder-[#27cfa5] font-medium text-[#27cfa5] text-2xl outline-none bg-transparent text-center w-full ${minWidth}`}
    />
  </div>
);

export default NumberInput;
