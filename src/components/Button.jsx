const Button = ({ onClick, children, leftIcon, rightIcon }) => (
  <button className="border-5 rounded-5 bg-dark text-white px-4" onClick={onClick}>
    {leftIcon} {children} {rightIcon}
  </button>
);
export default Button;
