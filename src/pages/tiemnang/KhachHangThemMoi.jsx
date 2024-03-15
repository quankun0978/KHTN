import { useEffect, useState } from 'react';
import { Space, Tabs, Form, Select, Checkbox } from 'antd';
import { random } from 'lodash';
import { Button, Card, DatePickerForm, Input, InputForm, InputNumberForm, ModalSimple, SelectForm, Step, Table } from '@/component/common';
import { IconEdit, IconInfo, IconMess, IconSearch } from '@/component/common/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FormListItemLabel, FormListTable } from '@/forms';
import RadioGroup from '@/component/common/Input/RadioGroup';
import * as TIEMNANG_VAR from '@/variables/TiemNangVariables';
import { useDispatch, useSelector } from 'react-redux';
import { findCustomer, listArea, listCity, listDistrict, listWard } from '@/redux/tiemnang/actions';
import { selectTiemNang } from '@/redux/tiemnang/selectors';

const columns = (funcObj = {}) => [
  { title: 'STT', dataIndex: 'index', key: 'index', width: '5%', align: 'center' },
  { title: 'Mã khách hàng', dataIndex: 'id_kh', key: 'phone', width: '20%', align: 'center' },
  { title: 'Số điện thoại', dataIndex: 'phone', key: 'name', width: '20%', align: 'center' },
  { title: 'Tên khách hàng', dataIndex: 'name', key: 'name', width: '20%', align: 'center' },
  { title: 'Nguồn thông tin', dataIndex: 'source_data', key: 'source_data', width: '20%', align: 'center' },
  { title: 'Người tạo', dataIndex: 'create_user', key: 'create_user', width: '20%', align: 'center' },
  {
    title: 'Thao tác',
    dataIndex: 'active',
    key: 'active',
    align: 'center',
    render: (_, row) => {
      return (
        <Space size="large">
          <button onClick={() => funcObj.showRequestEdit(row)}>
            <IconMess />
          </button>

          <button onClick={() => funcObj.showComment(row)}>
            <IconEdit />
          </button>
        </Space>
      );
    },
  },
];
const data = [
  { index: 1, id_kh: 'KH12345678', phone: '0856258795', name: 'Nguyễn Văn A', source_data: 'Media', create_user: 'chihtl@vnpt.vn' },
  { index: 2, id_kh: 'KH45678901', phone: '0865256478', name: 'Nguyễn Văn B', source_data: 'Thu thập', create_user: 'anhpnv@vnpt.vn' },
  { index: 3, id_kh: 'Kh23456789', phone: '0865256477', name: 'Nguyễn Văn C', source_data: 'Thu thập', create_user: 'linhht@vnpt.vn' },
];

const columnsRequest = (funcObj = {}) => [
  { title: 'STT', dataIndex: 'index', key: 'index', width: '5%', align: 'center' },
  {
    title: 'Người tạo yêu cầu',
    dataIndex: 'name',
    key: 'name',
    width: '15%',
    align: 'center',
    render: (_, row) => {
      return (
        <div className="flex flex-col">
          <p className="text-lg">{row.name}</p>
          <p className="">{row.email}</p>
        </div>
      );
    },
  },
  { title: 'Trường thông tin', dataIndex: 'field_info', key: 'field_info', width: '20%', align: 'center' },
  { title: 'Nội dung cũ', dataIndex: 'old_data', key: 'old_data', width: '20%', align: 'center' },
  { title: 'Nội dung mới', dataIndex: 'new_data', key: 'new_data', width: '20%', align: 'center' },
  { title: 'Trạng thái', dataIndex: 'status', key: 'status', width: '10%', align: 'center' },
  {
    title: 'Thao tác',
    dataIndex: 'active',
    key: 'active',
    align: 'center',
    render: (_, row) => {
      return (
        <Space size="small">
          <button onClick={() => funcObj.acceptRequest()}>
            <FontAwesomeIcon
              className="text-green-600 text-2xl"
              icon={faCircleCheck}
            />
          </button>

          <button onClick={() => funcObj.refuseRequest()}>
            <FontAwesomeIcon
              className="text-red-600 text-2xl"
              icon={faCircleXmark}
            />
          </button>
        </Space>
      );
    },
  },
];
const dataRequest = [
  { index: 1, old_data: 'KH12345678', field_info: '0856258795', name: 'Nguyễn Văn A', new_data: 'Media', status: 'Từ chối', email: 'chihtl@vnpt.vn' },
  { index: 2, old_data: 'KH45678901', field_info: '0865256478', name: 'Nguyễn Văn B', new_data: 'Thu thập', status: 'Đã duyệt', email: 'anhpnv@vnpt.vn' },
  { index: 3, old_data: 'Kh23456789', field_info: '0865256477', name: 'Nguyễn Văn C', new_data: 'Thu thập', status: '', email: 'linhht@vnpt.vn' },
];

const listTongGoiCuoc = [
  { label: '100k - 200k', value: '100k - 200k' },
  { label: '200k - 300k', value: '200k - 300k' },
  { label: '300k - 400k', value: '300k - 400k' },
  { label: '400k - 500k', value: '400k - 500k' },
  { label: '> 500k', value: '> 500k' },
];

const thongTinGiaDinhItems = [
  { name: TIEMNANG_VAR.TIEM_NANG_NEW_INFO_INPUT_TEN_TV, label: 'Tên' },
  {
    name: TIEMNANG_VAR.TIEM_NANG_NEW_INFO_SELECT_QUAN_HE_TV,
    label: 'Mối quan hệ',
    type: 'select',
    options: [
      { label: 'Ông', value: 'Ông' },
      { label: 'Bà', value: 'Bà' },
      { label: 'Bố', value: 'Bố' },
      { label: 'Mẹ', value: 'Mẹ' },
      { label: 'Vợ', value: 'Vợ' },
      { label: 'Chồng', value: 'Chồng' },
      { label: 'Con gái', value: 'Con gái' },
      { label: 'Con trai', value: 'Con trai' },
      { label: 'Anh/chị/em', value: 'Anh/chị/em' },
      { label: 'Họ hàng', value: 'Họ hàng' },
    ],
  },
  { name: TIEMNANG_VAR.TIEM_NANG_NEW_INFO_INPUT_SDT_TV, label: 'Số điện thoại' },
  { name: TIEMNANG_VAR.TIEM_NANG_NEW_INFO_INPUT_SERVICE_USING, label: 'Dịch vụ đang sử dụng' },
];

function KhachHangThemMoi() {
  const [phone, setPhone] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [step, setStep] = useState(0);
  const [searchRes, setSearchRes] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [openRequestEditModal, setOpenRequestEditModal] = useState(false);
  const [typeEdit, setTypeEdit] = useState(null);
  const [typeArea, setTypeArea] = useState();
  const dispatch = useDispatch();
  const { cities, districts, wards, areas } = useSelector(selectTiemNang);
  const [form] = Form.useForm();
  const [formPersonal] = Form.useForm();
  const addressInfo = Form.useWatch(['profileInfo', 'addressInfo'], formPersonal);

  useEffect(() => {
    dispatch(listCity());
  }, [dispatch]);

  const thongTinItems = [
    {
      name: TIEMNANG_VAR.TIEM_NANG_EDIT_INFO_SELECT_TYPE_EDIT,
      label: 'Yêu cầu',
      type: 'select',
      options: [
        {
          label: 'Chỉnh sửa',
          value: 0,
          subOptions: [
            { label: 'Tình trạng hôn nhân', value: 'Tình trạng hôn nhân' },
            { label: 'Sở thích', value: 'Sở thích' },
            { label: 'Nghề nghiệp', value: 'Nghề nghiệp' },
            { label: 'Thu nhập (triệu đồng/tháng)', value: 'Thu nhập (triệu đồng/tháng)' },
            { label: 'Tổng thành viên', value: 'Tổng thành viên' },
            { label: 'Dùng gói cước tích hợp', value: 'Dùng gói cước tích hợp' },
            { label: 'Nhà mạng', value: 'Nhà mạng' },
            { label: 'Gói cước', value: 'Gói cước' },
            { label: 'Giá cước', value: 'Giá cước' },
            { label: 'Tiền đặt cọc', value: 'Tiền đặt cọc' },
            { label: 'Đóng trước cước nhà mạng khác', value: 'Đóng trước cước nhà mạng khác' },
            { label: 'Số tháng trả trước', value: 'Số tháng trả trước' },
            { label: 'Tháng hết hạn', value: 'Tháng hết hạn' },
            { label: 'Số lượng TV', value: 'Số lượng TV' },
            { label: 'Khách hàng sử dụng Smart TV?', value: 'Khách hàng sử dụng Smart TV?' },
          ],
        },
        {
          label: 'Bổ sung',
          value: 1,
          subOptions: [
            { label: 'Đánh giá chất lượng dịch vụ đã sử dụng', value: 'Đánh giá chất lượng dịch vụ đã sử dụng' },
            { label: 'Dịch vụ', value: 'Dịch vụ' },
            { label: 'Loại hình thuê bao', value: 'Loại hình thuê bao' },
          ],
        },
      ],
      index: 0,
    },
    {
      name: TIEMNANG_VAR.TIEM_NANG_EDIT_INFO_SELECT_FIELD_NAME,
      label: 'Trường thông tin',
      type: 'select',
      isDependent: true,
      parentIndex: 0,
      options: [
        { label: 'Tình trạng hôn nhân', value: 'Tình trạng hôn nhân' },
        { label: 'Sở thích', value: 'Sở thích' },
        { label: 'Nghề nghiệp', value: 'Nghề nghiệp' },
        { label: 'Thu nhập (triệu đồng/tháng)', value: 'Thu nhập (triệu đồng/tháng)' },
        { label: 'Tổng thành viên', value: 'Tổng thành viên' },
        { label: 'Dùng gói cước tích hợp', value: 'Dùng gói cước tích hợp' },
        { label: 'Nhà mạng', value: 'Nhà mạng' },
        { label: 'Gói cước', value: 'Gói cước' },
        { label: 'Giá cước', value: 'Giá cước' },
        { label: 'Tiền đặt cọc', value: 'Tiền đặt cọc' },
        { label: 'Đóng trước cước nhà mạng khác', value: 'Đóng trước cước nhà mạng khác' },
        { label: 'Số tháng trả trước', value: 'Số tháng trả trước' },
        { label: 'Tháng hết hạn', value: 'Tháng hết hạn' },
        { label: 'Số lượng TV', value: 'Số lượng TV' },
        { label: 'Khách hàng sử dụng Smart TV?', value: 'Khách hàng sử dụng Smart TV?' },

        { label: 'Đánh giá chất lượng dịch vụ đã sử dụng', value: 'Đánh giá chất lượng dịch vụ đã sử dụng' },
        { label: 'Dịch vụ', value: 'Dịch vụ' },
        { label: 'Loại hình thuê bao', value: 'Loại hình thuê bao' },
      ],
      index: 1,
    },
    { name: TIEMNANG_VAR.TIEM_NANG_EDIT_INFO_INPUT_FIELD_NEW_VALUE, label: 'Yêu cầu chỉnh sửa', index: 2 },
  ];

  const showRequestEdit = () => {
    setOpenRequestEditModal(true);
  };

  const showComment = () => {
    setOpenModal(true);
  };

  const handleCheckPhoneExist = (phone) => {
    // dispatch(findCustomer(phone));
    // console.log({ data });
    const res = random(1, 3);
    setSearchRes(res);
    switch (res) {
      case 1:
        break;
      case 2:
        setStep(1);
        break;
      case 3:
      default:
        break;
    }
  };

  const onChange = (key) => {
    console.log(key);
  };

  const acceptRequest = () => {
    console.log('accept');
  };

  const refuseRequest = () => {
    console.log('refuse');
  };

  const onFinish = (params) => {
    console.log('form-edit', params);
  };

  // render
  const renderPersonalInfo = () => {
    return (
      <>
        <Card title="Thông tin cá nhân">
          <div className="flex">
            <div className="flex flex-col justify-center w-1/2 pr-4">
              <InputForm
                name={TIEMNANG_VAR.TIEM_NANG_NEW_INFO_INPUT_TEN}
                label="Tên khách hàng"
                isRequired
              />
              <InputForm
                name={TIEMNANG_VAR.TIEM_NANG_NEW_INFO_INPUT_SDT}
                label="SDT liên hệ"
                isRequired
              />
              <SelectForm
                name={TIEMNANG_VAR.TIEM_NANG_NEW_INFO_SELECT_GIAY_TO}
                label="Loại giấy tờ"
                placeholder="Lựa chọn"
                list={TIEMNANG_VAR.listIdentificationType}
              />
              <DatePickerForm
                name={TIEMNANG_VAR.TIEM_NANG_NEW_INFO_TIME_NGAY_CAP}
                label="Ngày cấp"
              />
              <SelectForm
                name={TIEMNANG_VAR.TIEM_NANG_NEW_INFO_SELECT_TT_HON_NHAN}
                label="Tình trạng hôn nhân"
                placeholder="Lựa chọn"
                list={TIEMNANG_VAR.listMaritalStatus}
              />
              <SelectForm
                name={TIEMNANG_VAR.TIEM_NANG_NEW_INFO_SELECT_NGHE_NGHIEP}
                label="Nghề nghiệp"
                placeholder="Lựa chọn"
                list={TIEMNANG_VAR.listJob}
              />
            </div>
            <div className="flex flex-col justify-center w-1/2 pl-4">
              <DatePickerForm
                name={TIEMNANG_VAR.TIEM_NANG_NEW_INFO_TIME_NGAY_SINH}
                label="Ngày sinh"
              />
              <SelectForm
                name={TIEMNANG_VAR.TIEM_NANG_NEW_INFO_SELECT_GENDER}
                label="Giới tính"
                placeholder="Lựa chọn"
                list={TIEMNANG_VAR.listGender}
              />
              <InputForm
                name={TIEMNANG_VAR.TIEM_NANG_NEW_INFO_INPUT_SO_GIAY_TO}
                label="Số giấy tờ"
              />
              <InputForm
                name={TIEMNANG_VAR.TIEM_NANG_NEW_INFO_INPUT_NOI_CAP}
                label="Nơi cấp"
              />
              <InputForm
                name={TIEMNANG_VAR.TIEM_NANG_NEW_INFO_INPUT_SO_THICH}
                label="Sở thích"
              />
              <SelectForm
                name={TIEMNANG_VAR.TIEM_NANG_NEW_INFO_SELECT_THU_NHAP}
                label="Thu nhập"
                smallLabel="(triệu đồng/tháng)"
                placeholder="Lựa chọn"
                list={TIEMNANG_VAR.listIncomePerMonth}
              />
            </div>
          </div>
        </Card>
        <div className="h-5"></div>
        <Card title="Thông tin địa chỉ">
          <div className="flex">
            <div className="flex flex-col justify-center w-1/2 pr-4">
              <SelectForm
                name={TIEMNANG_VAR.TIEM_NANG_NEW_INFO_SELECT_TINH_THANH}
                label="Tỉnh/Thành phố"
                placeholder="Lựa chọn"
                isRequired
                list={cities.map((city) => ({ label: city.name, value: city.id }))}
                onSelect={(id) => {
                  if (id !== addressInfo.cityId) {
                    formPersonal.setFieldValue(TIEMNANG_VAR.TIEM_NANG_NEW_INFO_SELECT_QUAN_HUYEN, '');
                    formPersonal.setFieldValue(TIEMNANG_VAR.TIEM_NANG_NEW_INFO_SELECT_PHUONG_XA, '');
                    formPersonal.setFieldValue(TIEMNANG_VAR.TIEM_NANG_NEW_INFO_SELECT_DUONG_PHO, '');
                    formPersonal.setFieldValue(TIEMNANG_VAR.TIEM_NANG_NEW_INFO_SELECT_NGO_AP, '');
                    formPersonal.setFieldValue(TIEMNANG_VAR.TIEM_NANG_NEW_INFO_SELECT_KHU, '');
                    setTypeArea();
                    dispatch(listDistrict(id));
                  }
                }}
              />
              <SelectForm
                name={TIEMNANG_VAR.TIEM_NANG_NEW_INFO_SELECT_QUAN_HUYEN}
                label="Quận/Huyện"
                placeholder="Lựa chọn"
                isRequired
                disabled={!districts.length}
                list={districts.map((district) => ({ label: district.name, value: district.id }))}
                onSelect={(id) => {
                  if (id !== addressInfo.districtId) {
                    formPersonal.setFieldValue(TIEMNANG_VAR.TIEM_NANG_NEW_INFO_SELECT_PHUONG_XA, '');
                    formPersonal.setFieldValue(TIEMNANG_VAR.TIEM_NANG_NEW_INFO_SELECT_DUONG_PHO, '');
                    formPersonal.setFieldValue(TIEMNANG_VAR.TIEM_NANG_NEW_INFO_SELECT_NGO_AP, '');
                    formPersonal.setFieldValue(TIEMNANG_VAR.TIEM_NANG_NEW_INFO_SELECT_KHU, '');
                    setTypeArea();
                    dispatch(listWard(id));
                  }
                }}
              />
              <SelectForm
                name={TIEMNANG_VAR.TIEM_NANG_NEW_INFO_SELECT_PHUONG_XA}
                label="Phường/Xã"
                placeholder="Lựa chọn"
                isRequired
                disabled={!wards.length}
                list={wards.map((ward) => ({ label: ward.name, value: ward.id }))}
                onSelect={(id) => {
                  if (id !== addressInfo.wardId) {
                    formPersonal.setFieldValue(TIEMNANG_VAR.TIEM_NANG_NEW_INFO_SELECT_DUONG_PHO, '');
                    formPersonal.setFieldValue(TIEMNANG_VAR.TIEM_NANG_NEW_INFO_SELECT_NGO_AP, '');
                    formPersonal.setFieldValue(TIEMNANG_VAR.TIEM_NANG_NEW_INFO_SELECT_KHU, '');
                    setTypeArea();
                  }
                }}
              />
              <InputForm
                name={TIEMNANG_VAR.TIEM_NANG_NEW_INFO_INPUT_SO_NHA}
                label="Số nhà"
              />
            </div>
            <div className="flex flex-col justify-center w-1/2 pl-4">
              <SelectForm
                name={TIEMNANG_VAR.TIEM_NANG_NEW_INFO_SELECT_DUONG_PHO}
                label="Đường/Phố"
                placeholder="Lựa chọn"
                hasCheckbox
                checked={typeArea === TIEMNANG_VAR.AREA_TYPE.STREET}
                disabled={typeArea !== TIEMNANG_VAR.AREA_TYPE.STREET}
                // disabledCheckbox={!!typeArea && typeArea !== TIEMNANG_VAR.AREA_TYPE.STREET}
                onChangeCheckbox={() => {
                  setTypeArea(TIEMNANG_VAR.AREA_TYPE.STREET);
                  const wardId = formPersonal.getFieldValue(TIEMNANG_VAR.TIEM_NANG_NEW_INFO_SELECT_PHUONG_XA);
                  if (!!wardId) {
                    dispatch(listArea({ id: wardId, type: TIEMNANG_VAR.AREA_TYPE.STREET }));
                  }
                }}
                list={areas.map((area) => ({ label: area.name, value: area.id }))}
              />
              <SelectForm
                name={TIEMNANG_VAR.TIEM_NANG_NEW_INFO_SELECT_NGO_AP}
                label="Ngõ/Ấp"
                placeholder="Lựa chọn"
                hasCheckbox
                checked={typeArea === TIEMNANG_VAR.AREA_TYPE.HAMLET}
                disabled={typeArea !== TIEMNANG_VAR.AREA_TYPE.HAMLET}
                // disabledCheckbox={!!typeArea && typeArea !== TIEMNANG_VAR.AREA_TYPE.HAMLET}
                onChangeCheckbox={() => {
                  setTypeArea(TIEMNANG_VAR.AREA_TYPE.HAMLET);
                  const wardId = formPersonal.getFieldValue(TIEMNANG_VAR.TIEM_NANG_NEW_INFO_SELECT_PHUONG_XA);
                  if (!!wardId) {
                    dispatch(listArea({ id: wardId, type: TIEMNANG_VAR.AREA_TYPE.HAMLET }));
                  }
                }}
                list={areas.map((area) => ({ label: area.name, value: area.id }))}
              />
              <SelectForm
                name={TIEMNANG_VAR.TIEM_NANG_NEW_INFO_SELECT_KHU}
                label="Khu"
                placeholder="Lựa chọn"
                hasCheckbox
                checked={typeArea === TIEMNANG_VAR.AREA_TYPE.AREA}
                disabled={typeArea !== TIEMNANG_VAR.AREA_TYPE.AREA}
                // disabledCheckbox={!!typeArea && typeArea !== TIEMNANG_VAR.AREA_TYPE.AREA}
                onChangeCheckbox={() => {
                  setTypeArea(TIEMNANG_VAR.AREA_TYPE.AREA);
                  const wardId = formPersonal.getFieldValue(TIEMNANG_VAR.TIEM_NANG_NEW_INFO_SELECT_PHUONG_XA);
                  if (!!wardId) {
                    dispatch(listArea({ id: wardId, type: TIEMNANG_VAR.AREA_TYPE.AREA }));
                  }
                }}
                list={areas.map((area) => ({ label: area.name, value: area.id }))}
              />
              <SelectForm
                name={TIEMNANG_VAR.TIEM_NANG_NEW_INFO_SELECT_DAC_DIEM}
                label="Đặc điểm"
                placeholder="Lựa chọn"
                list={[]}
              />
            </div>
          </div>
          <div className="flex w-full">
            <div className="flex flex-col justify-center w-full">
              <InputForm
                name={TIEMNANG_VAR.TIEM_NANG_NEW_INFO_INPUT_DIA_CHI}
                label="Địa chỉ"
                spanLabel={4}
                spanInput={20}
              />
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col justify-center w-1/2 pr-4">
              <InputNumberForm
                name={TIEMNANG_VAR.TIEM_NANG_NEW_INFO_INPUT_DIEN_TICH}
                label="Diện tích"
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/(,*)/g, '')}
              />
            </div>
            <div className="flex flex-col justify-center w-1/2 pl-4">
              <SelectForm
                name={TIEMNANG_VAR.TIEM_NANG_NEW_INFO_SELECT_KC_HA_TANG}
                label="Kết cấu hạ tầng"
                placeholder="Lựa chọn"
                list={TIEMNANG_VAR.listInfrastructure}
              />
            </div>
          </div>
        </Card>
        <div className="h-5"></div>
        <Card title="Thông tin hộ gia đình">
          <div className="flex flex-col">
            <div className="flex flex-col justify-center w-1/2">
              <InputNumberForm
                name={TIEMNANG_VAR.TIEM_NANG_NEW_INFO_INPUT_TONG_TV}
                label="Tổng thành viên"
              />
            </div>
            <div className="flex flex-col justify-center w-full">
              <FormListTable
                name={TIEMNANG_VAR.TIEM_NANG_NEW_INFO_LIST_TV}
                items={thongTinGiaDinhItems}
              />
            </div>
          </div>
        </Card>
        <div className="h-5"></div>
        <Card title="Mạng xã hội">
          <div className="flex">
            <div className="flex flex-col w-full">
              <InputForm
                name={TIEMNANG_VAR.TIEM_NANG_NEW_INFO_INPUT_MANG_XA_HOI}
                label="Thông tin sử dụng mạng xã hội"
                spanLabel={4}
                spanInput={20}
                formStyle={{ marginBottom: 0 }}
              />
            </div>
          </div>
        </Card>
        <div className="h-5"></div>
        <Card title="Ghi chú">
          <div className="flex w-full">
            <InputForm
              name={TIEMNANG_VAR.TIEM_NANG_NEW_INFO_INPUT_GHI_CHU}
              formStyle={{ width: '100%', marginBottom: 0 }}
              spanInput={24}
              isTextArea
              rows={4}
            />
          </div>
        </Card>
      </>
    );
  };

  const renderServiceInfo = (params) => {
    return (
      <>
        <Card title="Nhập mới thông tin dịch vụ">
          <FormListItemLabel />
          <div className="flex flex-col justify-center w-1/2 pr-6">
            <SelectForm
              label="Tổng gói cước"
              placeholder="Lựa chọn"
              list={listTongGoiCuoc}
            />
          </div>
        </Card>
        <div className="h-5"></div>
        <Card
          title={
            <div className="flex">
              <span className="mr-4">Địa chỉ lắp đặt</span>
              <Form.Item
                noStyle
                name="remember"
                valuePropName="checked">
                <Checkbox>Là địa chỉ khách hàng</Checkbox>
              </Form.Item>
            </div>
          }>
          <div className="flex">
            <div className="flex flex-col justify-center w-1/2 pr-4">
              <SelectForm
                label="Tỉnh/Thành phố"
                placeholder="Lựa chọn"
                isRequired
                list={[]}
              />
              <SelectForm
                label="Quận/Huyện"
                placeholder="Lựa chọn"
                isRequired
                list={[]}
              />
              <SelectForm
                label="Phường/Xã"
                placeholder="Lựa chọn"
                isRequired
                list={[]}
              />
              <InputForm label="Số nhà" />
            </div>
            <div className="flex flex-col justify-center w-1/2 pl-4">
              <SelectForm
                label="Đường/Phố"
                placeholder="Lựa chọn"
                list={[]}
              />
              <SelectForm
                label="Ngõ/Ấp"
                placeholder="Lựa chọn"
                list={[]}
              />
              <SelectForm
                label="Khu"
                placeholder="Lựa chọn"
                list={[]}
              />
              <SelectForm
                label="Đặc điểm"
                placeholder="Lựa chọn"
                list={[]}
              />
            </div>
          </div>
          <div className="flex w-full">
            <div className="flex flex-col justify-center w-full">
              <InputForm
                label="Địa chỉ"
                spanLabel={4}
                spanInput={20}
              />
            </div>
          </div>
        </Card>
        <div className="h-5"></div>
        <Card title={'Đang sử dụng nhà mạng khác'}>
          <div className="flex mb-4">
            <div className="flex flex-col w-1/2 pr-4 border-r border-dashed-2">
              <p className="text-blue-600 text-2xl underline mb-4">Internet</p>
              <RadioGroup
                label="Dùng gói cước tích hợp"
                isRequired
                listRadio={[
                  { value: 'yes', text: 'Có' },
                  { value: 'no', text: 'Không' },
                ]}
              />
              <SelectForm
                label="Nhà mạng"
                placeholder="Lựa chọn"
                isRequired
                list={[]}
              />
              <InputForm label="Gói cước" />
              <InputForm label="Giá cước" />
              <InputForm label="Tiền đặt cọc" />
              <RadioGroup
                label="Đóng cước nhà mạng khác"
                isRequired
                listRadio={[
                  { value: 'yes', text: 'Có' },
                  { value: 'no', text: 'Không' },
                ]}
              />
              <DatePickerForm label="Số tháng trả trước" />
              <SelectForm
                label="Tháng hết hạn"
                placeholder="Lựa chọn"
                list={[]}
              />
            </div>
            <div className="flex flex-col justify-center w-1/2 pl-4">
              <p className="text-blue-600 text-2xl underline mb-4">Dịch vụ truyền hình</p>

              <SelectForm
                label="Truyền hình"
                placeholder="Lựa chọn"
                isRequired
                list={[]}
              />
              <InputForm label="Gói cước" />
              <InputForm label="Giá cước" />
              <InputForm label="Tiền đặt cọc" />

              <RadioGroup
                label="Đóng cước nhà mạng khác"
                isRequired
                listRadio={[
                  { value: 'yes', text: 'Có' },
                  { value: 'no', text: 'Không' },
                ]}
              />
              <DatePickerForm label="Số tháng trả trước" />
              <SelectForm
                label="Tháng hết hạn"
                placeholder="Lựa chọn"
                list={[]}
              />
              <DatePickerForm label="Số lượng tivi" />
              <RadioGroup
                label="Khách hàng sử dụng smartTV"
                isRequired
                listRadio={[
                  { value: 'yes', text: 'Có' },
                  { value: 'no', text: 'Không' },
                ]}
              />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <SelectForm
              label="Đánh giá chất lượng dịch vụ đã sử dụng"
              placeholder="Lựa chọn"
              list={[]}
            />
          </div>
        </Card>
      </>
    );
  };

  const handleFormTableChange = (value, key, index) => {
    const fields = form.getFieldsValue();
    const { info } = fields;
    if (index === 0) {
      const newTypeEdit = !typeEdit ? [] : [...typeEdit];
      newTypeEdit[key] = value;
      setTypeEdit(newTypeEdit);
      Object.assign(info[key], { [TIEMNANG_VAR.TIEM_NANG_EDIT_INFO_SELECT_FIELD_NAME]: null });
      form.setFieldsValue({ info });
    }
  };

  const handleCreateCustomer = (params) => {
    console.log('form-personal', params);
  };
  return (
    <>
      <div className="flex justify-center">
        <div
          className="py-8"
          style={{ width: 432 }}>
          <Step
            current={step}
            items={[{ title: 'Kiểm tra thông tin' }, { title: 'Nhập / Xem thông tin' }]}
          />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <Space align="end">
          <div className="relative">
            <p className="text-sm text-cs_gray mb-2">Số điện thoại/ Account đã sử dụng/ Mã khách hàng</p>
            <Input
              size="middle"
              style={{ minWidth: 604 }}
              suffix={<IconSearch />}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {searchRes === 1 && (
              <Space
                className="absolute left-0"
                style={{ bottom: -32 }}>
                <IconInfo />
                <p className="text-xs font-medium text-cs_gray">Tồn tại 3 bản ghi khác thông tin với cùng 1 số điện thoại</p>
              </Space>
            )}
          </div>
          <Button
            text="Kiểm tra"
            onClick={() => handleCheckPhoneExist(phone)}
          />
        </Space>
      </div>
      {searchRes === 1 && (
        <div className="px-10 pt-14">
          <Table
            columns={columns}
            page={page}
            pageSize={pageSize}
            totalPage={20}
            action={{ showRequestEdit, showComment }}
            data={data}
            setPage={setPage}
            setPageSize={setPageSize}
          />
        </div>
      )}
      {searchRes === 2 ||
        (searchRes === 3 && (
          <div className="bg-white p-5 my-8 rounded-xl">
            <Form
              name="form-personal"
              form={formPersonal}
              onFinish={handleCreateCustomer}>
              <Tabs
                defaultActiveKey="1"
                items={[
                  { key: '1', label: 'Thông tin cá nhân', children: renderPersonalInfo() },
                  { key: '2', label: 'Thông tin dịch vụ mới', children: renderServiceInfo() },
                ]}
                onChange={onChange}
              />
              <div className="flex justify-end pt-5">
                <Form.Item>
                  <Button
                    text="Lưu"
                    htmlType="submit"
                  />
                </Form.Item>
              </div>
            </Form>
          </div>
        ))}

      {/* Modal */}
      <ModalSimple
        content={
          <Table
            columns={columnsRequest}
            totalPage={20}
            action={{ acceptRequest, refuseRequest }}
            data={dataRequest}
          />
        }
        width={'80%'}
        title={'Xem yêu cầu chỉnh sửa thông tin khách hàng'}
        hasActionButton={false}
        isModalOpen={openModal}
        toggleModal={setOpenModal}
      />
      <ModalSimple
        content={
          <Form
            name="form-edit"
            form={form}
            initialValues={{ info: [''] }}
            onFinish={onFinish}>
            <FormListTable
              name="info"
              items={thongTinItems}
              onChange={handleFormTableChange}
              dependentArr={typeEdit}
            />
          </Form>
        }
        width={'80%'}
        title={'Yêu cầu chỉnh sửa thông tin khách hàng'}
        hasActionButton
        okText="Gửi"
        isModalOpen={openRequestEditModal}
        toggleModal={setOpenRequestEditModal}
        handleCancel={() => setOpenRequestEditModal(false)}
        handleOk={async () => {
          try {
            const values = form.getFieldsValue();
            console.log({ values });
          } catch (error) {
            console.log('Failed:', error);
          }
        }}
      />
    </>
  );
}

export default KhachHangThemMoi;
