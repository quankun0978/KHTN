import React from 'react';
import PropTypes from 'prop-types';
import { Input as InputAnt, ConfigProvider } from 'antd';

import { defaultInput, defaultInputToken } from '@/config/theme/Input';

const _Input = ({ placeholder, size, value, onChange, ...rest }) => {
  return (
    <ConfigProvider theme={{ token: defaultInputToken, components: { Input: defaultInput } }}>
      <InputAnt
        {...rest}
        placeholder={placeholder}
        size={size}
        value={value}
        autoComplete="true"
        style={{ fontWeight: 500, ...rest.style }}
        onChange={onChange}
      />
    </ConfigProvider>
  );
};

_Input.propTypes = {
  placeholder: PropTypes.string,
  size: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

_Input.defaultProps = {
  size: 'large',
  value: '',
  onChange: () => {},
};

const Input = React.memo(_Input);

export default Input;
