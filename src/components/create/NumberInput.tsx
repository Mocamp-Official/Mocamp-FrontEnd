import { InputHTMLAttributes } from 'react';

interface NumberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: string;
  minWidth?: string;
  inputClassName?: string;
  wrapperClassName?: string;
}

const NumberInput = ({
  placeholder = '',
  width = 'w-full',
  minWidth = 'min-w-[30px]',
  inputClassName,
  wrapperClassName,
  ...rest
}: NumberInputProps) => (
  <div
    className={`flex items-center justify-center rounded-[10px] border border-[#e6e6e6] bg-white px-5 py-[5px] ${width} ${wrapperClassName}`}
  >
    <input
      type="text"
      pattern="[0-9]*"
      inputMode="numeric"
      placeholder={placeholder}
      className={`w-full appearance-none bg-transparent text-center text-2xl font-medium text-[#27cfa5] placeholder-[#27cfa5] outline-none ${minWidth} ${inputClassName}`}
      {...rest}
    />
  </div>
);

export default NumberInput;
