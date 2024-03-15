import { Checkbox, Col, ConfigProvider, Form, Row, Select as SelectAnt, Space } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { defaultSelectToken, formSelect } from '@/config/theme/Select';
import './Select.scss';
import IconDropdown from '@/component/common/Icon/IconDropdown';

const _SelectForm = ({
  allowClear,
  placeholder,
  list,
  name,
  isRequired,
  showSearch,
  handleChange,
  initialValue,
  disabled,
  loading,
  onSelect,
  dropdownStyle,
  itemStyle,
  mode,
  spanLabel,
  spanInput,
  label,
  smallLabel,
  themeToken,
  themeComponents,
  noStyle,
  customClassWrapper,
  hasCheckbox,
  checked,
  disabledCheckbox,
  onChangeCheckbox,
  ...rest
}) => {
  let rules = [];
  if (isRequired) {
    rules = [{ required: true, message: 'Required field cannot be left blank' }, ...rules];
  }

  return (
    <Row
      className={customClassWrapper}
      align="middle">
      {label && (
        <Col
          className="justify-between items-baseline"
          style={{ display: 'flex' }}
          span={spanLabel}>
          <Space
            size="small"
            style={{ marginBottom: 24 }}>
            <p className="font-medium text-sm text-cs_gray">{label}</p>
            {smallLabel && <p className="font-medium text-xs text-cs_textGray">{smallLabel}</p>}
            {isRequired && <p className="font-semibold text-sm text-cs_red">*</p>}
          </Space>
          {hasCheckbox && (
            <div className="mr-4">
              <Checkbox
                checked={checked}
                disabled={disabledCheckbox}
                onChange={onChangeCheckbox}
              />
            </div>
          )}
        </Col>
      )}
      <Col span={spanInput}>
        <ConfigProvider
          theme={{
            token: { ...defaultSelectToken, ...themeToken },
            components: { Select: { ...formSelect, ...themeComponents } },
          }}>
          <Form.Item
            name={name}
            rules={rules}
            style={itemStyle}
            noStyle={noStyle}>
            <SelectAnt
              {...rest}
              style={noStyle ? itemStyle : {}}
              allowClear={allowClear}
              showSearch={showSearch}
              placeholder={placeholder}
              onChange={handleChange}
              onSelect={onSelect}
              defaultValue={initialValue}
              disabled={disabled}
              loading={loading}
              suffixIcon={<IconDropdown />}
              optionFilterProp="children"
              dropdownStyle={dropdownStyle}
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().indexOf(input.toLowerCase()) >= 0}
              mode={mode}
              options={list}
            />
          </Form.Item>
        </ConfigProvider>
      </Col>
    </Row>
  );
};

_SelectForm.propTypes = {
  allowClear: PropTypes.bool,
  placeholder: PropTypes.string,
  customClassWrapper: PropTypes.string,
  list: PropTypes.array,
  name: PropTypes.string,
  isRequired: PropTypes.bool,
  showSearch: PropTypes.bool,
  handleChange: PropTypes.func,
  initialValue: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  noStyle: PropTypes.bool,
  onSelect: PropTypes.func,
  dropdownStyle: PropTypes.object,
  itemStyle: PropTypes.object,
  mode: PropTypes.string,
  label: PropTypes.string,
  smallLabel: PropTypes.string,
  spanLabel: PropTypes.number,
  spanInput: PropTypes.number,
  themeToken: PropTypes.object,
  themeComponents: PropTypes.object,
  hasCheckbox: PropTypes.bool,
  checked: PropTypes.bool,
  disabledCheckbox: PropTypes.bool,
  onChangeCheckbox: PropTypes.func,
};

_SelectForm.defaultProps = {
  list: [],
  customClassWrapper: '',
  themeToken: {},
  themeComponents: {},
  allowClear: false,
  showSearch: true,
  loading: false,
  size: 'default',
  spanLabel: 8,
  spanInput: 16,
  label: null,
  noStyle: false,
  onSelect: () => {},
  hasCheckbox: false,
  checked: false,
  disabledCheckbox: false,
  onChangeCheckbox: () => {},
};

const SelectForm = React.memo(_SelectForm);

export default SelectForm;
