import axiosInstance from "../helpers/axios";
import { productConstants } from "./constants";

export const getProductBySlug = (slug) => {
  return async (dispatch) => {
    try {
      const res = await axiosInstance.get(`/products/${slug}`);

      if (res.status === 200) {
        dispatch({
          type: productConstants.GET_PRODUCTS_BY_SLUG,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log(error);
    }

    // else{
    //     dispatch({

    //     })
    // }
    // console.log(res, "res");
  };
};

export const getProductPage = (payload) => {
  return async (dispatch) => {
    try {
      const { cid, type } = payload.params;
      // console.log(payload);

      const res = await axiosInstance.get(`/page/${cid}/${type}`);
      dispatch({
        type: productConstants.GET_PRODUCT_PAGE_REQUEST,
      });
      // console.log(res, "Res Page");

      if (res.status === 200) {
        const { page } = res.data;
        dispatch({
          type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
          payload: { page },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: productConstants.GET_PRODUCT_PAGE_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProductDetailsById = (payload) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST });
    let res;
    try {
      const { productId } = payload.params;
      res = await axiosInstance.get(`/product/${productId}`);
      console.log(res, "resid");
      dispatch({
        type: productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
        payload: { productDetails: res.data.product },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
