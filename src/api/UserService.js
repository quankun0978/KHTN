import { postRequest } from './http';

export const UserService = {
  login: function (data, cleanFn) {
    const URL = `/user/login`;
    return postRequest(URL, data, {}, cleanFn);
  },
};
