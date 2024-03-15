import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Checkbox, Col, Form, Layout, Radio, Row, Space, Modal as ModalAnt, Select as SelectAnt } from 'antd';

import NhomQuyenListAccount from './NhomQuyenListAccount';
import { Input, Button, Modal, Select } from '@/component/common';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectDemographic } from '@/redux/phanquyen/selectors';
import { configDefault } from '@/redux/phanquyen/action';
import { PhanQuyen } from '@/api/Phanquyen';
import { Notification } from '@/component/common/Notification/Notification';

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

const ChinhSuaNhomQuyen = () => {
  const navigate = useNavigate();
  const { dataDefaultConfig } = useSelector(selectDemographic);
  const [form] = Form.useForm();
  const { id } = useParams();
  const dispath = useDispatch();
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const [isModalWaring, setIsModalWarning] = useState(false);

  const [value, setValue] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [dataDefault, setDataDefault] = useState();

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
      console.log(values[item]);
      if (item.includes('menu') && values[item] !== undefined) {
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
    console.log(data);
    const result = await PhanQuyen.UPDATE_GROUP(id, data);
    console.log(result);
    if (result && result.data && result.data.code === 0) {
      Notification.success('Cập nhật thành công');
    } else {
      Notification.error('Cập nhật thất bại');
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSave = () => {
    form.submit();
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
              name="name"
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

      <ModalAnt
        title="Xác nhận"
        open={isModalConfirm}
        onCancel={() => setIsModalConfirm(false)}>
        <p>Xác nhận lưu nhóm quyền</p>
      </ModalAnt>
      <Modal
        content="Phát hiện tên nhóm quyền đã tồn tại Vui lòng thử lại"
        isModalOpen={isModalWaring}
        handleCancel={() => setIsModalWarning(false)}
        title="Hệ thống quản lý KHTN"
        isWarningModal={true}
      />
    </div>
  );
};

export default ChinhSuaNhomQuyen;
