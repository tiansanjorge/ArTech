const Button = ({ onClick, children}) => {
// TODO quiero hacer que cuando disabled sea true el color de las letras sea gris

  return(
    <button className="button rounded-5 px-3 mx-2 shadow-sm" onClick={onClick}>
    {children}
    </button>
  )
};
export default Button;
