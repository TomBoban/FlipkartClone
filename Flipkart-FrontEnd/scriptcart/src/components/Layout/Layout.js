import React, { Fragment } from "react";
import Header from "../Header/Header";
import MenuHeader from "../MenuHeader./MenuHeader";

const Layout = (props) => {
  return (
    <Fragment>
      <Header />
      <MenuHeader />
      {props.children}
    </Fragment>
  );
};

export default Layout;
