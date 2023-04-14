import './styles/styles.scss';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthContextProvider } from './context/authContext';
import { CartProvider } from "./context/cartContext";
import { WishlistProvider } from "./context/wishlistContext";

import Protected from "./components/Protected";
import { UserLayout } from "./components/UserLayout";

import {Home} from "./pages/Home";
import {Category} from "./pages/Category"
import {Detail} from "./pages/Detail"
import Account from './pages/Account';
import SignIn from './pages/SignIn';
import {Wishlist} from "./pages/Wishlist"
import {Cart} from "./pages/Cart"
import {Error} from "./pages/Error"

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <CartProvider>
          <WishlistProvider>
            <BrowserRouter>
                <Routes>
                  <Route path={"/"} element={<UserLayout />}>
                    <Route index element={<Home />} />
                    <Route path={"/category/:categoryId"} element={<Category />} />
                    <Route path={"/product/:productId"} element={<Detail />} />
                    <Route path="/wishlist" element={<Wishlist/>} />
                    <Route path="/cart" element={<Cart/>} />
                    <Route path="/error" element={<Error/>} />
                    <Route path="/signIn" element={<SignIn/>} />
                    <Route path="/account" element={ <Protected> <Account/> </Protected>}  />
                  </Route>
                </Routes>
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </AuthContextProvider>
    </div>
    
  );
}

export default App;
