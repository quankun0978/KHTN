import React, { useState } from 'react';
import { Button } from '@/component/common';
import { faCircleCheck, faCircleExclamation, faPaperclip, faTrashCan, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table, Tabs } from 'antd';
import '../tiemnang/styles.scss'

const columns = [
  {
    title: 'Số điện thoại/Mã khách hàng',
    dataIndex: 'phone',
    align: 'center',
  },
  {
    title: 'Tên khách hàng',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: 'Tình trạng tải lên',
    dataIndex: 'upload_status',
    align: 'center',
    render: (text, record) => {
      const uploadStatus = record.upload_status;
      return uploadStatus === 'success' ? (
        <FontAwesomeIcon
          icon={faCircleCheck}
          className="text-emerald-500 text-lg"
        />
      ) : uploadStatus === 'fail' ? (
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          className="text-red-500 text-lg"
        />
      ) : uploadStatus === 'warning' ? (
        <FontAwesomeIcon
          icon={faCircleExclamation}
          className="text-yellow-500 text-lg"
        />
      ) : null;
    },
  },
  {
    title: 'Lỗi cụ thể',
    dataIndex: 'err_detail',
    align: 'center',
  },
  {
    title: 'Thao tác',
    dataIndex: 'action',
    align: 'center',
    render: () => (
      <FontAwesomeIcon
        className="text-red-500 text-base cursor-pointer hover:opacity-75"
        icon={faTrashCan}
      />
    ),
  },
];

// Data
const data = [
  {
    key: '1',
    stt: 1,
    name: 'Công ty TNHH A',
    phone: '0831548546',
    upload_status: 'success',
    err_detail: 'Thành công',
  },
  {
    key: '2',
    stt: 2,
    name: 'Công ty TNHH B',
    phone: '0831548546',
    upload_status: 'success',
    err_detail: 'Thành công',
  },
  {
    key: '3',
    stt: 3,
    name: 'Công ty TNHH C',
    phone: '0831548546',
    upload_status: 'success',
    err_detail: 'Thành công',
  },
  {
    key: '4',
    stt: 4,
    name: 'Nguyễn Văn A',
    phone: '0831548546',
    upload_status: 'fail',
    err_detail: 'Trường "Tên khách hàng" trống',
  },
  {
    key: '5',
    stt: 5,
    name: 'Nguyễn Văn B',
    phone: '0831548546',
    upload_status: 'fail',
    err_detail: 'Sai định dạng số điện thoại',
  },
  {
    key: '6',
    stt: 6,
    name: 'Nguyễn Văn C',
    phone: '0831548546',
    upload_status: 'warning',
    err_detail: 'Khách hàng đã tồn tại trên hệ thống',
  },
];

const successData = data.filter((item) => item.upload_status === 'success');
const nonSuccessData = data.filter((item) => item.upload_status !== 'success');

const ThuThapTheoFileImport = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const onChange = (key) => {
    console.log(key);
  };
  //   Render
  const renderValidCustomer = () => {
    return (
      <div className="flex flex-col gap-5">
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={successData}
        />
        <div className="flex justify-end gap-2">
          <Button
            style={{ height: 36 }}
            isDefault
            isSearch
            text="Xuất file lỗi"
          />
          <Button
            className="min-w-28"
            style={{ height: 36 }}
            isDefault
            text="Xóa dòng"
          />
          <Button
            className="min-w-28"
            style={{ height: 36 }}
            text="Lưu"
          />
        </div>
      </div>
    );
  };

  const renderInvalidCustomer = () => {
    return (
      <div className="flex flex-col gap-5">
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={nonSuccessData}
        />
        <div className="flex justify-end gap-2">
          <Button
            style={{ height: 36 }}
            isDefault
            isSearch
            text="Xuất file lỗi"
          />
          <Button
            className="min-w-28"
            style={{ height: 36 }}
            isDefault
            text="Xóa dòng"
          />
          <Button
            className="min-w-28"
            style={{ height: 36 }}
            text="Lưu"
          />
        </div>
      </div>
    );
  };

  //   Item
  const items = [
    {
      key: '1',
      label: <p className="font-semibold">Hợp lệ: 10</p>,
      children: renderValidCustomer(),
    },
    {
      key: '2',
      label: <p className="font-semibold">Không hợp lệ: 2</p>,
      children: renderInvalidCustomer(),
    },
  ];
  return (
    <div className="flex flex-col gap-5">
      <div className="bg-white rounded-lg p-5">
        <div className="flex gap-5">
          {/* Tải file */}
          <div className="w-1/2 rounded-md border border-slate-400 border-dashed p-5">
            <h2 className="font-semibold text-base mb-1">Tải file Phiếu thu thập thông tin KHTN mẫu</h2>
            <p className="text-slate-400">Hỗ trợ định dạng .xlsx</p>
            <Button
              className="mt-5 min-w-32"
              style={{ height: 36 }}
              isDefault
              isDownload
              text="Tải file mẫu"
            />
          </div>
          {/* Import */}
          <div className="w-1/2 rounded-md border border-slate-400 border-dashed p-5">
            <h2 className="font-semibold text-base mb-1">Lựa chọn file import</h2>
            <div className="flex items-center gap-2 text-blue-600">
              <FontAwesomeIcon icon={faPaperclip} />
              <span>KHTN_Import_23/10.xlsx</span>
            </div>
            <Button
              className="mt-5 min-w-32"
              style={{ height: 36 }}
              isDefault
              isUpload
              text="Đổi file"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            className="mt-5 min-w-32"
            style={{ height: 36 }}
            text="Kiểm tra dữ liệu"
          />
        </div>
      </div>
      {/* Khách hàng đã tải lên */}
      <div className="bg-white rounded-lg p-5">
        <h2 className="font-semibold text-base mb-2">Khách hàng đã tải lên</h2>
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default ThuThapTheoFileImport;
