import React from "react";

const CustomInput = React.forwardRef(({ value, onClick, placeholder }, ref) => (
  <div onClick={onClick}>
    <input
      ref={ref}
      style={{
        color: value ? "#6f787f" : "#363d42",
      }}
      value={value ? value : placeholder}
    />
  </div>
));

export default CustomInput;
