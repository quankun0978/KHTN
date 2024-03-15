import { postRequest } from './http';

export const DashboardService = {
  CONFIG_DEFAULT: function (data, cleanFn) {
    const URL = `/group/default_config`;
    return postRequest(URL, data, {}, cleanFn);
  },
};
