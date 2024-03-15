import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import { Button as ButtonAnt, ConfigProvider } from 'antd';
import { defaultButton, primaryButton } from '@/config/theme/Button';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
const IconDownload = lazy(() => import('../Icon/IconDownload'));
const IconUpload = lazy(() => import('../Icon/IconUpload'));
const IconFilter = lazy(() => import('../Icon/IconFilter'));

const _Button = ({ text, onClick, isDefault, isDownload, isUpload, isSearch, isAdd, isFilter, ...props }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: isDefault ? defaultButton : primaryButton,
        },
      }}>
      <ButtonAnt
        onClick={onClick}
        icon={isSearch ? <SearchOutlined /> : isAdd ? <PlusOutlined /> : isDownload ? <IconDownload /> : isUpload ? <IconUpload /> : isFilter ? <IconFilter /> : null}
        {...props}>
        {text}
      </ButtonAnt>
    </ConfigProvider>
  );
};

_Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  isDefault: PropTypes.bool,
  isDownload: PropTypes.bool,
  isUpload: PropTypes.bool,
  isSearch: PropTypes.bool,
  isAdd: PropTypes.bool,
  isFilter: PropTypes.bool,
};

_Button.defaultProps = {
  text: '',
  onClick: () => {},
  isDefault: false,
  isDownload: false,
  isUpload: false,
  isSearch: false,
  isAdd: false,
  isFilter: false,
};

const Button = React.memo(_Button);

export default Button;
