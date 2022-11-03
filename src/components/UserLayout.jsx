import {NavBar} from "./NavBar";
import Footer from "./Footer";
import {Outlet} from 'react-router-dom';

export const UserLayout = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};
