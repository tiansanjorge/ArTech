import {NavBar} from "./NavBar";
import Footer from "./Footer";
import {Outlet} from 'react-router-dom';
import { SideBanner } from "./SideBanner";

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
      <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "space-between",
      }}
      >
        <div style={{
        minHeight: "100vh",
        }} className="col-2 p-4">
          <SideBanner/>
        </div>
        <Outlet/>
        <div style={{
        minHeight: "100vh",
        }}className="col-2 p-4">
          <SideBanner/>
        </div>
      </div>
      <Footer />
    </div>
  );
};
