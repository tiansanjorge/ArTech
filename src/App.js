import './styles/styles.scss';
import ItemContainer from './components/ItemContainer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserLayout } from "./components/UserLayout";
import {Home} from "./pages/Home";
import {Category} from "./pages/Category"
import {Detail} from "./pages/Detail"
import {Cart} from "./pages/Cart"

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path={"/category/:categoryId"} element={<Category />} />
            <Route path={"/product/:productId"} element={<Detail />} />
            <Route path="/cart" element={<Cart/>} />
          </Route>
        </Routes>
    </BrowserRouter>
    
  );
}

export default App;
