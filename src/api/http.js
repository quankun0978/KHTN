import axios from 'axios';
import Cookies from 'universal-cookie';
import { isFunction } from 'lodash';

import { Notification } from '@/component/common/Notification/Notification';
import { API_TEST_BACKEND_URL, API_TIMEOUT, COOKIES_TOKEN_NAME, COOKIES_USER, HTTP_CODE } from '@/config/apiConfig';

const cookies = new Cookies();

const axiosInstance = axios.create({
  baseURL: API_TEST_BACKEND_URL,
  timeout: API_TIMEOUT,
  // withCredentials: true,
});

/* function handler request */

const sessionExpiredHandler = () => {
  Notification.error('Phiên làm việc đã hết hạn, Vui lòng đăng nhập lại');
  cookies.remove(COOKIES_USER, { path: '/' });
  cookies.remove(COOKIES_TOKEN_NAME, { path: '/' });
  window.location.href = '/dashboard/login';
};

/* function request */
export const postRequest = async (url, data, config = {}, cleanFn = () => {}) => {
  try {
    const requestTime = Date.now();
    const token = cookies.get(COOKIES_TOKEN_NAME) || '';
    const headersInstance = {
      'Content-Type': 'application/json',
      RequestTime: requestTime,
      Authorization: `Bearer ${token}`,
      ...config.headers,
    };
    const newConfig = { ...config, headers: headersInstance };

    const res = await axiosInstance.post(url, data, newConfig);
    if (res?.status === HTTP_CODE.SESSION_EXPIRED || res?.data?.errorCode === HTTP_CODE.SESSION_EXPIRED) return sessionExpiredHandler();

    return res;
  } catch (error) {
    const { errRes } = error;
    if (errRes?.status === HTTP_CODE.SESSION_EXPIRED || errRes?.data?.status === HTTP_CODE.SESSION_EXPIRED) return sessionExpiredHandler();

    if (errRes && errRes.status) {
      return errRes.data;
    } else {
      if (navigator.onLine) {
        // Code to execute when there is internet connection
        Notification.error({
          message: 'Problem connecting to server',
          description: 'Cannot connect to the server, Try again later',
        });
        return {
          success: false,
          result: error,
          message: 'Cannot connect to the server, Check your internet network',
        };
      } else {
        // Code to execute when there is no internet connection
        Notification.error({
          message: 'No internet connection',
          description: 'Cannot connect to the Internet, Check your internet network',
        });
        return {
          success: false,
          result: error,
          message: 'Cannot connect to the server, Check your internet network',
        };
      }
    }
  } finally {
    if (isFunction(cleanFn)) cleanFn();
  }
};

export const source = () => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  return source;
};
