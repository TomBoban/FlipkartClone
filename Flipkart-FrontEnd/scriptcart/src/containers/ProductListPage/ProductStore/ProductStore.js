import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductBySlug } from "../../../actions/productAction";
import { generatePublicUrl } from "../../../urlConfig";
import { Link } from "react-router-dom";
import "./style.css";
import Card from "../../../components/UI/Card/Card";
import { MaterialButton } from "../../../components/MaterialUI/Material";

const ProductStore = (props) => {
  const dispatch = useDispatch();

  const product = useSelector((state) => state.product);
  const [priceRange, setPriceRange] = useState({
    under5k: 5000,
    under10k: 10000,
    under15k: 15000,
    under20k: 20000,
    under30k: 30000,
  });

  useEffect(() => {
    // console.log(props);
    const { match } = props;
    dispatch(getProductBySlug(match.params.slug));
  }, []);

  return (
    <Fragment>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <Card
            headerLeft={`${props.match.params.slug} mobile under ${priceRange[key]}`}
            headerRight={
              <MaterialButton
                title={"VIEW ALL"}
                style={{
                  width: "96px",
                }}
                bgColor="#2874f0"
                fontSize="12px"
              />
            }
            style={{
              width: "calc(100% - 40px)",
              margin: "20px",
            }}
          >
            <div style={{ display: "flex" }}>
              {product.productsByPrice[key].map((product) => (
                <Link
                  to={`/${product.slug}/${product._id}/p`}
                  style={{ display: "block" }}
                  className="productContainer"
                >
                  <div className="productImgContainer">
                    <img
                      alt=""
                      src={generatePublicUrl(product.productPictures[0].img)}
                    />
                  </div>
                  <div className="productInfo">
                    <div style={{ margin: "5px 0" }}>{product.name}</div>
                    <div>
                      <span>4.3</span>&nbsp;
                      <span>3355</span>
                    </div>
                    <div className="productPrice">{product.price}</div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        );
      })}
    </Fragment>
  );
};

export default ProductStore;
