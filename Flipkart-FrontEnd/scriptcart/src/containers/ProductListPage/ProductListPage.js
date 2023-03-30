import React from "react";
import Layout from "../../components/Layout/Layout";
import ProductStore from "./ProductStore/ProductStore";
import "./style.css";
import { getParams } from "../../utils/getParams";
import ProductPage from "./ProductPage/ProductPage";

const ProductListPage = (props) => {
  const renderProduct = () => {
    console.log(props);
    const params = getParams(props.location.search);
    // console.log(params, "Params");
    let content = null;

    switch (params.type) {
      case "store":
        content = <ProductStore {...props} />;
        break;
      case "page":
        content = <ProductPage {...props} />;
        break;
      default:
        content = null;
    }
    return content;
  };

  return <Layout>{renderProduct()}</Layout>;
};

export default ProductListPage;
