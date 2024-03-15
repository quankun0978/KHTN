import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Divider, Popover, Space } from 'antd';

import * as ROUTERS from '@/router/routes';
import { Button, InputForm, SelectForm, Table } from '@/component/common';
import { IconEdit, IconMess } from '@/component/common/Icon';
import * as TIEMNANG_VAR from '@/variables/TiemNangVariables';

const columns = (funcObj = {}) => [
  { title: 'STT', dataIndex: 'index', key: 'index', width: '5%', align: 'center' },
  { title: 'Số di động', dataIndex: 'phone', key: 'phone', width: '20%', align: 'center' },
  {
    title: 'Tên khách hàng',
    dataIndex: 'name',
    key: 'name',
    width: '20%',
    align: 'center',
    render: (text, row) => (
      <Link
        to={ROUTERS.DETAIL_KH + '/' + row.key}
        className="font-medium text-sm text-indigo-600 hover:text-indigo-500">
        {text}
      </Link>
    ),
  },
  { title: 'Nguồn dữ liệu', dataIndex: 'source_data', key: 'source_data', width: '20%', align: 'center' },
  { title: 'Người tạo', dataIndex: 'create_user', key: 'create_user', width: '20%', align: 'center' },
  {
    title: 'Thao tác',
    dataIndex: 'active',
    key: 'active',
    align: 'center',
    render: (_, row) => {
      return (
        <Space size="large">
          <button onClick={() => funcObj.showRequestEdit(row)}>
            <IconMess />
          </button>

          <button onClick={() => funcObj.showEdit(row)}>
            <IconEdit />
          </button>
        </Space>
      );
    },
  },
];

function TiemNang() {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const data = [
    { index: 1, phone: '0856258795', name: 'Nguyễn Văn A', source_data: 'Nhân viên nhập', create_user: 'chihtl@vnpt.vn' },
    { index: 2, phone: '0865256478', name: 'Nguyễn Văn B', source_data: 'Nhân viên nhập', create_user: 'anhpnv@vnpt.vn' },
    { index: 3, phone: '0865256477', name: 'Nguyễn Văn C', source_data: 'App Employee', create_user: 'linhht@vnpt.vn' },
  ];

  const showRequestEdit = (data) => {
    console.log({ data });
  };

  const showEdit = (data) => {
    console.log({ data });
  };

  const contentFilter = (
    <div>
      <Space
        size="middle"
        direction="vertical">
        <div style={{ width: 248 }}>
          <SelectForm
            itemStyle={{ width: '100%' }}
            name={TIEMNANG_VAR.TIEM_NANG_DS_SELECT_TTKD}
            placeholder="Trung tâm kinh doanh"
            list={[
              { value: 'ttkdjack', label: 'ttkd Jack' },
              { value: 'ttkdlucy', label: 'ttkd Lucy' },
              { value: 'ttkdYiminghe', label: 'ttkd yiminghe' },
            ]}
            allowClear={true}
            spanInput={24}
            noStyle={true}
            themeComponents={{ controlHeight: 40 }}
          />
        </div>
        <div style={{ width: 248 }}>
          <SelectForm
            itemStyle={{ width: '100%' }}
            name={TIEMNANG_VAR.TIEM_NANG_DS_SELECT_PBH}
            placeholder="Phòng bán hàng"
            list={[
              { value: 'pbhjack', label: 'pbh Jack' },
              { value: 'pbhlucy', label: 'pbh Lucy' },
              { value: 'pbhYiminghe', label: 'pbh yiminghe' },
            ]}
            allowClear={true}
            noStyle={true}
            spanInput={24}
            themeComponents={{ controlHeight: 40 }}
          />
        </div>
        <div style={{ width: 248 }}>
          <SelectForm
            itemStyle={{ width: '100%' }}
            name={TIEMNANG_VAR.TIEM_NANG_DS_SELECT_PHUONG}
            placeholder="Phường"
            list={[
              { value: 'pjack', label: 'p Jack' },
              { value: 'plucy', label: 'p Lucy' },
              { value: 'pYiminghe', label: 'p yiminghe' },
            ]}
            allowClear={true}
            noStyle={true}
            spanInput={24}
            themeComponents={{ controlHeight: 40 }}
          />
        </div>
      </Space>
    </div>
  );

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  return (
    <>
      <Form
        name={TIEMNANG_VAR.TIEM_NANG_DS_FORM_SEARCH}
        className="flex justify-between items-baseline"
        onFinish={onFinish}>
        <Space align="baseline">
          <div style={{ width: 248 }}>
            <InputForm
              name={TIEMNANG_VAR.TIEM_NANG_DS_INPUT_PHONE}
              placeholder="Số điện thoại"
              spanInput={24}
              isPhoneNumber={true}
              themeComponents={{ controlHeight: 40 }}
            />
          </div>
          <div style={{ width: 248 }}>
            <InputForm
              name={TIEMNANG_VAR.TIEM_NANG_DS_INPUT_NAME}
              placeholder="Tên khách hàng"
              spanInput={24}
              themeComponents={{ controlHeight: 40 }}
            />
          </div>
          <div style={{ width: 248 }}>
            <SelectForm
              name={TIEMNANG_VAR.TIEM_NANG_DS_SELECT_SOURCE}
              placeholder="Nguồn dữ liệu"
              list={[
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'Yiminghe', label: 'yiminghe' },
              ]}
              allowClear={true}
              themeComponents={{ controlHeight: 40 }}
            />
          </div>
        </Space>
        <Space>
          <Button
            style={{ height: 40 }}
            isDefault
            isSearch
            text="Tìm kiếm"
            htmlType="submit"
          />
          <Popover
            content={contentFilter}
            title="Bộ lọc nâng cao">
            <Button
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 52, height: 40 }}
              isFilter
              isDefault
            />
          </Popover>
        </Space>
      </Form>
      <Divider
        dashed
        orientationMargin={20}
        style={{ borderColor: '#94A3B8' }}
      />
      <div className="flex justify-end mb-5">
        <Button
          style={{ height: 40 }}
          isAdd
          text="Thêm mới khách hàng"
          onClick={() => navigate(ROUTERS.NEW_THU_THAP_KH_MOI)}
        />
      </div>
      <div>
        <Table
          columns={columns}
          page={page}
          pageSize={pageSize}
          totalPage={20}
          action={{ showRequestEdit, showEdit }}
          data={data}
          setPage={setPage}
          setPageSize={setPageSize}
          showTotal
          showSizeChanger
        />
      </div>
    </>
  );
}

export default TiemNang;
