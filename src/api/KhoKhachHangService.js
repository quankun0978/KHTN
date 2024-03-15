import { postRequest } from './http';

export const KhoKhachHangService = {
  new_customer: function (cleanFn) {
    const URL = `/criteria/new_customer`;
    return postRequest(URL, {}, {}, cleanFn);
  },
};
