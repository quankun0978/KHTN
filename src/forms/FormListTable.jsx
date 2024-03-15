import React from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider, Form, Input, Select } from 'antd';
import { Button } from '@/component/common';
import { IconTrash, IconDropdown } from '@/component/common/Icon';
import { tableSelect } from '@/config/theme/Select';

const _FormListTable = ({ name, items, onChange, dependentArr }) => {
  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => {
        return (
          <div className="flex flex-col">
            {fields.map(({ key, name, ...restField }, id) => {
              return (
                <div
                  key={key}
                  className="flex w-full items-baseline overflow-hidden relative">
                  <div className="flex flex-col w-full">
                    <div className="flex w-full items-end">
                      <div className="flex  flex-col w-1/12">
                        {id === 0 && <div className="flex justify-center items-center bg-cs_lightGray border-cs_border border text-center text-cs_gray font-semibold h-8">STT</div>}
                        <div className="flex justify-center items-center border-cs_border border text-center text-cs_gray font-semibold h-8">{id + 1}</div>
                      </div>
                      {items.map((item, index) => {
                        return (
                          <ConfigProvider
                            key={index}
                            theme={{ token: tableSelect }}>
                            <div className="flex flex-col flex-1">
                              {id === 0 && <span className="flex justify-center items-center bg-cs_lightGray border-cs_border border text-center text-cs_gray font-semibold h-8">{item.label}</span>}

                              <Form.Item
                                {...restField}
                                style={{ flex: 1, marginBottom: 0 }}
                                name={[name, item.name]}
                                rules={!item.message ? [] : [{ required: true, message: item.message }]}>
                                {item.type === 'select' ? (
                                  <Select
                                    className="rounded-none"
                                    style={{ borderRadius: 0, borderColor: '#B9B9B9' }}
                                    disabled={item.isDependent && dependentArr === null}
                                    options={item.isDependent && !!dependentArr && !!dependentArr[key] ? items[item.parentIndex].options[dependentArr[key]].subOptions : item.options}
                                    suffixIcon={<IconDropdown />}
                                    onChange={(value) => onChange(value, key, item.index)}
                                  />
                                ) : (
                                  <Input
                                    size="middle"
                                    style={{ borderRadius: 0, borderColor: '#B9B9B9' }}
                                  />
                                )}
                              </Form.Item>
                            </div>
                          </ConfigProvider>
                        );
                      })}
                      <div
                        className="ml-5 mb-2 cursor-pointer"
                        onClick={() => remove(name)}>
                        <IconTrash />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {fields.length < 20 && (
              <div className="inline-flex mt-5">
                <Button
                  text="+ Thêm mới"
                  isDefault
                  onClick={() => add()}
                />
              </div>
            )}
          </div>
        );
      }}
    </Form.List>
  );
};

_FormListTable.propTypes = {
  name: PropTypes.string,
  items: PropTypes.array,
  onChange: PropTypes.func,
  dependentArr: PropTypes.array,
};

_FormListTable.defaultProps = {
  name: 'default-list',
  items: [],
  onChange: () => {},
};

const FormListTable = React.memo(_FormListTable);

export default FormListTable;
