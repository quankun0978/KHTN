import Table from '@/component/common/Table/Table';
import Modal from 'antd/es/modal/Modal';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const columns = (funcObj = {}) => [
  { title: 'Tài khoản', dataIndex: 'account', key: 'account', width: '10%', align: 'center' },
  { title: 'Họ tên', dataIndex: 'name', key: 'name', width: '10%', align: 'center' },
  { title: 'Điện thoại', dataIndex: 'phone', key: 'phone', width: '10%', align: 'center' },
  { title: 'Nhóm quyền', dataIndex: 'group_role', key: 'group_role', width: '10%', align: 'center' },
  { title: 'Nhóm người dùng', dataIndex: 'group_user', key: 'group_user', width: '10%', align: 'center' },
  { title: 'Đơn vị', dataIndex: 'unit', key: 'unit', width: '10%', align: 'center' },
  { title: 'Chức vụ', dataIndex: 'role', key: 'role', width: '10%', align: 'center' },
  { title: 'Trạng thái', dataIndex: 'status', key: 'status', width: '10%', align: 'center' },
  {
    title: 'Thao tác',
    dataIndex: 'active',
    key: 'active',
    align: 'center',
    render: (_, row) => {
      return (
        <div className="flex justify-center">
          <button onClick={() => funcObj.showConfirmCancel(row)}>
            <FontAwesomeIcon
              icon={faSignOutAlt}
              className="mr-2"
            />
          </button>

          <button onClick={() => funcObj.showConfirmContinue(row)}>
            <FontAwesomeIcon
              icon={faSignOutAlt}
              className="mr-2"
            />
          </button>
        </div>
      );
    },
  },
];

function TaiKhoan() {
  const { confirm } = Modal;
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const data = [
    {
      account: 'chihtl',
      name: 'Hoàng Thị Linh Chi',
      phone: '0987654321',
      group_role: '',
      group_user: 'Nhóm A; Nhóm B',
      unit: 'Media',
      role: '',
      status: 1,
      active: '',
    },
    {
      account: 'chihtl',
      name: 'Hoàng Thị Linh Chi',
      phone: '0987654321',
      group_role: '',
      group_user: 'Nhóm A; Nhóm B',
      unit: 'Media',
      role: '',
      status: 1,
      active: '',
    },
  ];

  const showConfirmCancel = (data) => {
    confirm({
      title: 'Do you want to stop this journey?',
      content: (
        <div className="text-primary">
          <span className="font-medium">Journey:</span> {data.id}
          <p className="text-xxs">The journey will no longer be sent to the selected segment. This action cannot be undone.</p>
        </div>
      ),
      onOk() {
        const retrievedObject = localStorage.getItem('role');
        const userRole = JSON.parse(retrievedObject);
      },
    });
  };

  const showConfirmContinue = (data) => {
    confirm({
      title: 'Do you want to stop this journey?',
      content: (
        <div className="text-primary">
          <span className="font-medium">Journey111111111111:</span> {data.id}
          <p className="text-xxs">The journey will no longer be sent to the selected segment. This action cannot be undone.</p>
        </div>
      ),
      onOk() {
        const retrievedObject = localStorage.getItem('role');
        const userRole = JSON.parse(retrievedObject);
      },
    });
  };

  return (
    <Table
      columns={columns}
      page={page}
      pageSize={pageSize}
      totalPage={20}
      action={{ showConfirmContinue, showConfirmCancel }}
      data={data}
      showSizeChanger={true}
      setPage={setPage}
      setPageSize={setPageSize}
    />
  );
}

export default TaiKhoan;
