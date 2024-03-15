import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form, Input, Select } from 'antd';

import { selectDemographic } from '@/redux/khokhachhang/selectors';
import { MinusCircleOutlined, CloseOutlined } from '@ant-design/icons';

import './FormListNhanKhauHoc.scss';

function FormListNhanKhauHoc({ listData, isNested, onFinish }) {
  const { data } = useSelector(selectDemographic);

  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <Form
      className="cs-form-list-item"
      onFinish={onFinish}
      autoComplete="off">
      <Form.List name="users">
        {(fields, { add, remove }) => {
          return (
            <div className="flex flex-col">
              {fields.map(({ key, name, ...restField }, id) => {
                return (
                  <div
                    key={key}
                    className="flex flex-col">
                    {id === 0 && (
                      <div className="flex pl-8">
                        <span className=" w-1/2">Tiêu chí</span>
                        <span className=" w-1/2">Thuộc tính</span>
                      </div>
                    )}
                    <div className="flex w-full items-baseline overflow-hidden relative">
                      <div className="flex flex-col items-center mr-2">
                        <div className={`${id === fields.length - 1 ? '' : 'cs-num-order'} bg-blue-600 text-white w-6 h-6 rounded text-center`}>{id + 1}</div>
                        {id !== fields.length - 1 && <div className="cs-chip-tag flex justify-center flex-1 items-center top-1/2 absolute  ">và</div>}
                      </div>

                      <div className="flex flex-col w-full">
                        <div className="flex w-full items-baseline">
                          <Form.Item
                            {...restField}
                            style={{ flex: 1, marginRight: 8 }}
                            name={[name, 'first']}>
                            <Select options={[{ value: 'sample', label: <span>sample</span> }]} />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            style={{ flex: 1, marginRight: 8 }}
                            name={[name, 'last']}>
                            <Input placeholder="Last Name" />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </div>
                        {/* Nest Form.List */}
                        {isNested && (
                          <div className="flex">
                            <Form.List name={[name, 'list']}>
                              {(subFields, subOpt) => (
                                <div className="flex w-full flex-1 flex-col">
                                  {subFields.map((subField) => (
                                    <div
                                      className="flex w-full items-baseline"
                                      key={subField.key}>
                                      <Form.Item
                                        {...restField}
                                        style={{ flex: 1, marginRight: 8 }}
                                        name={[name, 'a']}
                                        rules={[{ required: true, message: 'Missing first name' }]}>
                                        <Input placeholder="First Name" />
                                      </Form.Item>
                                      <Form.Item
                                        {...restField}
                                        style={{ flex: 1, marginRight: 8 }}
                                        name={[name, 'b']}
                                        rules={[{ required: true, message: 'Missing last name' }]}>
                                        <Input placeholder="Last Name" />
                                      </Form.Item>
                                      <CloseOutlined
                                        onClick={() => {
                                          subOpt.remove(subField.name);
                                        }}
                                      />
                                    </div>
                                  ))}
                                  <Button
                                    type="dashed"
                                    className="mb-5"
                                    onClick={() => subOpt.add()}
                                    block>
                                    + Add Sub Item
                                  </Button>
                                </div>
                              )}
                            </Form.List>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <Form.Item className="inline-flex">
                <Button
                  type="dashed"
                  style={{ borderColor: 'rgba(49, 106, 255, 1)', color: 'rgba(49, 106, 255, 1)' }}
                  onClick={() => add()}
                  block>
                  Thêm điều kiện
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
FormListNhanKhauHoc.propTypes = {
  isNested: PropTypes.bool,
  listData: PropTypes.array,
};

FormListNhanKhauHoc.defaultProps = {
  isNested: false,
  listData: [],
};

export default memo(FormListNhanKhauHoc);
