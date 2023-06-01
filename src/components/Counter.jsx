import { useState, useEffect } from "react";
import Button from "./Button";
import Select from "react-select";
import { useCartContext } from "../context/cartContext";
import { useFavoritesContext } from "../context/favoritesContext";

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

  // Chequeamos si la cantidad y el color ya fueron seleccionados y si hay stock en firebase antes de poder agregar a favoritos
  const counterFavoriteCheck = () => {
    const itemsSameName = favorites.filter(item => item.nombre == nombre)
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
        setError("No quedan productos en stock para agregar a favoritos");
      }
    }
  }

  // Chequeamos si la cantidad y el color ya fueron seleccionados y si hay stock en firebase antes de poder agregar al carrito
  const counterCartCheck = () => {
    const itemsSameName = cart.filter(item => item.nombre == nombre)
    const qtyItemsSameName = itemsSameName.map(item => item.qty)
    const totalQty = qtyItemsSameName.reduce((sum, value) => sum + value, 0);
    
    if (contador && color && totalQty + contador <= stock) {
      setError("");
      onAdd(contador, color);
    } else {
      if (!contador) setError("Debes elegir una cantidad");
      if (!color) setError("Debes elegir un color");
      if (!contador && !color) setError("Debes elegir una cantidad y un color");
      if (totalQty + contador > stock) {
        setError("No quedan productos en stock para agregar al carrito");
      }
    }
  }

  return (
    <div className="" >
      <div className="text-danger mb-2">
        {Error}
      </div>
      <label className="mb-3">Color:</label>
      <Select options={colorOptions}
        onChange={selectedValue}
      />
      <div className="botonesStock m-auto my-5 d-flex w-50 justify-content-between">
        <Button onClick={() => handleSubstract()}>-</Button>
        <span>{contador}</span>
        <Button onClick={() => handleAdd()}>+</Button>
      </div>
      <Button onClick={counterFavoriteCheck}
      > 
        Agregar a favoritos
      </Button>
      <Button onClick={counterCartCheck}>
        Agregar al carrito
      </Button>
      
    </div>
  );
};

export default Counter;
