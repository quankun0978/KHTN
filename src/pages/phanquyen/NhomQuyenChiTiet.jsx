import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Checkbox, Form, Layout, Modal as ModalAnt } from 'antd';
import { Input, Button, Modal } from '@/component/common';

import { ExclamationCircleFilled } from '@ant-design/icons';

import * as ROUTES from '@/router/routes';
import { selectDemographic } from '@/redux/phanquyen/selectors';
import { configDefault, getDetailGroupById } from '@/redux/phanquyen/action';

import * as helper from '@/utils/helper';

const { confirm } = ModalAnt;

const ChiTietNhomQuyen = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const { id } = useParams();
  const [form] = Form.useForm();
  const { dataDefaultConfig, dataDetail } = useSelector(selectDemographic);

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

  const handleSubmit = (values) => {};

  const handleCancel = () => {
    navigate(ROUTES.PHAN_QUYEN);
  };

  const handleEdit = () => {
    navigate(ROUTES.CHINH_SUA_NHOM_QUYEN);
  };
  const handleDelete = () => {
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
                                  disabled={true}
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
                                        disabled={true}
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
      <div className="flex gap-2 mt-3 justify-end">
        <Button
          size="middle"
          className="w-24"
          text="Xóa"
          isDefault={true}
          onClick={handleDelete}
        />
        <Button
          size="middle"
          className="w-24"
          text="Sửa"
          isDefault={true}
          onClick={handleEdit}
        />
        <Button
          className="w-24"
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
