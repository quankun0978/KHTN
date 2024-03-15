import * as actionTypes from '@/redux/tiemnang/type';

const INITIAL_STATE = {
  data: [],
  cities: [],
  districts: [],
  wards: [],
  areas: [],
  isLoading: false,
  isSuccess: false,
};

const tiemNangReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.REQUEST_FAILED:
      return INITIAL_STATE;
    case actionTypes.FIND_CUSTOMER:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isSuccess: true,
      };
    case actionTypes.GET_LIST_CITY:
      return {
        ...state,
        cities: action.payload,
        isLoading: false,
        isSuccess: true,
      };
    case actionTypes.GET_LIST_DISTRICT:
      return {
        ...state,
        districts: action.payload,
        isLoading: false,
        isSuccess: true,
      };
    case actionTypes.GET_LIST_WARD:
      return {
        ...state,
        wards: action.payload,
        isLoading: false,
        isSuccess: true,
      };
    case actionTypes.GET_LIST_AREA:
      return {
        ...state,
        areas: action.payload,
        isLoading: false,
        isSuccess: true,
      };
    default:
      return state;
  }
};

export default tiemNangReducer;
