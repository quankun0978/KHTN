import * as actionTypes from '@/redux/phanquyen/type';

const INITIAL_STATE = {
  dataDefaultConfig: {},
  dataDetail: {},
};

const phanQuyenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.CONFIG_DEFAULT:
      return {
        ...state,
        dataDefaultConfig: action.payload,
      };
    case actionTypes.GET_DETAIL_GROUP_BY_ID:
      return {
        ...state,
        dataDetail: action.payload,
      };
    default:
      return state;
  }
};

export default phanQuyenReducer;
