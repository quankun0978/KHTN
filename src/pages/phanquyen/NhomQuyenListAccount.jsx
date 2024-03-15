import React, { memo, useState } from 'react';

import propTypes from 'prop-types';

import { Modal } from 'antd';
import { Table } from '@/component/common';

const columns = () => [
  {
    title: 'STT',
    dataIndex: 'index',
  },
  {
    title: 'Tài khoản',
    dataIndex: 'account',
  },
  {
    title: 'Họ và tên',
    dataIndex: 'name',
  },
  {
    title: 'Đơn vị',
    dataIndex: 'unit',
  },
  {
    title: 'Chức vụ',
    dataIndex: 'position',
  },
];
const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i + 1,
    index: i + 1,
    account: `thutm${i + 1}@gmail.com`,
    name: `Nguyễn Văn A ${i}`,

    position: `Nhân viên kinh doanh ${i + 1}`,
  });
}
const NhomQuyenListAccount = (props) => {
  // eslint-disable-next-line react/prop-types
  const { isModalOpen, setIsModalOpen } = props;
  const [page, setPage] = useState(1);
  return (
    <div>
      <Modal
        width={800}
        title="Danh sách tài khoản của nhóm"
        open={isModalOpen}
        footer={() => <div></div>}
        onCancel={() => setIsModalOpen(false)}>
        <Table
          columns={columns}
          pageSize={5}
          page={page}
          data={data}
          setPage={setPage}
          totalPage={data.length}
        />
      </Modal>
    </div>
  );
};
NhomQuyenListAccount.PRO = {
  isModalOpen: propTypes.bool,
  setIsShowModal: propTypes.func,
};

export default memo(NhomQuyenListAccount);
