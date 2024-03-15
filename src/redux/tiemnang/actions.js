import * as actionTypes from '@/redux/tiemnang/type';
import { TiemNangService } from '@/api/TiemNangService';
import { HTTP_CODE, HTTP_STATUS } from '@/config/apiConfig';

export const findCustomer = (phone) => async (dispatch) => {
  dispatch({ type: actionTypes.REQUEST_LOADING });
  const resFindCustomer = await TiemNangService.find_customer(phone);
  if (resFindCustomer.status === HTTP_STATUS.OK && resFindCustomer.data && resFindCustomer.data.code === HTTP_CODE.SUCCESS) {
    dispatch({ type: actionTypes.FIND_CUSTOMER, payload: resFindCustomer.data.data });
  }
};

export const listCity = () => async (dispatch) => {
  dispatch({ type: actionTypes.REQUEST_LOADING });
  const resListCity = await TiemNangService.list_city();
  if (resListCity.status === HTTP_STATUS.OK && resListCity.data && resListCity.data.code === HTTP_CODE.SUCCESS) {
    dispatch({ type: actionTypes.GET_LIST_CITY, payload: resListCity.data.data });
  }
};

export const listDistrict = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.REQUEST_LOADING });
  const resListDistrict = await TiemNangService.list_district(id);
  if (resListDistrict.status === HTTP_STATUS.OK && resListDistrict.data && resListDistrict.data.code === HTTP_CODE.SUCCESS) {
    dispatch({ type: actionTypes.GET_LIST_DISTRICT, payload: resListDistrict.data.data });
  }
};

export const listWard = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.REQUEST_LOADING });
  const resListWard = await TiemNangService.list_ward(id);
  if (resListWard.status === HTTP_STATUS.OK && resListWard.data && resListWard.data.code === HTTP_CODE.SUCCESS) {
    dispatch({ type: actionTypes.GET_LIST_WARD, payload: resListWard.data.data });
  }
};

export const listArea = (data) => async (dispatch) => {
  dispatch({ type: actionTypes.REQUEST_LOADING });
  const resListArea = await TiemNangService.list_area(data);
  if (resListArea.status === HTTP_STATUS.OK && resListArea.data && resListArea.data.code === HTTP_CODE.SUCCESS) {
    dispatch({ type: actionTypes.GET_LIST_AREA, payload: resListArea.data.data });
  }
};
