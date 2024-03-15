import React, { useState } from 'react';
import { Button, Card } from '@/component/common';
import { faCakeCandles, faComment, faPenToSquare, faPhone, faRotate, faVenusMars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DatePicker, Input, Radio, Select, Table, Tabs } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import dayjs from 'dayjs';

const dateFormat = 'YYYY-MM-DD';

// Columns
const familyColumns = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
  },
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Mối quan hệ',
    dataIndex: 'relationship',
    key: 'relationship',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Dịch vụ sử dụng',
    dataIndex: 'service',
    key: 'service',
  },
];

const b2bColumns = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
  },
  {
    title: 'Thời gian',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Nhân viên tiếp xúc',
    dataIndex: 'staff',
    key: 'staff',
  },
  {
    title: 'Kết quả tiếp xúc',
    dataIndex: 'result',
    key: 'result',
  },
];

const mediaColumns = [
  {
    title: 'Thời gian',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Hình thức',
    dataIndex: 'method',
    key: 'method',
  },
  {
    title: 'Kết quả tiếp xúc',
    dataIndex: 'result',
    key: 'result',
  },
];

const updateColumns = [
  {
    title: 'Thời gian',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Người cập nhật',
    dataIndex: 'updater',
    key: 'updater',
  },
  {
    title: 'Vai trò',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Trường thông tin',
    dataIndex: 'field',
    key: 'field',
  },
  {
    title: 'Nội dung đã cập nhật',
    dataIndex: 'content',
    key: 'content',
  },
];

const serviceColumns = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
  },
  {
    title: 'Dịch vụ',
    dataIndex: 'service',
    key: 'service',
  },
  {
    title: 'Loại hình thuê bao',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Account sử dụng',
    dataIndex: 'account',
    key: 'account',
  },
];

// Data
const familyData = [
  {
    stt: 1,
    name: 'Nguyễn Văn A',
    relationship: 'Bố',
    phone: '0861234567',
    service: 'Internet',
  },
  {
    stt: 2,
    name: 'Trần Thị B',
    relationship: 'Mẹ',
    phone: '0823456789',
    service: 'Di động',
  },
  {
    stt: 3,
    name: 'Lê Văn C',
    relationship: 'Anh trai',
    phone: '0879876543',
    service: 'Truyền hình',
  },
];

const b2bData = [
  {
    stt: 1,
    time: '10/08/2023',
    staff: 'Nguyễn Văn A',
    result: 'Đã tư vấn',
  },
  {
    stt: 2,
    time: '16/08/2023',
    staff: 'Trần Thị B',
    result: 'Chưa mua dịch vụ',
  },
];

const mediaData = [
  {
    time: '10/08/2023',
    method: 'Push notifications',
    result: 'Viewed',
  },
  {
    time: '16/08/2023',
    method: 'App Inbox',
    result: 'Clicked',
  },
];

const updateData = [
  {
    time: '10/08/2023  12:15:57',
    updater: 'Hoàng Thị Linh Chi (chihtl@vnpt.vn)',
    role: 'Người tạo',
    field: 'Ngày sinh',
    content: '12/1/2000',
  },
  {
    time: '16/08/2023  14:15:57',
    updater: 'Nguyễn Văn A (annv@vnpt.vn)',
    role: 'Phân giao',
    field: 'Địa chỉ',
    content: '55 Huỳnh Thúc Kháng, Đống Đa, Hà Nội',
  },
];

const serviceData = [
  {
    stt: 1,
    service: 'Băng thông cố định',
    type: 'Fiber',
    account: 'HNI987293',
  },
  {
    stt: 2,
    service: 'Di động',
    type: 'Di động trả trước',
    account: '0856325489',
  },
];

const KhachHangXemChiTiet = () => {
  const customerTypeIsNew = true;

  // Render
  const renderPersonalInfo = () => {
    return (
      <div className="flex flex-col gap-5">
        {/* Thông tin cá nhân */}
        <Card title="Thông tin cá nhân">
          <div className="flex gap-16">
            <div className="flex flex-col gap-6 w-1/2">
              {/* Loại giấy tờ */}
              <div className="flex items-center w-full">
                <p className="w-48 font-semibold">Loại giấy tờ</p>
                <Select
                  className="flex flex-1"
                  defaultValue="cmt"
                  disabled
                  options={[
                    {
                      value: 'cmt',
                      label: 'CMT',
                    },
                  ]}
                />
              </div>
              {/* Ngày cấp */}
              <div className="flex items-center w-full">
                <p className="w-48 font-semibold">Ngày cấp</p>
                <DatePicker
                  className="flex flex-1"
                  defaultValue={dayjs('2022-12-12', dateFormat)}
                  disabled
                />
              </div>
              {/* Tình trạng hôn nhân */}
              <div className="flex items-center w-full">
                <p className="w-48 font-semibold">Tình trạng hôn nhân</p>
                <Select
                  className="flex flex-1"
                  defaultValue="alone"
                  disabled
                  options={[
                    {
                      value: 'alone',
                      label: 'Độc thân',
                    },
                  ]}
                />
              </div>
              {/* Nghề nghiệp */}
              <div className="flex items-center w-full">
                <p className="w-48 font-semibold">Nghề nghiệp</p>
                <Select
                  className="flex flex-1"
                  defaultValue="office"
                  disabled
                  options={[
                    {
                      value: 'office',
                      label: 'Văn phòng',
                    },
                  ]}
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 w-1/2">
              {/* Số giấy tờ */}
              <div className="flex items-center w-full">
                <p className="w-48 font-semibold">Số giấy tờ</p>
                <Input
                  className="flex flex-1"
                  disabled
                  defaultValue="012345678912"
                />
              </div>
              {/* Nơi cấp */}
              <div className="flex items-center w-full">
                <p className="w-48 font-semibold">Nơi cấp</p>
                <Select
                  className="flex flex-1"
                  defaultValue="police"
                  disabled
                  options={[
                    {
                      value: 'police',
                      label: 'Cục Cảnh Sát',
                    },
                  ]}
                />
              </div>
              {/* Sở thích */}
              <div className="flex items-center w-full">
                <p className="w-48 font-semibold">Sở thích</p>
                <Input
                  className="flex flex-1"
                  disabled
                  defaultValue="Lướt web, xem phim"
                />
              </div>
              {/* Thu nhập */}
              <div className="flex items-center w-full">
                <div className="w-48 flex gap-1.5 items-center">
                  <p className="font-semibold">Thu nhập</p>
                  <p className="text-xs text-slate-500">(triệu đồng/tháng)</p>
                </div>
                <Select
                  className="flex flex-1"
                  defaultValue="less_than_10"
                  disabled
                  options={[
                    {
                      value: 'less_than_10',
                      label: 'Dưới 10',
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Thông tin địa chỉ */}
        <Card title="Thông tin địa chỉ">
          <div className="flex flex-col gap-6">
            {/* Địa chỉ */}
            <div className="flex items-center w-full">
              <p className="w-48 font-semibold">Địa chỉ</p>
              <Input
                className="flex flex-1"
                disabled
                defaultValue="Số 57 Huỳnh Thúc Kháng, Láng Hạ , Đống Đa, Hà Nội"
              />
            </div>
            <div className="flex gap-16">
              {/* Diện tích */}
              <div className="flex items-center w-full">
                <p className="w-48 font-semibold">Diện tích</p>
                <Input
                  className="flex flex-1"
                  suffix={
                    <span>
                      &nbsp;m<sup>2</sup>
                    </span>
                  }
                  disabled
                  defaultValue="Số 57 Huỳnh Thúc Kháng, Láng Hạ , Đống Đa, Hà Nội"
                />
              </div>
              {/* Diện tích */}
              <div className="flex items-center w-full">
                <p className="w-48 font-semibold">Kết cấu hạ tầng</p>
                <Select
                  className="flex flex-1"
                  defaultValue="2tang"
                  disabled
                  options={[
                    {
                      value: '2tang',
                      label: 'Nhà 2 tầng',
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Thông tin hộ gia đình */}
        <Card title="Thông tin hộ gia đình">
          <div className="flex flex-col gap-5">
            {/* Tổng thành viên */}
            <div className="flex items-center w-1/2 pr-8">
              <p className="w-48 font-semibold">Tổng thành viên</p>
              <Input
                className="flex flex-1"
                disabled
                defaultValue="4"
              />
            </div>
            {/* Table */}
            <Table
              columns={familyColumns}
              dataSource={familyData}
              pagination={false}
            />
            <Button
              className="w-32"
              isDefault
              isAdd
              text="Thêm mới"
            />
          </div>
        </Card>

        {/* Ghi chú */}
        <Card title="Ghi chú">
          <TextArea
            placeholder="Thêm ghi chú"
            variant="borderless"
          />
        </Card>
      </div>
    );
  };

  const renderServiceInfo = () => {
    return (
      <div className="flex flex-col gap-5">
        {/* Thông tin dịch vụ */}
        <Card title="Thông tin dịch vụ">
          {customerTypeIsNew ? (
            <div className="flex flex-col gap-6">
              <div className="flex gap-16">
                {/* Dịch vụ */}
                <div className="flex items-center w-full">
                  <p className="w-48 font-semibold">
                    Dịch vụ <span className="text-red-500">*</span>
                  </p>
                  <Select
                    className="flex flex-1"
                    defaultValue="btcd"
                    disabled
                    options={[
                      {
                        value: 'btcd',
                        label: 'Băng thông cố định',
                      },
                    ]}
                  />
                </div>
                {/* Loại hình thuê bao */}
                <div className="flex items-center w-full">
                  <p className="w-48 font-semibold">Loại hình thuê bao</p>
                  <Select
                    className="flex flex-1"
                    defaultValue="fiber"
                    disabled
                    options={[
                      {
                        value: 'fiber',
                        label: 'Fiber',
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="flex gap-16">
                {/* Dịch vụ */}
                <div className="flex items-center w-full">
                  <p className="w-48 font-semibold">
                    Dịch vụ <span className="text-red-500">*</span>
                  </p>
                  <Select
                    className="flex flex-1"
                    defaultValue="dd"
                    disabled
                    options={[
                      {
                        value: 'dd',
                        label: 'Di động',
                      },
                    ]}
                  />
                </div>
                {/* Loại hình thuê bao */}
                <div className="flex items-center w-full">
                  <p className="w-48 font-semibold">Loại hình thuê bao</p>
                  <Select
                    className="flex flex-1"
                    defaultValue="ddtt"
                    disabled
                    options={[
                      {
                        value: 'ddtt',
                        label: 'Di động trả trước',
                      },
                    ]}
                  />
                </div>
              </div>
              {/* Tổng gói cước */}
              <div className="flex items-center w-1/2 pr-8">
                <p className="w-48 font-semibold">Tổng gói cước</p>
                <Select
                  className="flex flex-1"
                  defaultValue="100-200"
                  disabled
                  options={[
                    {
                      value: '100-200',
                      label: '100k - 200k',
                    },
                  ]}
                />
              </div>
            </div>
          ) : (
            <Table
              columns={serviceColumns}
              dataSource={serviceData}
              pagination={false}
            />
          )}
        </Card>

        {/* Địa chỉ lắp đặt */}
        <Card title="Địa chỉ lắp đặt">
          <div className="flex flex-col gap-6">
            {/* Địa chỉ */}
            <div className="flex items-center w-full">
              <p className="w-48 font-semibold">Địa chỉ</p>
              <Input
                className="flex flex-1"
                disabled
                defaultValue="Số 57 Huỳnh Thúc Kháng, Láng Hạ , Đống Đa, Hà Nội"
              />
            </div>
          </div>
        </Card>

        {/* Đang sử dụng nhà mạng khác */}
        <Card title="Đang sử dụng nhà mạng khác">
          <div className="flex flex-col gap-5">
            <div className="flex">
              {/* Left Column */}
              <div className="flex flex-col gap-6 w-1/2 border-r border-slate-400 border-dashed pr-8">
                <h2 className="pb-0.5 w-16 border-b-2 border-blue-500 font-semibold text-base text-blue-600">Internet</h2>
                {/* Dùng gói cước tích hợp */}
                <div className="flex items-center h-8">
                  <p className="min-w-60 font-semibold">Dùng gói cước tích hợp</p>
                  <Radio.Group value={true}>
                    <Radio value={true}>Có</Radio>
                    <Radio
                      value={false}
                      disabled>
                      Không
                    </Radio>
                  </Radio.Group>
                </div>
                {/* Nhà mạng */}
                <div className="flex items-center w-full">
                  <p className="w-48 font-semibold">Nhà mạng</p>
                  <Select
                    className="flex flex-1"
                    defaultValue="lc"
                    disabled
                    options={[
                      {
                        value: 'lc',
                        label: 'Lựa chọn',
                      },
                    ]}
                  />
                </div>
                {/* Gói cước */}
                <div className="flex items-center w-full">
                  <p className="w-48 font-semibold">Gói cước</p>
                  <Input
                    className="flex flex-1"
                    disabled
                    defaultValue="Gói cước đang lắp đặt"
                  />
                </div>
                {/* Giá cước */}
                <div className="flex items-center w-full">
                  <p className="w-48 font-semibold">Giá cước</p>
                  <Input
                    className="flex flex-1"
                    disabled
                    defaultValue="200.000"
                    suffix="VNĐ"
                  />
                </div>
                {/* Tiền đặt cọc */}
                <div className="flex items-center w-full">
                  <p className="w-48 font-semibold">Tiền đặt cọc</p>
                  <Input
                    className="flex flex-1"
                    disabled
                    defaultValue="400.000"
                    suffix="VNĐ"
                  />
                </div>
                {/* Đóng cước nhà mạng khác */}
                <div className="flex items-center h-8">
                  <p className="min-w-60 font-semibold">Đóng cước nhà mạng khác</p>
                  <Radio.Group value={true}>
                    <Radio value={true}>Có</Radio>
                    <Radio
                      value={false}
                      disabled>
                      Không
                    </Radio>
                  </Radio.Group>
                </div>
                {/* Số tháng trả trước */}
                <div className="flex items-center w-full">
                  <p className="w-48 font-semibold">Số tháng trả trước</p>
                  <Select
                    className="flex flex-1"
                    defaultValue="3months"
                    disabled
                    options={[
                      {
                        value: '3months',
                        label: '3 tháng',
                      },
                    ]}
                  />
                </div>
                {/* Tháng hết hạn */}
                <div className="flex items-center w-full">
                  <p className="w-48 font-semibold">Ngày cấp</p>
                  <DatePicker
                    className="flex flex-1"
                    defaultValue={dayjs('2024-01-01', dateFormat)}
                    disabled
                  />
                </div>
              </div>
              {/* Right column */}
              <div className="flex flex-col gap-6 w-1/2 pl-8">
                <h2 className="pb-0.5 w-24 border-b-2 border-blue-500 font-semibold text-base text-blue-600">Truyền hình</h2>
                {/* Truyền hình */}
                <div className="flex items-center w-full">
                  <p className="w-48 font-semibold">Truyền hình</p>
                  <Select
                    className="flex flex-1"
                    defaultValue="lc"
                    disabled
                    options={[
                      {
                        value: 'lc',
                        label: 'Lựa chọn',
                      },
                    ]}
                  />
                </div>
                {/* Gói cước */}
                <div className="flex items-center w-full">
                  <p className="w-48 font-semibold">Gói cước</p>
                  <Input
                    className="flex flex-1"
                    disabled
                    defaultValue="Gói cước đang lắp đặt"
                  />
                </div>
                {/* Giá cước */}
                <div className="flex items-center w-full">
                  <p className="w-48 font-semibold">Giá cước</p>
                  <Input
                    className="flex flex-1"
                    disabled
                    defaultValue="200.000"
                    suffix="VNĐ"
                  />
                </div>
                {/* Tiền đặt cọc */}
                <div className="flex items-center w-full">
                  <p className="w-48 font-semibold">Tiền đặt cọc</p>
                  <Input
                    className="flex flex-1"
                    disabled
                    defaultValue="400.000"
                    suffix="VNĐ"
                  />
                </div>
                {/* Đóng cước nhà mạng khác */}
                <div className="flex items-center h-8">
                  <p className="min-w-60 font-semibold">Đóng cước nhà mạng khác</p>
                  <Radio.Group value={true}>
                    <Radio value={true}>Có</Radio>
                    <Radio
                      value={false}
                      disabled>
                      Không
                    </Radio>
                  </Radio.Group>
                </div>
                {/* Số tháng trả trước */}
                <div className="flex items-center w-full">
                  <p className="w-48 font-semibold">Số tháng trả trước</p>
                  <Select
                    className="flex flex-1"
                    defaultValue="3months"
                    disabled
                    options={[
                      {
                        value: '3months',
                        label: '3 tháng',
                      },
                    ]}
                  />
                </div>
                {/* Tháng hết hạn */}
                <div className="flex items-center w-full">
                  <p className="w-48 font-semibold">Ngày cấp</p>
                  <DatePicker
                    className="flex flex-1"
                    defaultValue={dayjs('2024-01-01', dateFormat)}
                    disabled
                  />
                </div>
                {/* Số lượng TV */}
                <div className="flex items-center w-full">
                  <p className="w-48 font-semibold">Số lượng TV</p>
                  <Input
                    className="flex flex-1"
                    disabled
                    defaultValue="100"
                  />
                </div>
                {/* Khách hàng sử dụng Smart TV */}
                <div className="flex items-center h-8">
                  <p className="min-w-60 font-semibold">Khách hàng sử dụng Smart TV</p>
                  <Radio.Group value={true}>
                    <Radio value={true}>Có</Radio>
                    <Radio
                      value={false}
                      disabled>
                      Không
                    </Radio>
                  </Radio.Group>
                </div>
              </div>
            </div>
            {/* Đánh giá chất lượng DV đã sử dụng */}
            <div className="flex items-center w-full">
              <p className="w-48 font-semibold">Đánh giá chất lượng dịch vụ đã sử dụng</p>
              <Select
                className="flex flex-1"
                defaultValue="lc"
                disabled
                options={[
                  {
                    value: 'lc',
                    label: 'Lựa chọn',
                  },
                ]}
              />
            </div>
          </div>
        </Card>
      </div>
    );
  };

  const renderManagementInfo = () => {
    return (
      <div className="flex flex-col gap-5">
        {/* Thông tin quản lý */}
        <Card title="Thông tin quản lý">
          <div className="flex flex-col gap-6">
            {/* Đơn vị phân giao */}
            <div className="flex items-center w-full">
              <p className="w-48 font-semibold">Đơn vị phân giao</p>
              <Input
                className="flex flex-1"
                disabled
                defaultValue="TTKD VNPT Ninh Bình"
              />
            </div>
            {/* Người giao cho tiếp cận */}
            <div className="flex items-center w-full">
              <p className="w-48 font-semibold">Người giao cho tiếp cận</p>
              <Select
                className="flex flex-1"
                mode="multiple"
                disabled
                style={{
                  width: '100%',
                }}
                placeholder="Please select"
                defaultValue={['Nguyễn Văn A (123@vnpt.vn)', 'Trần Văn B (btv@vnpt.vn)']}
              />
            </div>
            {/* Nguồn dữ liệu */}
            <div className="flex items-center w-full">
              <p className="w-48 font-semibold">Nguồn dữ liệu</p>
              <Input
                className="flex flex-1"
                disabled
                defaultValue="One BSS"
              />
            </div>
          </div>
        </Card>

        {/* Lịch sử B2B */}
        <Card title="Lịch sử B2B">
          <Table
            columns={b2bColumns}
            dataSource={b2bData}
            pagination={false}
          />
        </Card>

        {/* Lịch sử tiếp cận truyền thông */}
        <Card title="Lịch sử tiếp cận truyền thông">
          <Table
            columns={mediaColumns}
            dataSource={mediaData}
            pagination={false}
          />
        </Card>

        {/* Lịch sử cập nhật KHTN */}
        <Card title="Lịch sử cập nhật KHTN">
          <Table
            columns={updateColumns}
            dataSource={updateData}
            pagination={false}
          />
        </Card>
      </div>
    );
  };

  const items = [
    {
      key: '1',
      label: <p className="font-semibold">Thông tin cá nhân</p>,
      children: renderPersonalInfo(),
    },
    {
      key: '2',
      label: <p className="font-semibold">Thông tin dịch vụ</p>,
      children: renderServiceInfo(),
    },
    {
      key: '3',
      label: <p className="font-semibold">Thông tin quản lý</p>,
      children: renderManagementInfo(),
    },
  ];

  const onChange = (key) => {
    console.log(key);
  };
  return (
    <div>
      {/* Thông tin cơ bản */}
      <div className="bg-white rounded-xl drop-shadow-md">
        <div
          className="h-12 rounded-t-lg flex justify-between items-center text-white px-8 text-base"
          style={{ background: 'linear-gradient(to right,#3fc099, #34c2fb)' }}>
          <p className="font-semibold">Thông tin cơ bản</p>
          <div className="flex items-center gap-4 h-12">
            <FontAwesomeIcon
              className="hover:opacity-80 hover:cursor-pointer"
              icon={faPenToSquare}
            />
            <FontAwesomeIcon
              className="hover:opacity-80 hover:cursor-pointer"
              icon={faComment}
            />
          </div>
        </div>
        <div className="px-8 py-2 flex">
          <div className="flex gap-4 w-1/2 items-center py-4 border-r border-slate-400 border-dashed">
            <div
              className="rounded-lg w-20 h-20 flex justify-center items-center text-white font-semibold text-4xl"
              style={{ background: 'linear-gradient(to top,#3fc099, #34c2fb)' }}>
              HL
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-4 items-center">
                <p className="text-xl font-semibold">Hoàng Thùy Linh</p>
                {customerTypeIsNew ? (
                  <div className="flex justify-center items-center bg-green-50 border border-green-500 text-green-500 rounded-full px-4 min-w-20 py-1 font-semibold">Mới</div>
                ) : (
                  <div className="flex justify-center items-center bg-orange-50 border border-orange-500 text-orange-500 rounded-full px-4 min-w-20 py-1 font-semibold">Hiện hữu</div>
                )}
              </div>
              <div className="flex gap-2 items-center text-slate-400">
                <p>Mã khách hàng:</p>
                <p>4649846168</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-1/2 items-center py-4 ml-8">
            <div className="flex w-full">
              <div className="flex gap-2 items-center font-medium w-28">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="text-sky-500"
                />
                <p>Số điện thoại</p>
              </div>
              <div className="flex flex-1 border-b border-sky-500 border-dashed mx-2"></div>
              <p className="w-20 font-semibold">0367856598</p>
            </div>
            <div className="flex w-full">
              <div className="flex gap-2 items-center font-medium w-28">
                <FontAwesomeIcon
                  icon={faCakeCandles}
                  className="text-sky-500"
                />
                <p>Ngày sinh</p>
              </div>
              <div className="flex flex-1 border-b border-sky-500 border-dashed mx-2"></div>
              <p className="w-20 font-semibold">15/08/1999</p>
            </div>
            <div className="flex w-full">
              <div className="flex gap-2 items-center font-medium w-28">
                <FontAwesomeIcon
                  icon={faVenusMars}
                  className="text-sky-500"
                />
                <p>Giới tính</p>
              </div>
              <div className="flex flex-1 border-b border-sky-500 border-dashed mx-2"></div>
              <p className="w-20 font-semibold">Nữ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Thông tin chi tiết */}
      <div className="bg-white p-5 my-5 rounded-xl">
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default KhachHangXemChiTiet;
