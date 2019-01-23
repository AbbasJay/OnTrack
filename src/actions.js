export const SET_DATA = "SET_DATA";
export const SET_PAGE_NUMBER = "SET_PAGE_NUMBER";

export const SetData = data => {
  return {
    type: SET_DATA,
    data
  };
};

export const SetPageNumber = pageNumber => {
  return {
    type: SET_PAGE_NUMBER,
    pageNumber
  };
};
