import { categoryConstants } from "../actions/constants";

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const buildNewCategories = (parentId, categories, category) => {
  let myCat = [];

  if (parentId == undefined) {
    return [
      ...categories,
      {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        children: [],
      },
    ];
  }

  for (let cat of categories)
    if (cat._id == parentId) {
      myCat.push({
        ...cat,
        children: cat.children
          ? buildNewCategories(
              parentId,
              [
                ...cat.children,
                {
                  _id: category._id,
                  name: category.name,
                  slug: category.slug,
                  parent: category.parentId,
                  children: category.children,
                },
              ],
              category
            )
          : [],
      });
    } else {
      myCat.push({
        ...cat,
        children: cat.children
          ? buildNewCategories(parentId, cat.children, category)
          : [],
      });
    }

  return myCat;
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case categoryConstants.GET_ALL_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload.categories,
        loading: false,
      };
    case categoryConstants.GET_ALL_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
      const category = action.payload.category;
      const updatedCat = buildNewCategories(
        category.parentId,
        state.categories,
        category
      );
      console.log(updatedCat, "updatedCat");

      return {
        ...state,
        categories: updatedCat,
        loading: false,
      };
    case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
