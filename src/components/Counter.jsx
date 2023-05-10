import { useState } from "react";
import Button from "./Button";
import Select from "react-select";


const Counter = ({ stock, onAdd, favoritesAdd }) => {

  const [contador, setContador] = useState(0);

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
  



  return (
    <div className="" >
      <label>Color:</label>
      <Select options={colorOptions}
        onChange={selectedValue}
      />
      <div className="botonesStock m-auto my-5 d-flex w-50 justify-content-between">
        <Button onClick={() => handleSubstract()}>-</Button>
        <span>{contador}</span>
        <Button onClick={() => handleAdd()}>+</Button>
      </div>
      <Button onClick={() => {
        if(contador && color) favoritesAdd(contador, color);   
      }}
      disabled={!contador}> 
        Agregar a favoritos
      </Button>
      <Button onClick={() => {
        if(contador && color) onAdd(contador, color);   
      }}
      disabled={!contador}> 
        Agregar al carrito
      </Button>
    </div>
  );
};

export default Counter;
