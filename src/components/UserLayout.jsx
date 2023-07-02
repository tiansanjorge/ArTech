import {NavBar} from "./NavBar";
import Footer from "./Footer";
import {Outlet} from 'react-router-dom';
import { SideBanner } from "./SideBanner";

export const UserLayout = () => {
  return (
    <div className="minH d-flex flex-column justify-content-between">
      <NavBar />
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center align-items-lg-start">
        <div className="col-12 col-sm-10 col-md-8 col-lg-2 p-lg-4 p-2 ">
          <SideBanner/>
        </div>
        <Outlet/>
        <div className="col-12 col-sm-10 col-md-8 col-lg-2 p-lg-4 p-2">
          <SideBanner/>
        </div>
      </div>
      <Footer />
    </div>
  );
};
