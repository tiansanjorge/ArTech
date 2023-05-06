
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from './context/authContext';
import { OrderProvider } from './context/orderContext';
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
import {Orders} from "./pages/Orders"
import {Error} from "./pages/Error"

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <OrderProvider>
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
                      <Route path="/orders" element={<Orders/>} />
                      <Route path="/error" element={<Error/>} />
                      <Route path="/signIn" element={<SignIn/>} />
                      <Route path="/account" element={<Protected> <Account/> </Protected>}  />
                    </Route>
                  </Routes>
              </BrowserRouter>
            </WishlistProvider>
          </CartProvider>
        </OrderProvider>
      </AuthProvider>
    </div>
    
  );
}

export default App;
