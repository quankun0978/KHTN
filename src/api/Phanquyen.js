import { postRequest } from './http';

export const PhanQuyen = {
  GET_DETAIL_GROUP_BY_ID: function (id, data, cleanFn) {
    const URL = `/group/${id}`;
    return postRequest(URL, data, {}, cleanFn);
  },
  LIST_GROUP: function (data, cleanFn) {
    const URL = `/groups`;
    return postRequest(URL, data, {}, cleanFn);
  },

  CREATE_GROUP: function (data, cleanFn) {
    const URL = `/group/create`;
    return postRequest(URL, data, {}, cleanFn);
  },
  UPDATE_GROUP: function (id, data, cleanFn) {
    const URL = `/group/update/${id}`;
    return postRequest(URL, data, {}, cleanFn);
  },
};
