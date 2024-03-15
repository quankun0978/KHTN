import { notification } from 'antd';

const openNotificationWithIcon = function (type, title, description, confirmBtn, onClick) {
  const handleOnClickBtn = () => {
    onClick();
    notification.destroy();
  };

  return notification[type]({
    message: title,
    description: description,
    btn: confirmBtn ? <span onClick={handleOnClickBtn}>{confirmBtn}</span> : '',
  });
};

export const Notification = {
  success: function (title, description, confirmBtn, onClick) {
    openNotificationWithIcon('success', title, description, confirmBtn, onClick);
  },
  info: function (title, description, confirmBtn, onClick) {
    openNotificationWithIcon('info', title, description, confirmBtn, onClick);
  },
  warning: function (title, description, confirmBtn, onClick) {
    openNotificationWithIcon('warning', title, description, confirmBtn, onClick);
  },
  error: function (title, description, confirmBtn, onClick) {
    openNotificationWithIcon('error', title, description, confirmBtn, onClick);
  },
};
