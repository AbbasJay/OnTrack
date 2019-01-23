import { SET_DATA, SET_PAGE_NUMBER } from "./actions";

export default (state = {}, action) => {
  switch (action.type) {
    case SET_DATA: {
      return {
        ...state,
        data: action.data
      };
    }
    case SET_PAGE_NUMBER: {
      return {
        ...state,
        pageNumber: action.pageNumber
      };
    }
    default:
      return state;
  }
};
