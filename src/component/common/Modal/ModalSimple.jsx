import { memo } from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider, Modal as ModalAnt } from 'antd';

import { defaultModal } from '@/config/theme/Modal';
import Button from '@/component/common/Button/Button';

const ModalSimple = ({ isModalOpen, toggleModal, title, content, hasActionButton, closeText, okText, handleCancel, handleOk, ...rest }) => {
  return (
    <ConfigProvider theme={{ components: { Modal: defaultModal } }}>
      <ModalAnt
        {...rest}
        open={isModalOpen}
        onCancel={() => toggleModal(false)}
        closable={false}
        footer={null}>
        <div className="flex flex-col ">
          {title && <p className="text-xl mb-4 font-medium text-cs_gray">{title}</p>}
          {content}
          {hasActionButton && (
            <div className="flex justify-end mt-4">
              <Button
                key="close"
                className="w-24 mr-4"
                isDefault
                onClick={handleCancel}
                text={closeText}
              />
              <Button
                key="confirm"
                className="w-24"
                onClick={handleOk}
                text={okText}
              />
            </div>
          )}
        </div>
      </ModalAnt>
    </ConfigProvider>
  );
};

ModalSimple.propTypes = {
  isModalOpen: PropTypes.bool,
  hasActionButton: PropTypes.bool,
  title: PropTypes.string,
  closeText: PropTypes.string,
  okText: PropTypes.string,
  content: PropTypes.node,
  toggleModal: PropTypes.func,
  handleCancel: PropTypes.func,
  handleOk: PropTypes.func,
};

ModalSimple.defaultProps = {
  title: null,
  closeText: 'Hủy',
  okText: 'Lưu',
  isModalOpen: false,
  hasActionButton: true,
  content: null,
  toggleModal: () => {},
};

export default memo(ModalSimple);
