const Input = ({ name, label, value, type, onChange }) => {
  return (
    <input
      type={type}
      placeholder={label}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
