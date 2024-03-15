import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DatePicker, Input, Modal, Select, Table } from 'antd';
import { Button } from '@/component/common';
import { IconRound } from '@/component/common/Icon';
import * as ROUTERS from '@/router/routes';

const { RangePicker } = DatePicker;

// Data
const data = [
  {
    key: '1',
    stt: 1,
    name: 'Khách hàng Vinaphone',
    channel: 'B2A',
    campaign: 'CD2343434- Phát triển mới VNP',
    creator: 'Nguyễn Văn A',
    create_time: '11:11:40 - 28/08/2023',
    status: 'Lưu nháp',
    send_status: '',
  },
  {
    key: '2',
    stt: 2,
    name: 'Khách hàng fiber',
    channel: 'Online',
    campaign: 'CD2343434- Phát triển mới VNP',
    creator: 'Nguyễn Văn B',
    create_time: '11:11:40 - 28/08/2023',
    status: 'Chờ phê duyệt',
    send_status: 'Thất bại',
  },
  {
    key: '3',
    stt: 3,
    name: 'Khách hàng fiber',
    channel: 'OB',
    campaign: 'CD2343434- Phát triển mới VNP',
    creator: 'Nguyễn Văn C',
    create_time: '11:11:40 - 28/08/2023',
    status: 'Đã phê duyệt',
    send_status: 'Thành công',
  },
];

function PhanGiaoDanhSach() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleModalOk = () => {
    setIsModalOpen(false);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  // Columns
  const columns = () => [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Tên tập phân giao',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Link onClick={showModal}>{text}</Link>,
    },
    {
      title: 'Kênh tiếp cận',
      dataIndex: 'channel',
      key: 'channel',
    },
    {
      title: 'Chiến dịch',
      dataIndex: 'campaign',
      key: 'campaign',
    },
    {
      title: 'Người tạo',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Trạng thái gửi dữ liệu',
      dataIndex: 'send_status',
      key: 'send_status',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (text, record) => (record.send_status !== 'Thành công' ? <button className="bg-emerald-50 border border-emerald-500 text-emerald-500 px-4 py-0.5 rounded min-w-24 hover:opacity-60">Gửi</button> : null),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Search bar */}
      <div className="flex justify-between pb-5 border-b border-dashed border-slate-400">
        <div className="flex gap-2">
          <Input
            style={{ width: 320 }}
            placeholder="Tên tập phân giao"
          />
          <Input
            style={{ width: 200 }}
            placeholder="Kênh tiếp cận"
          />
          <Input
            style={{ width: 200 }}
            placeholder="Chiến dịch"
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

      {/* Add New */}
      <div className="mt-5 text-end">
        <Button
          className="mb-5"
          style={{ height: 36 }}
          isAdd
          text="Thêm phân giao"
          onClick={() => navigate(ROUTERS.NEW_PHAN_GIAO_KHI)}
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
        onRow={(record, index) => ({
          onClick: () => console.log('check record >>> ', record),
        })}
      />

      {/* Modal */}
      <Modal
        width={800}
        title={null}
        footer={null}
        closeIcon={null}
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}>
        <div className="border border-dashed border-slate-400 rounded-lg p-5 flex flex-col gap-4">
          {/* Thông tin phân giao */}
          <div>
            <div className="flex align-middle gap-2 mb-2">
              <div className="flex flex-col justify-center">
                <IconRound />
              </div>
              <p className="font-semibold text-base">Thông tin phân giao</p>
            </div>
            <ul className="flex flex-col gap-2 ml-7">
              <li className="flex align-middle gap-1">
                <p className="font-semibold">Tên phân giao:</p>
                <p>Khách hàng Hà Nội sử dụng fiber</p>
              </li>
              <li className="flex align-middle gap-1">
                <p className="font-semibold">Tên hành vi khách hàng:</p>
                <p>Khách hàng Hà Nội sử dụng Vinaphone không sử dụng fiber - KH42463546341</p>
              </li>
              <li className="flex align-middle gap-1">
                <p className="font-semibold">Tên chiến dịch:</p>
                <p>Chiến dịch 1</p>
              </li>
              <li className="flex align-middle gap-1">
                <p className="font-semibold">Mã chiến dịch:</p>
                <p>CP012023</p>
              </li>
            </ul>
          </div>

          {/* Gửi thông tin OneBSS */}
          <div>
            <div className="flex align-middle gap-2 mb-2">
              <div className="flex flex-col justify-center">
                <IconRound />
              </div>
              <p className="font-semibold text-base">Gửi thông tin OneBSS</p>
            </div>
            <ul className="flex flex-col gap-2 ml-7">
              <li className="flex align-middle gap-2">
                <div className="flex flex-col justify-center">
                  <p className="font-semibold">Trạng thái gửi:</p>
                </div>
                <div className="bg-blue-50 rounded-full border border-blue-500 text-blue-500 px-4 py-1">Thành công</div>
              </li>
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PhanGiaoDanhSach;
