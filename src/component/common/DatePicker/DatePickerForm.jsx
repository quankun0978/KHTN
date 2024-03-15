import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker as DatePickerAnt, ConfigProvider, Form, Space, Row, Col } from 'antd';

import { formDatePicker, formDatePickerToken } from '@/config/theme/Input';
import IconCalendar from '@/component/common/Icon/IconCalendar';

const _DatePicker = ({ label, name, format, isRequired, spanLabel, spanInput, themeToken, themeComponents, textRequire, ...rest }) => {
  let rules = [];

  if (isRequired) {
    rules = [{ required: true, message: textRequire || 'Required field cannot be left blank' }, ...rules];
  }

  return (
    <Row
      align="middle"
      style={{ marginBottom: 24 }}>
      {label && (
        <Col span={spanLabel}>
          <Space size="small">
            <p className="font-medium text-sm text-cs_gray">{label}</p>
            {isRequired && <p className="font-semibold text-sm text-cs_red"> * </p>}
          </Space>
        </Col>
      )}
      <Col span={spanInput}>
        <ConfigProvider
          theme={{
            token: { ...formDatePickerToken, ...themeToken },
            components: { DatePicker: { ...formDatePicker, ...themeComponents } },
          }}>
          <Form.Item
            name={name}
            rules={rules}
            style={{ marginBottom: 0 }}>
            <DatePickerAnt
              {...rest}
              format={format}
              style={{ fontWeight: 500, width: '100%', ...rest.style }}
              suffixIcon={<IconCalendar />}
            />
          </Form.Item>
        </ConfigProvider>
      </Col>
    </Row>
  );
};

_DatePicker.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  format: PropTypes.string,
  spanLabel: PropTypes.number,
  spanInput: PropTypes.number,
  isRequired: PropTypes.bool,
  textRequire: PropTypes.bool,
  themeToken: PropTypes.object,
  themeComponents: PropTypes.object,
};

_DatePicker.defaultProps = { format: 'DD/MM/YYYY', spanLabel: 8, spanInput: 16, themeToken: {}, themeComponents: {} };

const DatePickerForm = React.memo(_DatePicker);

export default DatePickerForm;
