import axiosInstance from "../helpers/axios";
import { categoryConstants } from "./constants";

export const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({
      type: categoryConstants.GET_ALL_CATEGORIES_REQUEST,
    });

    const res = await axiosInstance.get("category/getCategory");

    if (res.status === 200) {
      const { categoryList } = res.data;
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories: categoryList },
      });
    } else {
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};