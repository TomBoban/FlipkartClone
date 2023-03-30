import "./App.css";
import HomePage from "./containers/HomePage/HomePage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductListPage from "./containers/ProductListPage/ProductListPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./actions/authAction";
import ProductDetails from "./containers/ProductDetailsPage/ProductDetails";
import CartPage from "./containers/CartPage/CartPage";
import { updateCart } from "./actions/cartActions";
import CheckoutPage from "./containers/CheckoutPage/CheckoutPage";
import OrderPage from "./containers/OrderPage/OrderPage";
import OrderDetailsPage from "./containers/OrderDetailsPage/OrderDetailsPage";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);

  useEffect(() => {
    dispatch(updateCart());
  }, [auth.authenticate]);

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/account/orders" component={OrderPage} />
          <Route path="/order_details/:orderId" component={OrderDetailsPage} />
          <Route path="/:productSlug/:productId/p" component={ProductDetails} />
          <Route path="/:slug" component={ProductListPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
