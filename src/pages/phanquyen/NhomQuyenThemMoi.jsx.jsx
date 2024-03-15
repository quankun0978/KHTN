import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Checkbox, Col, Form, Layout, Radio, Row, Space, Select as SelectAnt } from 'antd';

import NhomQuyenListAccount from './NhomQuyenListAccount';

import { Input, Button, Modal } from '@/component/common';
import { Notification } from '@/component/common/Notification/Notification';

import { PhanQuyen } from '@/api/Phanquyen';
import { configDefault } from '@/redux/phanquyen/action';
import { selectDemographic } from '@/redux/phanquyen/selectors';
import { useDispatch, useSelector } from 'react-redux';

// const plainOptions = ['readable', 'addable', 'editable', 'approveable'];
// const plainOptions1 = ['readable', 'addable', 'editable', 'approveable'];
// const plainOptions2 = ['readable', 'addable', 'editable', 'approveable'];
// const plainOptions3 = ['readable', 'addable', 'editable', 'approveable'];

const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];

const ThemMoiNhomQuyen = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const { dataDefaultConfig } = useSelector(selectDemographic);
  const [form] = Form.useForm();
  const [dataDefault, setDataDefault] = useState();

  const [checkedList, setCheckedList] = useState([defaultCheckedList]);

  // const [checkedList, setCheckedList] = useState([]);

  // const [checkedList1, setCheckedList1] = useState([]);
  // const [checkedList2, setCheckedList2] = useState([]);
  // const [checkedList3, setCheckedList3] = useState([]);

  const [isShowModalTableAccount, setIsShowModalTableAccount] = useState(false);
  const [isModalWaring, setIsModalWarning] = useState(false);

  const checkAll = plainOptions.length === checkedList.length;
  // const checkAll = plainOptions.length === checkedList.length;
  // const checkAll1 = plainOptions1.length === checkedList1.length;
  // const checkAll2 = plainOptions2.length === checkedList2.length;
  // const checkAll3 = plainOptions3.length === checkedList3.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;

  // const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;

  // const indeterminate1 = checkedList1.length > 0 && checkedList1.length < plainOptions1.length;
  // const indeterminate2 = checkedList2.length > 0 && checkedList2.length < plainOptions2.length;
  // const indeterminate3 = checkedList3.length > 0 && checkedList3.length < plainOptions3.length;

  const [value, setValue] = useState(1);

  useEffect(() => {
    dispath(configDefault({ page: 0, size: 0 }));
  }, []);
  useEffect(() => {
    if (dataDefaultConfig && dataDefaultConfig.length > 0) {
      setDataDefault(dataDefaultConfig);
    }
  }, [dataDefaultConfig]);

  const handleSubmit = async (values) => {
    const dt = Object.keys(values).map((item) => {
      if (item.includes('menu')) {
        return {
          status: 1,
          menu_id: +item.replace('menu', ''),
          can_read: values[item].includes('can_read') ? 1 : 0,
          can_add: values[item].includes('can_add') ? 1 : 0,
          can_edit: values[item].includes('can_edit') ? 1 : 0,
          can_approve: values[item].includes('can_approve') ? 1 : 0,
        };
      }
      return;
    });
    const data = dt.filter((item) => {
      return item != null;
    });
    const body = {
      group_name: values.group_name,
      group_menus: data,
      departments: [{}],
    };
    const result = await PhanQuyen.CREATE_GROUP(JSON.stringify(body));
    if (result && result.data && result.data.code === 0) {
      Notification.success('Thêm mới thành công');
    } else {
      setIsModalWarning(true);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSave = () => {
    form.submit();
  };
  const handleChange = (value) => {};
  // const onChange = (list) => {
  //   setCheckedList(list);
  // };
  const onChange1 = (e) => {
    setValue(e.target.value);
  };
  // const onChange2 = (list) => {
  //   setCheckedList1(list);
  // };
  // const onChange3 = (list) => {
  //   setCheckedList2(list);
  // };
  // const onChange4 = (list) => {
  //   setCheckedList3(list);
  // };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };
  // const onCheckAllChange = (e) => {
  //   setCheckedList(e.target.checked ? plainOptions : []);
  // };
  // const onCheckAllChange1 = (e) => {
  //   setCheckedList1(e.target.checked ? plainOptions1 : []);
  // };
  // const onCheckAllChange2 = (e) => {
  //   setCheckedList2(e.target.checked ? plainOptions2 : []);
  // };
  // const onCheckAllChange3 = (e) => {
  //   setCheckedList3(e.target.checked ? plainOptions3 : []);
  // };

  const convertData = (value) => {
    switch (value) {
      case 'readable':
        return 'Danh sách';
      case 'addable':
        return 'Thên mới';
      case 'editable':
        return 'Chỉnh sửa';
      case 'approveable':
        return 'Cấp quyền';
    }
  };
  const convertValue = (value) => {
    switch (value) {
      case 'readable':
        return 'can_read';
      case 'addable':
        return 'can_add';
      case 'editable':
        return 'can_edit';
      case 'approveable':
        return 'can_approve';
    }
  };

  return (
    <div className="w-full h-auto px-3 ">
      <div className="w-full px-6 py-5 h-auto bg-white rounded-xl">
        <Form
          name="wrap"
          form={form}
          layout="vertical"
          labelAlign="left"
          labelWrap
          wrapperCol={{
            flex: 1,
          }}
          colon={false}
          onFinish={handleSubmit}>
          <div className="w-full">
            <Form.Item
              label="Tên nhóm quyền"
              name="group_name"
              rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}>
              <Input size="middle" />
            </Form.Item>
            <Form.Item
              label="Mô tả"
              name="description">
              <Input size="middle" />
            </Form.Item>
          </div>

          <p className="pb-2">Chọn phân quyền theo chức năng</p>

          <Layout style={{ background: '#F1F5F9 ', borderRadius: '12px' }}>
            <Layout.Content
              className="px-3  pt-3 h-auto rounded-xl"
              style={{ background: '#F1F5F9 ', borderRadius: '12px' }}>
              {/* chuẩn */}
              {dataDefault &&
                dataDefault.length > 0 &&
                dataDefault.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="w-full p-3  bg-white  rounded-xl mb-3">
                      {item.sub_menus && item.sub_menus.length === 0 ? (
                        <Form.Item
                          name={'menu' + item.id}
                          label={item.name}>
                          <Checkbox.Group className="w-full">
                            <Row className="w-full ">
                              {Object.keys(item).map((value) => {
                                if (value === 'status' || value === 'name' || value === 'sub_menus' || value === 'id') {
                                  return null;
                                }
                                return (
                                  <Col key={'value-' + value}>
                                    <Checkbox
                                      value={convertValue(value)}
                                      style={{
                                        lineHeight: '32px',
                                      }}>
                                      {convertData(value)}
                                    </Checkbox>
                                  </Col>
                                );
                              })}
                            </Row>
                          </Checkbox.Group>
                        </Form.Item>
                      ) : (
                        item.sub_menus.map((sub) => {
                          return (
                            <Form.Item
                              key={'sub-' + sub.id}
                              name={'menu' + sub.id}
                              label={sub.name}>
                              <Checkbox.Group className="w-full">
                                <Row className="w-full">
                                  {Object.keys(sub).map((k) => {
                                    if (k === 'status' || k === 'name' || k === 'sub_menus' || k === 'id') {
                                      return null;
                                    }
                                    return (
                                      <Col key={'value-' + k}>
                                        <Checkbox
                                          value={convertValue(k)}
                                          style={{
                                            lineHeight: '32px',
                                          }}>
                                          {convertData(k)}
                                        </Checkbox>
                                      </Col>
                                    );
                                  })}
                                </Row>
                              </Checkbox.Group>
                            </Form.Item>
                          );
                        })
                      )}
                    </div>
                  );
                })}{' '}
              {/* <Checkbox.Group onChange={handleCheckboxChange}>
                {dataDefault&&dataDefault.length>0&&dataDefault.map((menu) => (
                  <React.Fragment key={menu.id}>
                    <Checkbox value={menu.id.toString()}>{menu.name}</Checkbox>
                    {menu.sub_menus.length > 0 && (
                      <div style={{ marginLeft: 20 }}>
                        {menu.sub_menus.map((submenu) => (
                          <Checkbox
                            key={submenu.id}
                            value={submenu.id.toString()}
                            style={{ marginLeft: 10 }}>
                            {submenu.name}
                          </Checkbox>
                        ))}
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </Checkbox.Group>

              {/* {data.map((item) => {
                return (
                  <Form.Item
                    key={item.all.name}
                    name={item.all.name}
                    style={{ marginBottom: '12px' }}
                    rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}>
                    <div>
                      <div className="w-full p-3  bg-white    rounded-xl">
                        {item.all.isCheckAll && (
                          <Row className="mb-3">
                            <Col span={5}>
                              <p>{item.all.title}</p>
                            </Col>

                            <Col span={19}>
                              <div className="flex gap-2">
                                <Checkbox
                                  indeterminate={item.all.indeterminate}
                                  onChange={item.all.onCheckAllChange}
                                  checked={item.all.checkAll}>
                                  Tất cả
                                </Checkbox>
                              </div>
                            </Col>
                          </Row>
                        )}
                        <Checkbox.Group
                          value={item.all.checkedlist}
                          style={{
                            width: '100%',
                          }}
                          onChange={item.all.onchange}>
                          <div className="flex flex-col w-full">
                            {item.child.data.map((i) => {
                              return (
                                <Row
                                  key={i.id}
                                  className="mb-3">
                                  <Col span={5}>
                                    <p>{i.name}</p>
                                  </Col>
                                  <Col span={19}>
                                    <div className="flex gap-2">
                                      {i.items.map((k) => {
                                        return (
                                          <Checkbox
                                            key={k.value}
                                            value={k.value}>
                                            {k.label}
                                          </Checkbox>
                                        );
                                      })}
                                    </div>
                                  </Col>
                                </Row>
                              );
                            })}
                          </div>
                        </Checkbox.Group>
                      </div>
                    </div>
                  </Form.Item>
                );
              })} */}
            </Layout.Content>
          </Layout>
        </Form>
      </div>
      <div className="flex gap-4 mt-3  justify-center">
        <Button
          className="w-24"
          size="middle"
          text="Đóng"
          isDefault={true}
          onClick={handleCancel}
        />
        <Button
          size="middle"
          className="w-24"
          text="Lưu"
          onClick={handleSave}
          type="primary"
        />
      </div>
      <NhomQuyenListAccount
        setIsModalOpen={setIsShowModalTableAccount}
        isModalOpen={isShowModalTableAccount}
      />
      <Modal
        content="Phát hiện tên nhóm quyền đã tồn tại"
        isModalOpen={isModalWaring}
        handleCancel={() => setIsModalWarning(false)}
        title="Hệ thống quản lý KHTN"
        isWarningModal={true}
      />
    </div>
  );
};

export default ThemMoiNhomQuyen;
