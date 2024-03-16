import { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { Divider, Modal } from 'antd';

import { Button, Input, DatePicker } from '@/component/common';
import Table from '@/component/common/Table/Table';
import { Notification } from '@/component/common/Notification/Notification';

import { ExclamationCircleFilled, SearchOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import * as ROUTES from '@/router/routes';
import { PhanQuyen } from '@/api/Phanquyen';

const { confirm } = Modal;

const columns = () => [
  {
    title: 'STT',
    dataIndex: 'index',
  },
  {
    title: 'Nhóm quyền',
    dataIndex: 'name',
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
  },
  {
    title: 'Thời gian tạo',
    dataIndex: 'create_time',
  },
  {
    title: 'Người tạo',
    dataIndex: 'create_by',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
  },
  {
    title: 'Thao tác',
    dataIndex: 'operation',
  },
];

const DanhSachNhomQuyen = () => {
  const dtTable = useRef();
  const navigate = useNavigate();
  const [dataTable, setDataTable] = useState([]);

  const [valuePermissonGroup, setValuePermissionGroup] = useState('');
  const [totalPage, setTotalPage] = useState();
  const [valueCreator, setValueCreator] = useState('');
  const [page, setPage] = useState(1);
  const [date, setDate] = useState('');

  useEffect(() => {
    handleGetData();
  }, [page]);

  const onClickUpdate = (id) => {
    navigate(ROUTES.CHI_TIET_NHOM_QUYEN + `/${id}`);
  };

  const onClickChangeStatus = (item) => {
    confirm({
      width: 400,
      okText: 'Thay đổi',
      cancelText: 'hủy',
      okType: 'default',
      title: `Bạn có muốn ${item.status === 1 ? 'ngừng kích hoạt' : 'kích hoạt'} nhóm quyền ${item.name} không ?`,
      icon: <ExclamationCircleFilled />,

      onOk() {
        handleChangeStatus({ id: item.id, status: item.status === 1 ? 0 : 1 });
      },
      onCancel() {},
    });
  };

  const onChange = (date, dateString) => {
    setDate(dateString);
  };

  const onSearch = () => {
    let dataFilter = dtTable.current; // Khởi tạo dataFilter với giá trị ban đầu là toàn bộ dtTable

    if (valuePermissonGroup) {
      dataFilter = dataFilter.filter((item) => item.name.includes(valuePermissonGroup));
    }
    if (valueCreator) {
      dataFilter = dataFilter.filter((item) => item.create_by.includes(valueCreator));
    }
    if (date) {
      dataFilter = dataFilter.filter((item) => item.create_time === date);
    }

    setDataTable(dataFilter);
  };

  const handleOnclickCreate = () => {
    navigate(ROUTES.THEM_MOI_NHOM_QUYEN);
  };

  const handleChangeStatus = async (data) => {
    const result = await PhanQuyen.CHANGE_STATUS_GROUP(data);
    if (result && result.data && result.data.code === 0) {
      Notification.success('Thay đổi trạng thái thành công');
      const dataLateDelete = dtTable.current.map((i) => {
        if (i.id === data.id) return { ...i, status: i.status === 0 ? 'Ngừng kích hoạt' : 'kích hoạt' };
        return i;
      });
      setDataTable(dataLateDelete);
    } else {
      Notification.error('Thay đổi trạng thái không thành công');
    }
  };

  const handleGetData = async () => {
    const data = await PhanQuyen.LIST_GROUP(JSON.stringify({ page: page > 0 ? page - 1 : page, size: 5, name: 's', creator: null }));
    const pageSize = 5;
    const dataMapOperation =
      data &&
      data.data &&
      data.data.data &&
      data.data.data.elements.map((item, index) => {
        const pageIndex = (page - 1) * pageSize;
        return {
          ...item,
          description: 'Test ',
          create_by: `Dũng sobin ${item.id}`,
          create_time: `10/03/2024`,
          index: pageIndex + index + 1,
          key: item.key,
          status: item.status === 1 ? 'Kích hoạt' : 'Ngừng kích hoạt',
          operation: (
            <div
              className="flex gap-3"
              key={item.key}>
              <FontAwesomeIcon
                onClick={() => onClickUpdate(item.id)}
                style={{ color: 'rgba(49, 106, 255, 1)' }}
                icon={faPenToSquare}
                className="text-xl"
              />
              <FontAwesomeIcon
                onClick={() => onClickChangeStatus(item)}
                style={{ color: 'rgba(255, 86, 53, 1)' }}
                icon={faTrashCan}
                className="text-xl"
              />
            </div>
          ),
        };
      });

    dtTable.current = dataMapOperation;
    setDataTable(dataMapOperation);
    setTotalPage(data && data.data && data.data.data.total_elements);
  };

  return (
    <>
      <div className="mx-3 ">
        <div className="  flex justify-between  mb-4  ">
          <div className="flex gap-3">
            <Input
              value={valuePermissonGroup}
              onChange={(e) => setValuePermissionGroup(e.target.value)}
              style={{ width: 430 }}
              suffix={<SearchOutlined />}
              size={'middle'}
              placeholder={'Nhóm quyền'}
            />
            <DatePicker
              onChange={onChange}
              style={{ width: '250px' }}
              placeholder={'Thời gian từ đến'}
            />

            <Input
              onChange={(e) => setValueCreator(e.target.value)}
              value={valueCreator}
              style={{ width: 150 }}
              size={'middle'}
              placeholder={'Người tạo'}
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={onSearch}
              isDefault
              isSearch
              text="Tìm kiếm"
            />
          </div>
        </div>
        <Divider
          dashed
          orientationMargin={20}
          style={{
            borderColor: '#94A3B8',
          }}
        />
        <div className="mb-4 float-end">
          <Button
            text="Thêm mới"
            onClick={handleOnclickCreate}
            isAdd={true}
          />
        </div>
        <Table
          page={page}
          columns={columns}
          pageSize={5}
          data={dataTable}
          showSizeChanger={true}
          setPage={setPage}
          showTotal={true}
          totalPage={totalPage}
        />
      </div>
      <Outlet />
    </>
  );
};

export default DanhSachNhomQuyen;
