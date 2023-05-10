const Button = ({ onClick, children}) => {
// TODO quiero hacer que cuando disabled sea true el color de las letras sea gris

  return(
    <button className="border-5 rounded-5 bg-dark text-white px-2 mx-2" onClick={onClick}>
    {children}
    </button>
  )
};
export default Button;
