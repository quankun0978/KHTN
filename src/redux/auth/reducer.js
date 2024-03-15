import * as actionTypes from '@/redux/auth/type';

const INITIAL_STATE = {
  currentLoginLogin: {},
  isAuthorize: false,
  isLoading: false,
  isSuccess: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_LOADING:
      return {
        ...state,
        isAuthorize: false,
        isLoading: true,
      };
    case actionTypes.REQUEST_FAILED:
      return INITIAL_STATE;

    case actionTypes.REQUEST_SUCCESS:
      return {
        currentLogin: action.payload,
        isAuthorize: true,
        isLoading: false,
        isSuccess: true,
      };

    case actionTypes.REGISTER_SUCCESS:
      return {
        currentLogin: null,
        isAuthorize: false,
        isLoading: false,
        isSuccess: true,
      };
    case actionTypes.LOGOUT_SUCCESS:
      return INITIAL_STATE;

    case actionTypes.LOGOUT_FAILED:
      return {
        currentLogin: action.payload,
        isAuthorize: true,
        isLoading: false,
        isSuccess: true,
      };

    default:
      return state;
  }
};

export default authReducer;
