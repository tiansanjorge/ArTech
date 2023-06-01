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
    <div className='my-5 text-center'>
      <h2 className='my-5'><b><b> Mi cuenta</b></b></h2>
      <div>
        <p><b>{user?.displayName}</b></p>
        <p>{user?.email}</p>
        <p className='my-5'>Puedes visualizar los pedidos generados con este email en la sección <Link style={{ color: "#000"}} to="/orders"><b>Mis pedidos</b></Link> </p>
      </div>
      
      <button onClick={handleSignOut} className='border py-2 px-5 mt-5'>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Account;