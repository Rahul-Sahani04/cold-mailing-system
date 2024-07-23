const FormInput = ({ label, value, onChangeFunc, placeholder="" }) => {
  return (
    <div className={"input-box "}>
      <label>{label}</label>
      <input
        type="message"
        value={value}
        onChange={(e) => onChangeFunc(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormInput;
