import React from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider, Modal as ModalAnt } from 'antd';
import Button from '@/component/common/Button/Button';
import { defaultModal } from '@/config/theme/Modal';
import IconWarning from '@/component/common/Icon/IconWarning';

import './Modal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

const _Modal = ({ title, isModalOpen, isWarningModal, hasConfirm, toggleModal, content, handleCancel, handleOk, children }) => {
  if (isWarningModal)
    return (
      <ConfigProvider theme={{ components: { Modal: defaultModal } }}>
        <ModalAnt
          title={
            <div className="flex justify-between items-center">
              <span>{title}</span>
              <FontAwesomeIcon
                onClick={() => toggleModal(false)}
                icon={faCircleXmark}
                className="text-2xl text-gray-500 hover:cursor-pointer"
              />
            </div>
          }
          open={isModalOpen}
          onOk={() => toggleModal(false)}
          okText="Xác nhận"
          cancelText="Đóng"
          onCancel={() => toggleModal(false)}
          closeIcon={false}
          footer={
            hasConfirm ? (
              [
                <Button
                  key="close"
                  className="w-24"
                  isDefault
                  onClick={handleCancel}
                  text="Đóng"
                />,
                <Button
                  key="confirm"
                  className="w-24"
                  onClick={handleOk}
                  text="Xác nhận"
                />,
              ]
            ) : (
              <Button
                key="close"
                className="w-24"
                onClick={handleCancel}
                text="Đóng"
              />
            )
          }>
          <div className="flex px-9 pt-6 mt-2 mb-12 border-dashed border-t-2">
            <IconWarning />
            <p className="ml-7 text-xl font-medium text-cs_gray">{content}</p>
          </div>
        </ModalAnt>
      </ConfigProvider>
    );

  return (
    <ConfigProvider theme={{ components: { Modal: defaultModal } }}>
      <ModalAnt
        title={title}
        open={isModalOpen}
        onCancel={() => toggleModal(false)}
        footer={null}>
        {children}
      </ModalAnt>
    </ConfigProvider>
  );
};

_Modal.propTypes = {
  title: PropTypes.string,
  isModalOpen: PropTypes.bool,
  isWarningModal: PropTypes.bool,
  hasConfirm: PropTypes.bool,
  toggleModal: PropTypes.func,
  content: PropTypes.string,
  handleCancel: PropTypes.func,
  handleOk: PropTypes.func,
  children: PropTypes.element,
};

_Modal.defaultProps = {
  title: '',
  isModalOpen: false,
  isWarningModal: false,
  hasConfirm: false,
  toggleModal: () => {},
};

const Modal = React.memo(_Modal);

export default Modal;
