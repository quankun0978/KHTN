import Cookies from 'universal-cookie';

import * as actionTypes from '@/redux/auth/type';
import { UserService } from '@/api/UserService';
import { localStorageDelete, localStorageSet } from '@/utils/storage';
import { COOKIES_TOKEN_NAME, HTTP_CODE, HTTP_STATUS } from '@/config/apiConfig';

const cookies = new Cookies();
const d = new Date();
const week = 7 * 86400 * 1000;

export const login =
  ({ loginData }) =>
  async (dispatch) => {
    dispatch({ type: actionTypes.REQUEST_LOADING });
    const resLogin = await UserService.login(loginData);

    if (resLogin.status === HTTP_STATUS.OK && resLogin.data && resLogin.data.errorCode === HTTP_CODE.SUCCESS) {
      localStorageSet('auth', { currentLogin: resLogin.data.data, isAuthorize: true, isLoading: false, isSuccess: true });
      d.setTime(d.getTime() + week);
      cookies.set(COOKIES_TOKEN_NAME, resLogin.data.data.token, { path: '/', expires: d });
      cookies.set('email', loginData.email, { path: '/', expires: d });
      localStorageDelete('isLogout');
      dispatch({ type: actionTypes.REQUEST_SUCCESS, payload: resLogin.data.data });
    }
  };

export const logout = () => async (dispatch) => {
  dispatch({ type: actionTypes.LOGOUT_SUCCESS });
  localStorageDelete('auth');
};
