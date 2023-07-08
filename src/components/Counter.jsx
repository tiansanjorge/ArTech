import { useState} from "react";
import Select from "react-select";
import { useCartContext } from "../context/cartContext";
import { useFavoritesContext } from "../context/favoritesContext";
import { BsFillCartPlusFill } from "react-icons/bs";
import { BsStarFill  } from "react-icons/bs";


const Counter = ({ nombre, stock, onAdd, favoritesAdd }) => {

  const { cart } = useCartContext();
  const { favorites } = useFavoritesContext();

  const [contador, setContador] = useState(0);
  const [Error, setError] = useState("");

  const handleAdd = () => {
    if(contador < stock){
    setContador(contador + 1);
    }
  };

  const handleSubstract = () => {
    if(contador > 0) setContador(contador - 1);
  };

  const [color, setColor] = useState(null)

  const colorOptions = [
    {value:"Negro", label: "Negro"},
    {value:"Gris" , label: "Gris"},
    {value:"Blanco", label: "Blanco"}
  ]

  const selectedValue = (color) => {
    setColor(color.value)
  }

  // Chequeamos si la cantidad y el color ya fueron seleccionados y si hay stock en firebase antes de poder agregar 
  const counterFavoriteCheck = () => {
    const itemsSameName = favorites.filter(item => item.nombre === nombre)
    const qtyItemsSameName = itemsSameName.map(item => item.qty)
    const totalQty = qtyItemsSameName.reduce((sum, value) => sum + value, 0);

    if (contador && color && totalQty + contador <= stock) {
      setError("");
      favoritesAdd(contador, color);
    } else {
      if (!contador) setError("Debes elegir una cantidad");
      if (!color) setError("Debes elegir un color");
      if (!contador && !color) setError("Debes elegir una cantidad y un color");
      if (totalQty + contador > stock) {
        setError("No quedan productos en stock para agregar ");
      }
    }
  }

  // Chequeamos si la cantidad y el color ya fueron seleccionados y si hay stock en firebase antes de poder agregar al carrito
  const counterCartCheck = () => {
    const itemsSameName = cart.filter(item => item.nombre === nombre)
    const qtyItemsSameName = itemsSameName.map(item => item.qty)
    const totalQty = qtyItemsSameName.reduce((sum, value) => sum + value, 0);

    if (contador && color && totalQty + contador <= stock) {
      setError("");
      onAdd(contador, color);
    } 
    else {
      if (!contador) setError("Debes elegir una cantidad");
      if (!color) setError("Debes elegir un color");
      if (!contador && !color) setError("Debes elegir una cantidad y un color");
      if (totalQty + contador > stock) {
        setError("No quedan productos en stock para agregar al carrito");
      }
    }
  }

  return (
    <div className="bg-blue rounded d-flex flex-column justify-content-around shadow-lg mx-4" >
      <div className="text-yellow mt-2 ">
        {Error}
      </div>
      <label className="my-2 text-white">Color:</label>
      <Select className="w-50 mx-auto shadow" options={colorOptions}
        onChange={selectedValue}
      />
      <div className="mx-auto my-3 d-flex w-50 justify-content-center">
        <button className="rounded-5 border-0 px-2" onClick={() => handleSubstract()}>-</button>
        <span className="text-white mx-5">{contador}</span>
        <button className="rounded-5 border-0 px-2" onClick={() => handleAdd()}>+</button>
      </div>
      <div className="my-3 d-flex justify-content-center">
      <button className="rounded-5 border-0 px-3 me-5" onClick={counterCartCheck}>
          Añadir <BsFillCartPlusFill />
        </button>
        <button className="rounded-5 border-0 px-2 " onClick={counterFavoriteCheck}
        > 
          <BsStarFill  className="mb-1" />
        </button>
        
      </div>
    </div>
  );
};

export default Counter;
