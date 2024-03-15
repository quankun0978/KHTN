import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DatePicker, Input, Select } from 'antd';
import * as ROUTERS from '@/router/routes';
import { IconRound } from '@/component/common/Icon';
import { Button, Modal, Table } from '@/component/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import * as ROUTES from '@/router/routes';

const { RangePicker } = DatePicker;

// Data
const data = [
  {
    key: '1',
    stt: 1,
    name: 'Danh sách KHTN 012022.xlsx',
    time: '15/08/2023',
    result: 'Thành công',
  },
  {
    key: '2',
    stt: 2,
    name: 'Danh sách KHTN 022022.xlsx',
    time: '15/09/2023',
    result: 'Thành công',
  },
  {
    key: '3',
    stt: 3,
    name: 'Danh sách KHTN 032022.xlsx',
    time: '15/10/2023',
    result: 'Thành công',
  },
];

function ThuThapTheoFileDanhSach() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  // Columns
  const columns = () => [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Tên file',
      dataIndex: 'name',
      key: 'name',
      render: (text, row) => (
        <Link
          to={ROUTERS.DETAIL_THU_THAP_KH_THEO_FILE + '/' + row.key}
          className="font-medium text-sm text-blue-600 hover:text-blue-500">
          {text}
        </Link>
      ),
    },
    {
      title: 'Thời gian thực hiện',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Kết quả',
      dataIndex: 'result',
      key: 'result',
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'center',
      render: () => (
        <FontAwesomeIcon
          className="text-blue-600 text-base cursor-pointer hover:opacity-75"
          icon={faEye}
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Search bar */}
      <div className="flex justify-between pb-5 border-b border-dashed border-slate-400">
        <div className="flex gap-2">
          <Input
            style={{ width: 320 }}
            placeholder="Tên file"
          />
          <Select
            defaultValue="kqtf"
            style={{
              width: 320,
              height: 36,
            }}
            onChange={handleChange}
            options={[
              {
                value: 'kqtf',
                label: 'Kết quả tải file',
              },
            ]}
          />
          <RangePicker style={{ width: 320 }} />
        </div>
        <div>
          <Button
            style={{ height: 36 }}
            isDefault
            isSearch
            text="Tìm kiếm"
          />
        </div>
      </div>

      {/* Dowload and Upload */}
      <div className="flex gap-5 my-5 justify-end">
        <Button
          style={{ height: 36 }}
          text="Test open modal"
          onClick={() => setIsModalOpen(true)}
        />
        <Button
          style={{ height: 36 }}
          isDownload
          text="Tải file mẫu"
        />
        <Button
          style={{ height: 36 }}
          isUpload
          text="Import KHTN"
          onClick={() => navigate(ROUTERS.NEW_THU_THAP_KH_THEO_FILE)}
        />
      </div>

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
        showSizeChanger
        onRow={(record) => ({
          onClick: () => console.log('check record >>> ', record),
        })}
      />

      {/* Modal */}
      <Modal
        content="File bạn vừa tải lên không đúng định dạng. Vui lòng kiếm tra lại!"
        isModalOpen={isModalOpen}
        handleCancel={() => setIsModalOpen(false)}
        title="Hệ thống quản lý KHTN"
        isWarningModal
      />
    </div>
  );
}

export default ThuThapTheoFileDanhSach;
