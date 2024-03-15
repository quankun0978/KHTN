import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker as DatePickerAnt, ConfigProvider } from 'antd';

import { formDatePicker, formDatePickerToken } from '@/config/theme/Input';
import IconCalendar from '@/component/common/Icon/IconCalendar';

function DatePicker({ label, name, picker, textRequire, ...rest }) {
  return (
    <ConfigProvider theme={{ token: formDatePickerToken, components: { DatePicker: formDatePicker } }}>
      <DatePickerAnt
        {...rest}
        picker={picker}
        format="DD/MM/YYYY"
        style={{ fontWeight: 500, width: '100%', ...rest.style }}
        suffixIcon={<IconCalendar />}
      />
    </ConfigProvider>
  );
}

DatePicker.propTypes = {
  label: PropTypes.string,
  picker: PropTypes.string,
  name: PropTypes.string,
  textRequire: PropTypes.bool,
};

DatePicker.defaultProps = {};

export default React.memo(DatePicker);
