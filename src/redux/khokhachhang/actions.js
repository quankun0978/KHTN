import * as actionTypes from '@/redux/khokhachhang/type';
import { KhoKhachHangService } from '@/api/KhoKhachHangService';
import { HTTP_CODE, HTTP_STATUS } from '@/config/apiConfig';

export const listDemographic = () => async (dispatch) => {
  dispatch({ type: actionTypes.REQUEST_LOADING });
  const resListDemographic = await KhoKhachHangService.new_customer();
  if (resListDemographic.status === HTTP_STATUS.OK && resListDemographic.data && resListDemographic.data.code === HTTP_CODE.SUCCESS) {
    dispatch({ type: actionTypes.LIST_CRITERIA_NEW_CUSTOMER, payload: resListDemographic.data.data });
  }
};
