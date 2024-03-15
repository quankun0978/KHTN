import { ConfigProvider, Select as SelectAnt } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { defaultSelect, defaultSelectToken } from '@/config/theme/Select';
import './Select.scss';

const IconDropdown = () => {
  return (
    <svg
      width="16"
      height="11"
      viewBox="0 0 16 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.98486 9.74365L0.344238 3.10303C-0.114746 2.64404 -0.114746 1.90186 0.344238 1.44775L1.44775 0.344238C1.90674 -0.114746 2.64893 -0.114746 3.10303 0.344238L7.81006 5.05127L12.5171 0.344238C12.9761 -0.114746 13.7183 -0.114746 14.1724 0.344238L15.2759 1.44775C15.7349 1.90674 15.7349 2.64893 15.2759 3.10303L8.63525 9.74365C8.18604 10.2026 7.44385 10.2026 6.98486 9.74365Z"
        fill="#94A3B8"
      />
    </svg>
  );
};

const _Select = ({ placeholder, list, showSearch, handleChange, initialValue, disabled, loading, onSelect, dropdownStyle, mode, size }) => {
  return (
    <ConfigProvider
      theme={{
        token: defaultSelectToken,
        components: {
          Input: defaultSelect,
        },
      }}>
      <SelectAnt
        style={{ width: '100%' }}
        size={size}
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
        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        mode={mode}
        options={list}
      />
    </ConfigProvider>
  );
};

_Select.propTypes = {
  placeholder: PropTypes.string,
  list: PropTypes.array,
  name: PropTypes.string,
  isRequired: PropTypes.bool,
  showSearch: PropTypes.bool,
  handleChange: PropTypes.func,
  // initialValue: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onSelect: PropTypes.func,
  dropdownStyle: PropTypes.object,
  itemStyle: PropTypes.object,
  mode: PropTypes.string,
  size: PropTypes.string,
};

_Select.defaultProps = {
  list: [],
  showSearch: true,
  loading: false,
  size: 'large',
  onSelect: () => {},
};

const Select = React.memo(_Select);

export default Select;
