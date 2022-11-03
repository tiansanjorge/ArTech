const Button = ({ onClick, children, leftIcon, rightIcon }) => (
  <button className="border-2 border-info" onClick={onClick}>
    {leftIcon} {children} {rightIcon}
  </button>
);
export default Button;
