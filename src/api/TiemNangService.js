import { postRequest } from './http';

export const TiemNangService = {
  find_customer: function (data, cleanFn) {
    const URL = `/new_customer/find/phone/${data}`;
    return postRequest(URL, {}, {}, cleanFn);
  },
  list_city: function (cleanFn) {
    const URL = `/address/cities`;
    return postRequest(URL, {}, {}, cleanFn);
  },
  list_district: function (id, cleanFn) {
    const URL = `/address/districts/${id}`;
    return postRequest(URL, {}, {}, cleanFn);
  },
  list_ward: function (id, cleanFn) {
    const URL = `/address/wards/${id}`;
    return postRequest(URL, {}, {}, cleanFn);
  },
  list_area: function (data, cleanFn) {
    const URL = `/address/neighborhoods/${data.id}/${data.type}`;
    return postRequest(URL, {}, {}, cleanFn);
  },
};
