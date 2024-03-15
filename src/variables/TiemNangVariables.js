/*  NOTE:
    Rule:   folder_page_type_nameAction 
    eg: TIEM_NANG_DS_FORM_SEARCH = 'tiem-nang-form-search';
        folder: TIEM_NANG, PHAN_QUYEN, TAI_KHOAN, KHO_KH,...
        page: DS, NEW, EDIT,...
        type: FORM, INPUT, SELECT,... 
        nameAction: SEARCH, PHONE, NAME, SOURCE,...
    
*/
// Page Danh sach
export const TIEM_NANG_DS_FORM_SEARCH = 'tiem-nang-ds-form-search';

export const TIEM_NANG_DS_INPUT_PHONE = 'tiem-nang-ds-input-phone';
export const TIEM_NANG_DS_INPUT_NAME = 'tiem-nang-ds-input-name';

export const TIEM_NANG_DS_SELECT_SOURCE = 'tiem-nang-ds-select-source';
export const TIEM_NANG_DS_SELECT_TTKD = 'tiem-nang-ds-select-ttkd';
export const TIEM_NANG_DS_SELECT_PBH = 'tiem-nang-ds-select-pbh';
export const TIEM_NANG_DS_SELECT_PHUONG = 'tiem-nang-ds-select-phuong';

// Page Them moi
export const TIEM_NANG_NEW_INFO_INPUT_TEN = ['profileInfo', 'customerName'];
export const TIEM_NANG_NEW_INFO_INPUT_SDT = ['profileInfo', 'phoneNumber'];
export const TIEM_NANG_NEW_INFO_SELECT_GENDER = ['profileInfo', 'gender'];
export const TIEM_NANG_NEW_INFO_SELECT_GIAY_TO = ['profileInfo', 'identificationType'];
export const TIEM_NANG_NEW_INFO_TIME_NGAY_SINH = ['profileInfo', 'dateOfBirth'];
export const TIEM_NANG_NEW_INFO_TIME_NGAY_CAP = ['profileInfo', 'identificationProvideDate'];
export const TIEM_NANG_NEW_INFO_INPUT_SO_GIAY_TO = ['profileInfo', 'identificationCode'];
export const TIEM_NANG_NEW_INFO_INPUT_NOI_CAP = ['profileInfo', 'identificationProvidePlace'];
export const TIEM_NANG_NEW_INFO_INPUT_SO_THICH = ['profileInfo', 'hobby'];
export const TIEM_NANG_NEW_INFO_SELECT_TT_HON_NHAN = ['profileInfo', 'maritalStatus'];
export const TIEM_NANG_NEW_INFO_SELECT_NGHE_NGHIEP = ['profileInfo', 'job'];
export const TIEM_NANG_NEW_INFO_SELECT_THU_NHAP = ['profileInfo', 'incomePerMonth'];
export const TIEM_NANG_NEW_INFO_SELECT_TINH_THANH = ['profileInfo', 'addressInfo', 'cityId'];
export const TIEM_NANG_NEW_INFO_SELECT_QUAN_HUYEN = ['profileInfo', 'addressInfo', 'districtId'];
export const TIEM_NANG_NEW_INFO_SELECT_PHUONG_XA = ['profileInfo', 'addressInfo', 'wardId'];
export const TIEM_NANG_NEW_INFO_SELECT_DUONG_PHO = ['profileInfo', 'addressInfo', 'streetId'];
export const TIEM_NANG_NEW_INFO_SELECT_NGO_AP = ['profileInfo', 'addressInfo', 'hamletId'];
export const TIEM_NANG_NEW_INFO_SELECT_KHU = ['profileInfo', 'addressInfo', 'areaId'];
export const TIEM_NANG_NEW_INFO_INPUT_SO_NHA = ['profileInfo', 'addressInfo', 'homeNumber'];
export const TIEM_NANG_NEW_INFO_SELECT_DAC_DIEM = ['profileInfo', 'addressInfo', 'characteristic'];
export const TIEM_NANG_NEW_INFO_INPUT_DIA_CHI = ['profileInfo', 'addressInfo', 'additionalAddress'];
export const TIEM_NANG_NEW_INFO_INPUT_DIEN_TICH = ['profileInfo', 'addressInfo', 'acreage'];
export const TIEM_NANG_NEW_INFO_SELECT_KC_HA_TANG = ['profileInfo', 'infrastructure'];
export const TIEM_NANG_NEW_INFO_INPUT_MANG_XA_HOI = ['profileInfo', 'socialNetworkInfo'];
export const TIEM_NANG_NEW_INFO_INPUT_GHI_CHU = ['profileInfo', 'note'];
export const TIEM_NANG_NEW_INFO_INPUT_TONG_TV = ['profileInfo', 'totalMember'];
export const TIEM_NANG_NEW_INFO_LIST_TV = ['profileInfo', 'familyMemberInfoList'];
export const TIEM_NANG_NEW_INFO_INPUT_TEN_TV = 'memberName';
export const TIEM_NANG_NEW_INFO_SELECT_QUAN_HE_TV = 'relationship';
export const TIEM_NANG_NEW_INFO_INPUT_SDT_TV = 'phoneNumber';
export const TIEM_NANG_NEW_INFO_INPUT_SERVICE_USING = 'Services';

export const TIEM_NANG_EDIT_INFO_SELECT_TYPE_EDIT = 'tiem-nang-edit-info-select-type-edit';
export const TIEM_NANG_EDIT_INFO_SELECT_FIELD_NAME = 'tiem-nang-edit-info-select-field-name';
export const TIEM_NANG_EDIT_INFO_INPUT_FIELD_NEW_VALUE = 'tiem-nang-edit-info-input-field-new-value';

export const AREA_TYPE = {
  HAMLET: 'HAMLET',
  AREA: 'AREA',
  STREET: 'STREET',
};
//List options form
export const listIdentificationType = [
  { label: 'CMT', value: 'CMT' },
  { label: 'CCCD', value: 'CCCD' },
  { label: 'Hộ chiếu', value: 'PASSPORT' },
];

export const listGender = [
  { label: 'Nam', value: 'MALE' },
  { label: 'Nữ', value: 'FEMALE' },
  { label: 'Khác', value: 'OTHER' },
];

export const listMaritalStatus = [
  { label: 'Độc thân', value: 'SINGLE' },
  { label: 'Có gia đình', value: 'MARRIED' },
];

export const listJob = [
  { label: 'Văn phòng', value: 'Văn phòng' },
  { label: 'Học sinh/sinh viên', value: 'Học sinh/sinh viên' },
  { label: 'Nông dân', value: 'Nông dân' },
  { label: 'Công nhân', value: 'Công nhân' },
  { label: 'Lao động tự do', value: 'Lao động tự do' },
  { label: 'Tiểu thương', value: 'Tiểu thương' },
  { label: 'Thương gia', value: 'Thương gia' },
  { label: 'Khác', value: 'Khác' },
];

export const listIncomePerMonth = [
  { label: 'Dưới 10', value: 'Dưới 10' },
  { label: '10-25', value: '10-25' },
  { label: '25-40', value: '25-40' },
  { label: 'Trên 40', value: 'Trên 40' },
];

export const listInfrastructure = [
  { label: 'Nhà cấp 4', value: 'Nhà cấp 4' },
  { label: 'Nhà 2 tầng', value: 'Nhà 2 tầng' },
  { label: 'Nhà 3 tầng trở lên', value: 'Nhà 3 tầng trở lên' },
  { label: 'Chung cư/Căn hộ', value: 'Chung cư/Căn hộ' },
  { label: 'Văn phòng', value: 'Văn phòng' },
  { label: 'Quán ăn/Café', value: 'Quán ăn/Café' },
  { label: 'Phòng trọ', value: 'Phòng trọ' },
];
