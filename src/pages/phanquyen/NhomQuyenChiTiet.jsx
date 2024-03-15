import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Checkbox, Col, Form, Layout, Radio, Row, Space, Modal as ModalAnt, Select as SelectAnt } from 'antd';
import { Input, Button, Modal } from '@/component/common';

import { ExclamationCircleFilled } from '@ant-design/icons';

import * as ROUTES from '@/router/routes';
import { useDispatch, useSelector } from 'react-redux';
import { selectDemographic } from '@/redux/phanquyen/selectors';
import { configDefault, getDetailGroupById } from '@/redux/phanquyen/action';

const { confirm } = ModalAnt;

const ChiTietNhomQuyen = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const { id } = useParams();
  const [form] = Form.useForm();
  const { dataDefaultConfig, dataDetail } = useSelector(selectDemographic);

  const [isModalWaring, setIsModalWarning] = useState(false);

  const [dataDefault, setDataDefault] = useState();
  const [dataInitForm, setDataInitForm] = useState();

  useEffect(() => {
    dispath(configDefault({ page: 0, size: 0 }));
    dispath(getDetailGroupById(id));
  }, []);
  useEffect(() => {
    if (dataDefaultConfig && dataDefaultConfig.length > 0) {
      setDataDefault(dataDefaultConfig);
    }
  }, [dataDefaultConfig]);
  useEffect(() => {
    const result = {};
    if (dataDetail && Object.keys(dataDetail).length > 0) {
      if (dataDetail.group_menus.length > 0) {
        for (const obj of dataDetail.group_menus) {
          const key = `menu${obj.menu_id}`;
          result[key] = obj;
        }

        for (let key in result) {
          if (key.includes('menu')) {
            result[key] = Object.keys(result[key]).filter((i) => i.includes('able'));
          }
        }
      }
      result['name'] = dataDetail.name;
      console.log(result);
      form.setFieldsValue(result);
    }
  }, [dataDetail, form]);

  const handleSubmit = (values) => {
    console.log(values);
    setIsModalWarning(true);
  };

  const handleCancel = () => {
    navigate(ROUTES.PHAN_QUYEN);
  };

  const handleEdit = () => {
    navigate(ROUTES.CHINH_SUA_NHOM_QUYEN);
    // form.submit();

    // form.submit();
  };
  const handleDelete = () => {
    // form.submit();
    confirm({
      width: 400,
      okText: 'Đồng ý',
      cancelText: 'hủy',
      okType: 'default',
      title: `Bạn có muốn xóa nhóm quyền không ?`,
      icon: <ExclamationCircleFilled />,
      onOk() {},
      onCancel() {},
    });
  };

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
          <div className="w-1/2">
            <Form.Item
              label="Tên nhóm quyền"
              name="name">
              <Input
                size="middle"
                disabled={true}
              />
            </Form.Item>
            <Form.Item
              label="Mô tả"
              name="description">
              <Input
                size="middle"
                disabled={true}
              />
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
                          valuePropName="checked"
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
                                      disabled={true}
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
                              valuePropName="checked"
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
                                          disabled={true}
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
            </Layout.Content>
          </Layout>
        </Form>
      </div>
      <div className="flex gap-2 mt-3 float-end">
        <Button
          size="middle"
          text="Xóa"
          isDefault={true}
          onClick={handleDelete}
        />
        <Button
          size="middle"
          text="Sửa"
          isDefault={true}
          onClick={handleEdit}
        />
        <Button
          size="middle"
          text="Đóng"
          onClick={handleCancel}
          type="primary"
        />
      </div>
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

export default ChiTietNhomQuyen;
