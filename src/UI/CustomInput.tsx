type CustomInputProps = {
  label: string;
  placeholder: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

function CustomInput({
  label,
  placeholder,
  type,
  onChange,
  value,
}: CustomInputProps) {
  return (
    <div className="containerInput">
      <label>{label}: </label>

      <input
        value={value}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
      />
    </div>
  );
}

export default CustomInput;
