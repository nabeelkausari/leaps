import React, { useEffect, useState } from "react";
import queryString from "query-string";

import AuthModal from "./AuthModal";

export const AuthModalWrapper = ({ history }) => {
  const [show_auth_modal, toggleAuthModal] = useState(false);

  const query = queryString.parse(history.location.search);
  const show_register = query.register === "true";
  useEffect(() => {
    if (query.auth_modal === "true") {
      toggleAuthModal(true);
    }
  }, []);
  return (
    <AuthModal
      showRegister={show_register}
      openModal={show_auth_modal}
      hideTrigger={true}
      onCloseCallback={() => toggleAuthModal(false)}
    />
  );
};
