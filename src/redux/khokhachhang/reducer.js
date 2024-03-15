import * as actionTypes from '@/redux/khokhachhang/type';

const INITIAL_STATE = {
  data: {},
  isLoading: false,
  isSuccess: false,
};

const khoKhanhHangReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.REQUEST_FAILED:
      return INITIAL_STATE;

    case actionTypes.LIST_CRITERIA_NEW_CUSTOMER:
      return {
        data: action.payload,
        isLoading: false,
        isSuccess: true,
      };

    default:
      return state;
  }
};

export default khoKhanhHangReducer;
