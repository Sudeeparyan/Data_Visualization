import { createSelector } from "reselect";

const NotificationState = (state) => state.Notify;

export const NotificationSelector = {
  Notification: {
    message: createSelector(
      [NotificationState],
      (notify) => notify.Notification.message
    ),
    type: createSelector(
      [NotificationState],
      (notify) => notify.Notification.type
    ),
  },
};
