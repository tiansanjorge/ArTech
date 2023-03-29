import { useEffect, useState } from "react";
import { useWishlistContext } from "../context/wishlistContext";
import Swal from 'sweetalert2'

export const Wishlist = () => {

  const { wishlist } = useWishlistContext();
  console.log(wishlist);

  return (

    <div className="w-75 m-auto my-5">

    </div>

  );
};
