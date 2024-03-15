import React, { useState } from 'react';
import { Input, Select, Table } from 'antd';
import '../khokh/styles.scss';
import { Button } from '@/component/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown, faAnglesUp } from '@fortawesome/free-solid-svg-icons';

// Columns
const columns = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
  },
  {
    title: 'Mã khách hàng',
    dataIndex: 'customer_id',
    key: 'customer_id',
  },
  {
    title: 'Tên khách hàng',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    key: 'phone',
  },
];

// Data
const data = [
  {
    stt: 1,
    customer_id: 'KH001',
    name: 'Nguyễn Văn A',
    phone: '0123456789',
  },
  {
    stt: 2,
    customer_id: 'KH002',
    name: 'Trần Thị B',
    phone: '0987654321',
  },
  {
    stt: 3,
    customer_id: 'KH003',
    name: 'Lê Thị C',
    phone: '0345678901',
  },
  {
    stt: 4,
    customer_id: 'KH004',
    name: 'Phạm Văn D',
    phone: '0678901234',
  },
  {
    stt: 5,
    customer_id: 'KH005',
    name: 'Hoàng Văn E',
    phone: '0456789123',
  },
];

function KhoHienHuuChiTiet() {
  const [collapseOpen, setCollapseOpen] = useState(false);

  const toggleCollapse = () => {
    setCollapseOpen(!collapseOpen);
  };

  const handleChangeSelect = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5">
        <div className="w-3/4 bg-white rounded-lg p-5 flex flex-col gap-4">
          <p className="font-semibold text-base">Thông tin tập khách hàng</p>
          <div className="flex align-middle">
            <p className="w-20 leading-8">ID:</p>
            <Input
              style={{ backgroundColor: '#f1f5f9' }}
              disabled
              defaultValue="KH12345678"
            />
          </div>
          <div className="flex align-middle">
            <p className="w-20 leading-8">Tên tập:</p>
            <Input
              style={{ backgroundColor: '#f1f5f9' }}
              disabled
              defaultValue="Khách hàng Hà Nội sử dụng Vinaphone không sử dụng Fiber"
            />
          </div>
          {/* Collapse */}
          <div className="collapse-container">
            {/* Collapse content */}
            <div className={collapseOpen ? 'expanded' : 'collapsed'}>
              <p className="mb-2 font-semibold text-base">Hành vi khách hàng</p>
              <div className="bg-slate-100 px-4 pt-3 pb-4 rounded-lg mb-2">
                <div className="mb-4">
                  <p className="font-semibold mb-2">Nhân khẩu học</p>
                  <ul className="bg-white rounded-lg px-4 py-2">
                    <li>Giới tính: Nữ</li>
                    <li>Độ tuổi: 35 - 45</li>
                    <li>Ngành nghề: Văn phòng</li>
                  </ul>
                </div>
                <div className="mb-4">
                  <p className="font-semibold mb-2">Hành vi sử dụng</p>
                  <ul className="bg-white rounded-lg px-4 py-2">
                    <li>Sử dụng Vinaphone chưa có Fiber, MyTV</li>
                    <li>Sử dụng điện thoại cố định chưa có Fiber, MyTV</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">Thông tin B2A</p>
                  <ul className="bg-white rounded-lg px-4 py-2">
                    <li>Đã thực hiện B2A - 2 lần - Đã tiếp xúc</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Toggle */}
            <div
              className="flex align-middle gap-2 hover:cursor-pointer hover:text-blue-400 text-blue-600 font-medium"
              onClick={toggleCollapse}>
              <div className="flex flex-col justify-center">
                <FontAwesomeIcon icon={collapseOpen ? faAnglesUp : faAnglesDown} />
              </div>
              <p className="leading-5">{collapseOpen ? 'Thu gọn' : 'Xem chi tiết các tiêu chí'}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-2 bg-white rounded-lg p-5">
          <p className="text-4xl text-blue-600 font-bold text-center">485</p>
          <p className="text-center">Tổng số thuê bao theo các tiêu chí</p>
        </div>
      </div>
      <div className="bg-white rounded-lg p-5">
        <div className="flex justify-between w-full align-middle">
          <p className="font-semibold text-base">Thông tin chi tiết khách hàng</p>
          <Button
            style={{ height: 32 }}
            isDefault
            isDownload
            text="Xuất file"
          />
        </div>
        {/* Table */}
        <Table
          className="mt-5"
          columns={columns}
          dataSource={data}
        />
        <div className="flex flex-col gap-3">
          <p>Có tổng 100 bản ghi</p>
          <div className="flex gap-2 items-center">
            <p>Số bản ghi mỗi trang</p>
            <Select
              defaultValue="50"
              style={{
                width: 80,
              }}
              onChange={handleChangeSelect}
              options={[
                {
                  value: '50',
                  label: '50',
                },
                {
                  value: '100',
                  label: '100',
                },
                {
                  value: '150',
                  label: '150',
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default KhoHienHuuChiTiet;
