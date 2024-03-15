import { memo } from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider, Modal as ModalAnt } from 'antd';
import Button from '@/component/common/Button/Button';
import { defaultModal } from '@/config/theme/Modal';
import IconQuestionMark from '@/component/common/Icon/IconQuestionMark';

const ModalConfirm = ({ isModalOpen, toggleModal, content, closeText, okText, handleCancel, handleOk }) => {
  return (
    <ConfigProvider theme={{ components: { Modal: defaultModal } }}>
      <ModalAnt
        open={isModalOpen}
        onCancel={() => toggleModal(false)}
        closable={false}
        footer={null}>
        <div className="flex flex-col justify-center items-center p-7 mt-2 border-dashed border-2">
          <IconQuestionMark />
          <p className="text-xl my-4 font-medium text-cs_gray">{content}</p>
          <div className="flex">
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
        </div>
      </ModalAnt>
    </ConfigProvider>
  );
};

ModalConfirm.propTypes = {
  isModalOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
  content: PropTypes.string,
  closeText: PropTypes.string,
  okText: PropTypes.string,
  handleCancel: PropTypes.func,
  handleOk: PropTypes.func,
};

ModalConfirm.defaultProps = {
  content: 'Xác Nhận',
  closeText: 'Đóng',
  okText: 'Lưu',
  isModalOpen: false,
  toggleModal: () => {},
};

export default memo(ModalConfirm);
