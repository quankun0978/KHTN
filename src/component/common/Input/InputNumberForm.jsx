import React from 'react';
import PropTypes from 'prop-types';
import { InputNumber as InputNumberAnt, ConfigProvider, Form, Space, Row, Col } from 'antd';
import { defaultInput, defaultInputToken } from '@/config/theme/Input';

const _InputNumberForm = ({ placeholder, name, label, isRequired, textRequire, onChange, initialValue, spanLabel, spanInput, formStyle, themeToken, themeComponents, ...rest }) => {
  let rules = [];

  if (isRequired) {
    rules = [{ required: true, message: textRequire || 'Required field cannot be left blank' }, ...rules];
  }

  return (
    <Form.Item
      name={name}
      rules={rules}
      style={formStyle}
      initialValue={initialValue}>
      <Row align="middle">
        {label && (
          <Col span={spanLabel}>
            <Space size="small">
              <p className="font-medium text-sm text-cs_gray">{label}</p>
              {isRequired && <p className="font-semibold text-sm text-cs_red"> * </p>}
            </Space>
          </Col>
        )}
        <Col span={spanInput}>
          <ConfigProvider theme={{ token: { ...defaultInputToken, ...themeToken }, components: { Input: { ...defaultInput, ...themeComponents } } }}>
            <InputNumberAnt
              {...rest}
              placeholder={placeholder}
              style={{ fontWeight: 500, width: '100%', ...rest.style }}
              onChange={onChange}
            />
          </ConfigProvider>
        </Col>
      </Row>
    </Form.Item>
  );
};

_InputNumberForm.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  customInput: PropTypes.string,
  customClass: PropTypes.string,
  name: PropTypes.string,
  isRequired: PropTypes.bool,
  helpText: PropTypes.string,
  textRequire: PropTypes.bool,
  onChange: PropTypes.func,
  initialValue: PropTypes.string,
  spanLabel: PropTypes.number,
  spanInput: PropTypes.number,
  formStyle: PropTypes.object,
  themeToken: PropTypes.object,
  themeComponents: PropTypes.object,
};

_InputNumberForm.defaultProps = {
  themeToken: {},
  themeComponents: {},
  spanLabel: 8,
  spanInput: 16,
  label: null,
};

const InputNumberForm = React.memo(_InputNumberForm);

export default InputNumberForm;
