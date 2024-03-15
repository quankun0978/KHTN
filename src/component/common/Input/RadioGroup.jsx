import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Radio as RadioAnt, ConfigProvider, Form, Space, Row, Col } from 'antd';

import { defaultInput, defaultInputToken, formInput, formInputToken } from '@/config/theme/Input';

const RadioGroup = ({ placeholder, name, label, listRadio, isRequired, textRequire, onChange, initialValue, spanLabel, spanInput, formStyle, themeToken, themeComponents, ...rest }) => {
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
          {/* <ConfigProvider theme={{ token: { ...defaultInputToken, ...themeToken }, components: { Input: { ...defaultInput, ...themeComponents } } }}> */}
          <RadioAnt.Group>
            {listRadio.map((el) => {
              return <RadioAnt value={el.value}>{el.text}</RadioAnt>;
            })}
          </RadioAnt.Group>
          {/* </ConfigProvider> */}
        </Col>
      </Row>
    </Form.Item>
  );
};

RadioGroup.propTypes = {
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
  listRadio: PropTypes.array,
};

RadioGroup.defaultProps = {
  themeToken: {},
  themeComponents: {},
  spanLabel: 12,
  spanInput: 12,
  label: null,
  listRadio: [],
};

export default React.memo(RadioGroup);
