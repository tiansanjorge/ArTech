
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/authContext';
import { OrderProvider } from './context/orderContext';
import { CartProvider } from "./context/cartContext";
import { FavoritesProvider } from "./context/favoritesContext";

import Protected from "./components/Protected";
import { UserLayout } from "./components/UserLayout";

import {Home} from "./pages/Home";
import {AllProducts} from "./pages/AllProducts"
import {Category} from "./pages/Category"
import {Detail} from "./pages/Detail"
import Account from './pages/Account';
import SignIn from './pages/SignIn';
import {Favorites} from "./pages/Favorites"
import {Cart} from "./pages/Cart"
import {Orders} from "./pages/Orders"
import {Error} from "./pages/Error"

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <OrderProvider>
          <CartProvider>
            <FavoritesProvider>
              <BrowserRouter>
                  <Routes>
                    <Route path={"/"} element={<UserLayout />}>
                      <Route index element={<Home />} />
                      <Route path={"/category/allProducts"} element={<AllProducts />} />
                      <Route path={"/category/:categoryId"} element={<Category />} />
                      <Route path={"/product/:productId"} element={<Detail />} />
                      <Route path="/favorites" element={<Favorites/>} />
                      <Route path="/cart" element={<Cart/>} />
                      <Route path="/orders" element={<Orders/>} />
                      <Route path="/error" element={<Error/>} />
                      <Route path="/signIn" element={<SignIn/>} />
                      <Route path="/account" element={<Protected> <Account/> </Protected>}  />
                    </Route>
                  </Routes>
              </BrowserRouter>
            </FavoritesProvider>
          </CartProvider>
        </OrderProvider>
      </AuthProvider>
    </div>
    
  );
}

export default App;
