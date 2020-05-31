import * as React from "react";
import { toast } from "react-toastify";

// import { success_icon, error_icon, warning_icon, info_icon } from "../images";

const toast_config = {
  draggable: true,
  hideProgressBar: true,
  newestOnTop: true,
  position: toast.POSITION.BOTTOM_LEFT
};

// const getIcon = type => {
//   switch (type) {
//     case "success":
//       return success_icon;
//     case "error":
//       return error_icon;
//     case "warning":
//       return warning_icon;
//     default:
//       return info_icon;
//   }
// };

const NotificationTemplate = props => {
  const { title, message, type } = props;
  return (
    <div className="ath-notifier">
      <div className="ath-notifier__type">
        {/*<img src={getIcon(type)} alt="notify" />*/}
      </div>
      <div className="ath-notifier__content">
        <h5 className={`ath-notifier__title ath-notifier__title-${type}`}>
          {title}
        </h5>
        {message && <p className="ath-notifier__sub">{message}</p>}
      </div>
    </div>
  );
};

const notifier = (title, message, type) => {
  toast(<NotificationTemplate type={type} title={title} message={message} />, {
    ...toast_config,
    type: type
  });
};

export const notify = {
  success: (title, message) => notifier(title, message, "success"),
  error: (title, message) => notifier(title, message, "error"),
  warning: (title, message) => notifier(title, message, "warning"),
  info: (title, message) => notifier(title, message, "info")
};
