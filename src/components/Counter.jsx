import { useState } from "react";
import Button from "./Button";

const Counter = ({ stock, onAdd }) => {

  const [contador, setContador] = useState(0);

  const handleAdd = () => {
    if(contador < stock){
    setContador(contador + 1);
    }
  };

  const handleSubstract = () => {
    if(contador > 0) setContador(contador - 1);
  };

  return (
    <div className="" >
      <div className="botonesStock m-auto my-5 d-flex w-50 justify-content-between">
        <Button onClick={() => handleSubstract()}>-</Button>
        <span>{contador}</span>
        <Button onClick={() => handleAdd()}>+</Button>
      </div>
      <Button onClick={() => {
        if(contador) onAdd(contador)     
      }}
      disabled={!contador}> 
        Agregar al carrito
      </Button>
    </div>
  );
};

export default Counter;
