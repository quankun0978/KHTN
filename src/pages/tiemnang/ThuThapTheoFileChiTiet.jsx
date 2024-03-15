import React, { useState } from 'react';
import UploadImg from '../../assets/images/vnpt_upload.png';
import { Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleExclamation, faClock, faPaperclip, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Button, Table } from '@/component/common';

// Columns
const columns = () => [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
    align: 'center',
  },
  {
    title: 'Tên khách hàng',
    dataIndex: 'name',
    align: 'center',
    key: 'name',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    align: 'center',
    key: 'phone',
  },
  {
    title: 'Tình trạng tải lên',
    dataIndex: 'upload_status',
    key: 'upload_status',
    align: 'center',
    render: () => (
      <FontAwesomeIcon
        icon={faCircleCheck}
        className="text-emerald-500 text-lg"
      />
    ),
  },
  {
    title: 'Lỗi cụ thể',
    dataIndex: 'err_detail',
    align: 'center',
    key: 'err_detail',
  },
];

// Data
const data = [
  {
    key: '1',
    stt: 1,
    name: 'Nguyễn Văn A',
    phone: '0831548546',
    upload_status: 'success',
    err_detail: 'Thành công',
  },
  {
    key: '1',
    stt: 1,
    name: 'Nguyễn Văn A',
    phone: '0831548546',
    upload_status: 'success',
    err_detail: 'Thành công',
  },
];

const ThuThapTheoFileChiTiet = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex rounded-lg bg-white">
        <div className="w-2/3 flex flex-col gap-6 p-5">
          {/* File tải lên */}
          <div>
            <h2 className="text-base mb-1">File đã tải lên</h2>
            <Input
              disabled
              defaultValue="KHTN_Import_23/10.xlsx"
              prefix={<FontAwesomeIcon icon={faPaperclip} />}
            />
          </div>
          {/* Thời gian tải */}
          <div>
            <h2 className="text-base mb-1">Thời gian tải</h2>
            <Input
              disabled
              defaultValue="06/09/2023 17:05:12"
              prefix={<FontAwesomeIcon icon={faClock} />}
            />
          </div>
          {/* Kết quả tải lên */}
          <div>
            <h2 className="text-base mb-1">Kết quả tải lên</h2>
            <Input
              disabled
              defaultValue="Thành công"
            />
          </div>
        </div>
        <div className="flex flex-1 justify-center">
          <img
            className="h-72"
            src={UploadImg}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 p-5 bg-white rounded-lg">
        <h2 className="text-base font-semibold">Khách hàng đã tải lên thành công</h2>
        {/* Table */}
        <Table
          columns={columns}
          page={page}
          pageSize={pageSize}
          totalPage={20}
          data={data}
          setPage={setPage}
          setPageSize={setPageSize}
          showTotal
        />
        <div className="flex justify-end">
          <Button
            style={{ height: 36, minWidth: 96 }}
            text="Đóng"
          />
        </div>
      </div>
    </div>
  );
};

export default ThuThapTheoFileChiTiet;
