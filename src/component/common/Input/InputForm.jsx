import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input as InputAnt, ConfigProvider, Form, Space, Row, Col } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { defaultInput, defaultInputToken } from '@/config/theme/Input';
import { REGEX_ALPHABET_LESS_THAN_11, REGEX_EMAIL, REGEX_PHONE_NUMBER } from '@/constants/HelperConstants';

const { TextArea } = InputAnt;

const _InputForm = ({ placeholder, name, label, isRequired, isPhoneNumber, isTextArea, textRequire, isEmail, isPassword, isAlphabetLessThan11, onChange, initialValue, spanLabel, spanInput, formStyle, themeToken, themeComponents, ...rest }) => {
  let rules = [];
  const [visible, setVisible] = useState(true);

  if (isRequired) {
    rules = [{ required: true, message: textRequire || 'Required field cannot be left blank' }, ...rules];
  }

  if (isPhoneNumber) {
    rules = [{ pattern: REGEX_PHONE_NUMBER, message: 'Phone number is not in the correct format' }, ...rules];
  }

  if (isEmail) {
    rules = [{ pattern: REGEX_EMAIL, message: 'Email invalidate' }, ...rules];
  }

  if (isAlphabetLessThan11) {
    rules = [{ pattern: REGEX_ALPHABET_LESS_THAN_11, message: 'Please use alphabets within 10 characters' }, ...rules];
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
            {isTextArea ? (
              <TextArea
                {...rest}
                placeholder={placeholder}
                autoComplete="true"
                style={{ fontWeight: 500, ...rest.style }}
                type={isPassword && visible ? 'password' : 'text'}
                onChange={onChange}
              />
            ) : (
              <InputAnt
                {...rest}
                placeholder={placeholder}
                autoComplete="true"
                style={{ fontWeight: 500, ...rest.style }}
                type={isPassword && visible ? 'password' : 'text'}
                onChange={onChange}
              />
            )}
          </ConfigProvider>
        </Col>
      </Row>
      {isPassword && (
        <div className="absolute inset-y-0 right-4 pr-3 flex items-center text-sm leading-5">
          <FontAwesomeIcon
            icon={visible ? faEye : faEyeSlash}
            className="text-2xl"
            onClick={() => setVisible(!visible)}
          />
        </div>
      )}
    </Form.Item>
  );
};

_InputForm.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  customInput: PropTypes.string,
  customClass: PropTypes.string,
  name: PropTypes.string,
  isRequired: PropTypes.bool,
  helpText: PropTypes.string,
  isPhoneNumber: PropTypes.bool,
  isTextArea: PropTypes.bool,
  textRequire: PropTypes.bool,
  isEmail: PropTypes.bool,
  isPassword: PropTypes.bool,
  isAlphabetLessThan11: PropTypes.bool,
  onChange: PropTypes.func,
  initialValue: PropTypes.string,
  spanLabel: PropTypes.number,
  spanInput: PropTypes.number,
  formStyle: PropTypes.object,
  themeToken: PropTypes.object,
  themeComponents: PropTypes.object,
};

_InputForm.defaultProps = {
  themeToken: {},
  themeComponents: {},
  spanLabel: 8,
  spanInput: 16,
  label: null,
  isTextArea: false,
};

const InputForm = React.memo(_InputForm);

export default InputForm;
