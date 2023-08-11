import { notification } from "antd";
import React, { createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rootActions } from "../../../Redux/Root/rootActions";
import { rootSelector } from "../../../Redux/Root/rootSelector";

const NotificationContext = createContext(null);

export const useNotification = () => useContext(NotificationContext);

export const Notification = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();
  const notifyType = useSelector(rootSelector.Notification.Notification.type);
  const notifyMessage = useSelector(
    rootSelector.Notification.Notification.message
  );
  const handleClose = () => {
    dispatch(
      rootActions.notificationActions.storeNotification({
        type: "",
        message: null,
      })
    );
  };

  if (notifyType && notifyMessage) {
    api[notifyType]({
      description: notifyMessage,
      onClose: handleClose,
      placement: "top",
      style: {
        borderBottom:
          notifyType === "success"
            ? "5px solid #16FF00"
            : notifyType === "error"
            ? "5px solid red"
            : null,
        fontWeight: "bold",
      },
    });
  }

  return (
    <div>
      {contextHolder}
      {children}
    </div>
  );
};
