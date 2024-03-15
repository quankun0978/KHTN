import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from 'antd';
import { faCopy, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { DETAIL_KHO_KH_HIEN_HUU, NEW_KHO_KH_HIEN_HUU } from '@/router/routes';
import { Button, DatePickerForm, InputForm, Table } from '@/component/common';
import dayjs from 'dayjs';

// Columns
const columns = (funcObj = {}) => [
  { title: 'STT', dataIndex: 'stt', key: 'stt' },
  { title: 'Mã tập', dataIndex: 'customer_set_code', key: 'customer_set_code' },
  {
    title: 'Tên tập khách hàng',
    dataIndex: 'name',
    key: 'name',
    render: (text, row) => (
      <Link
        to={DETAIL_KHO_KH_HIEN_HUU + '/' + row.key}
        className="font-medium text-sm text-indigo-600 hover:text-indigo-500">
        {text}
      </Link>
    ),
  },
  { title: 'Người tạo', dataIndex: 'creator', key: 'creator' },
  { title: 'Thời gian tạo', dataIndex: 'create_time', key: 'create_time' },
  { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
  {
    title: 'Thao tác',
    key: 'action',
    className: 'text-center',
    render: (_, row) => (
      <div className="flex">
        <FontAwesomeIcon
          className="text-blue-600 cursor-pointer mr-4"
          icon={faCopy}
          onClick={() => funcObj.showRequestEdit(row)}
        />
        <FontAwesomeIcon
          className="text-green-600 cursor-pointer"
          icon={faFileExcel}
          onClick={() => funcObj.showRequestEdit(row)}
        />
      </div>
    ),
  },
];

// Data
const data = [
  { key: '1', stt: 1, customer_set_code: 'ID465465', name: 'Khách hàng Vinaphone', creator: 'Nguyễn Văn A', create_time: '11:11:40 - 28/08/2023', status: 'Lưu nháp' },
  { key: '2', stt: 2, customer_set_code: 'ID465465', name: 'Khách hàng fiber', creator: 'Nguyễn Văn B', create_time: '11:11:40 - 28/08/2023', status: 'Chờ phê duyệt' },
  { key: '3', stt: 3, customer_set_code: 'ID465465', name: 'Khách hàng fiber', creator: 'Nguyễn Văn C', create_time: '11:11:40 - 28/08/2023', status: 'Đã phê duyệt' },
];

function KhoHienHuuDanhSach() {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const handleClickThemMoi = () => {
    navigate(NEW_KHO_KH_HIEN_HUU);
  };

  const showRequestEdit = (data) => {
    console.log({ data });
  };

  const onFinish = (values) => {
    console.log('Success:', values);
    console.log(dayjs(values.time).format('DD/MM/YYYY'));
  };

  return (
    <>
      {/* Search bar */}
      <Form
        name="form-test"
        className="flex justify-between"
        onFinish={onFinish}>
        <div className="flex">
          <div className="w-64">
            <InputForm
              placeholder="Tên tập / Mã tập khách hàng"
              name={'name'}
              spanInput={24}
              themeComponents={{ controlHeight: 40 }}
            />
          </div>
          <div className="w-64 mx-4">
            <DatePickerForm
              name={'time'}
              placeholder="Thời gian tạo"
              spanInput={24}
              themeComponents={{ controlHeight: 40 }}
            />
          </div>
          <div className="w-64">
            <InputForm
              name={'user'}
              placeholder="Người tạo"
              spanInput={24}
              themeComponents={{ controlHeight: 40 }}
            />
          </div>
        </div>

        <Form.Item noStyle>
          <Button
            style={{ height: 40 }}
            isDefault
            isSearch
            text="Tìm kiếm"
            htmlType="submit"
          />
        </Form.Item>
      </Form>

      {/* Add New */}
      <div className="py-5 border-t-2 border-dashed text-end">
        <Button
          style={{ height: 40 }}
          isAdd
          text="Thêm mới Tập"
          onClick={handleClickThemMoi}
        />
      </div>

      {/* Table */}
      <Table
        columns={columns}
        page={page}
        pageSize={pageSize}
        totalPage={20}
        action={{ showRequestEdit }}
        data={data}
        setPage={setPage}
        setPageSize={setPageSize}
        showTotal
        showSizeChanger
      />
    </>
  );
}

export default KhoHienHuuDanhSach;
