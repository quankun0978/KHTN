import * as actionTypes from '@/redux/phanquyen/type';
import { DashboardService } from '@/api/DashboardService';
import { PhanQuyen } from '@/api/Phanquyen';
import { HTTP_CODE, HTTP_STATUS } from '@/config/apiConfig';

export const configDefault = (data) => async (dispatch) => {
  const resDefaultConfig = await DashboardService.CONFIG_DEFAULT(data);
  if (resDefaultConfig.status === HTTP_STATUS.OK && resDefaultConfig.data && resDefaultConfig.data.code === HTTP_CODE.SUCCESS) {
    dispatch({ type: actionTypes.CONFIG_DEFAULT, payload: resDefaultConfig.data.data });
  }
};

export const getDetailGroupById = (id) => async (dispatch) => {
  const resDetailGroupById = await PhanQuyen.GET_DETAIL_GROUP_BY_ID(id);
  if (resDetailGroupById.status === HTTP_STATUS.OK && resDetailGroupById.data && resDetailGroupById.data.code === HTTP_CODE.SUCCESS) {
    dispatch({ type: actionTypes.GET_DETAIL_GROUP_BY_ID, payload: resDetailGroupById.data.data });
  }
};
