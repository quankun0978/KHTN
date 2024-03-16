import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Checkbox, Form, Layout, Modal as ModalAnt } from 'antd';

import { Input, Button, Modal } from '@/component/common';
import { Notification } from '@/component/common/Notification/Notification';

import { selectDemographic } from '@/redux/phanquyen/selectors';
import { configDefault, getDetailGroupById } from '@/redux/phanquyen/action';
import { PhanQuyen } from '@/api/Phanquyen';

import * as helper from '@/utils/helper';

const ChinhSuaNhomQuyen = () => {
  const navigate = useNavigate();
  const { dataDefaultConfig, dataDetail } = useSelector(selectDemographic);
  const [form] = Form.useForm();
  const { id } = useParams();
  const dispath = useDispatch();
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const [isModalWaring, setIsModalWarning] = useState(false);

  const [dataDefault, setDataDefault] = useState();

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
          result[key] = Object.keys(obj).filter((i) => obj[i] === 1 && i !== 'status' && i !== 'menu_id');
        }
      }
      result['name'] = dataDetail.name;

      form.setFieldsValue(result);
    }
  }, [dataDetail, form]);

  const handleSubmit = async (values) => {
    const dt = Object.keys(values).map((item) => {
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
    const result = await PhanQuyen.UPDATE_GROUP(id, data);
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
              <Input
                size="middle"
                disabled={true}
              />
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
              {dataDefault &&
                dataDefault.length > 0 &&
                dataDefault.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="w-full p-3  bg-white rounded-xl mb-3">
                      <div className="flex mb-3">
                        <p style={{ minWidth: '18%', display: 'flex', alignItems: 'center' }}>{item.name}</p>
                        <Form.Item
                          name={'menu' + item.id}
                          style={{ display: 'flex', alignItems: 'center', marginBottom: '0', width: '500px' }}>
                          <Checkbox.Group
                            className="w-full "
                            style={{ width: '100%', justifyContent: 'space-between' }}>
                            {Object.keys(item).map((value) => {
                              if (value === 'status' || value === 'name' || value === 'sub_menus' || value === 'id') {
                                return null;
                              }
                              return (
                                <Checkbox
                                  key={`value${value}`}
                                  value={helper.convertValueCheckbox(value)}
                                  style={{ lineHeight: '32px' }}>
                                  {helper.convertDataCheckbox(value)}
                                </Checkbox>
                              );
                            })}
                          </Checkbox.Group>
                        </Form.Item>
                      </div>
                      {item.sub_menus && item.sub_menus.length > 0 && (
                        <>
                          {item.sub_menus.map((sub) => (
                            <div
                              key={'sub-' + sub.id}
                              className="flex mb-3">
                              <p style={{ minWidth: '18%', display: 'flex', alignItems: 'center' }}>{sub.name}</p>
                              <Form.Item
                                name={'menu' + sub.id}
                                style={{ display: 'flex', alignItems: 'center', marginBottom: '0', width: '500px' }}>
                                <Checkbox.Group
                                  className="w-full justify-between"
                                  style={{ width: '100%', justifyContent: 'space-between' }}>
                                  {Object.keys(sub).map((k) => {
                                    if (k === 'status' || k === 'name' || k === 'sub_menus' || k === 'id') {
                                      return null;
                                    }
                                    return (
                                      <Checkbox
                                        key={'value' + k}
                                        value={helper.convertValueCheckbox(k)}
                                        style={{ lineHeight: '32px' }}>
                                        {helper.convertDataCheckbox(k)}
                                      </Checkbox>
                                    );
                                  })}
                                </Checkbox.Group>
                              </Form.Item>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  );
                })}
            </Layout.Content>
          </Layout>
        </Form>
      </div>
      <div className="flex gap-4 mt-3  justify-end">
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
