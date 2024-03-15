import { combineReducers } from 'redux';

import { reducer as authReducer } from '@/redux/auth';
import { reducer as khoKhachHangReducer } from '@/redux/khokhachhang';

import { reducer as phanQuyenReducer } from '@/redux/phanquyen';

import { reducer as tiemNangReducer } from '@/redux/tiemnang';


// Combine all reducers.

const rootReducer = combineReducers({
  auth: authReducer,
  khoKhachHang: khoKhachHangReducer,

  phanQuyen: phanQuyenReducer,
  tiemNang: tiemNangReducer,

});

export default rootReducer;
