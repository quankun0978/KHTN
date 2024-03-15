import * as ROUTERS from '@/router/routes';

export const TYPE_ENVIRONMENT = { DEV: 0, PRODUCT: 1 };

export const ITEMS_MENUS_SLIDER = {
  DASHBOARD: { KEY: 'DASHBOARD', LABEL: 'Dashboard' },

  THU_THAP_TTKH: { KEY: 'THU_THAP_TTKH', LABEL: 'Thu thập TTKH' },
  THU_THAP_KH_MOI: { KEY: 'THU_THAP_KH_MOI', LABEL: 'Thu thập KH mới' },
  THU_THAP_KH_THEO_FILE: { KEY: 'THU_THAP_KH_THEO_FILE', LABEL: 'Thu thập theo file' },

  KHO_KH: { KEY: 'KHO_KH', LABEL: 'Kho khách hàng' },
  KHO_KH_HIEN_HUU: { KEY: 'KHO_KH_HIEN_HUU', LABEL: 'Kho hiện hữu' },
  KHO_KH_MOI: { KEY: 'KHO_KH_MOI', LABEL: 'Kho thu thập mới' },

  PHAN_GIAO_KH: { KEY: 'PHAN_GIAO_KH', LABEL: 'Phân giao KH' },

  TRUYEN_THONG: { KEY: 'TRUYEN_THONG', LABEL: 'Truyền thông' },

  TAI_KHOAN: { KEY: 'TAI_KHOAN', LABEL: 'Tài khoản' },
  TAI_KHOAN_SUB: { KEY: 'TAI_KHOAN_SUB', LABEL: 'Tài khoản' },
  NHOM_TAI_KHOAN: { KEY: 'NHOM_TAI_KHOAN', LABEL: 'Nhóm tài khoản' },
  PHAN_QUYEN: { KEY: 'PHAN_QUYEN', LABEL: 'Phân quyền' },
};

export const BREADCRUMB_PATH = {
  [ROUTERS.HOME_PAGE]: 'Dashboard',
  [ROUTERS.THU_THAP_TTKH]: 'Thu thập dữ liệu khách hàng',
  [ROUTERS.THU_THAP_KH_MOI]: 'Khách hàng mới',
  [ROUTERS.THU_THAP_KH_THEO_FILE]: 'Quản lý Import',
  [ROUTERS.KHO_KH_HIEN_HUU]: 'Hành vi khách hàng',
  [ROUTERS.NEW_KHO_KH_HIEN_HUU]: 'Thêm mới hành vi khách hàng',
  [ROUTERS.DETAIL_KHO_KH_HIEN_HUU]: 'Chi tiết hành vi khách hàng',
  [ROUTERS.PHAN_GIAO_KH]: 'Phân giao khách hàng',
  [ROUTERS.TRUYEN_THONG]: 'Truyền thông',
  [ROUTERS.TAI_KHOAN]: 'Tài khoản',
  [ROUTERS.NHOM_TAI_KHOAN]: 'Nhóm tài khoản',
  [ROUTERS.PHAN_QUYEN]: 'Phân quyền',
};
