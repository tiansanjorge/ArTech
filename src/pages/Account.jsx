import React from 'react';
import { useAuthContext } from '../context/authContext';
import { Link } from "react-router-dom";

const Account = () => {
  const { logOut, user } = useAuthContext();
  

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='minH col-lg-8 col-11 align-self-center align-self-lg-start my-5'>
      <h3 className='shadow-sm py-2 bg-lightblue rounded text-center'> Cuenta</h3>
      <div className='shadow d-inline-block my-5 ms-3 px-5 py-3 rounded bg-yellow'>
        <p className="size20"><b>{user?.displayName}</b></p>
        <p>{user?.email}</p>
      </div>
      <p className='my-5 text-center '>Puedes visualizar tus pedidos realizados en <Link className=' text-dark' to="/orders"><b>Pedidos</b></Link> </p>
      <button onClick={handleSignOut} className='rounded py-2 px-5 d-block mx-auto shadow-sm'>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Account;