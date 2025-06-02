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
    className={`border-gray4 flex items-center justify-center rounded-[10px] border bg-white px-5 py-[5px] ${width} ${wrapperClassName}`}
  >
    <input
      type="text"
      pattern="[0-9]*"
      inputMode="numeric"
      placeholder={placeholder}
      className={`text-primary placeholder-primary w-full appearance-none bg-transparent text-center text-2xl font-medium outline-none ${minWidth} ${inputClassName}`}
      {...rest}
    />
  </div>
);

export default NumberInput;
