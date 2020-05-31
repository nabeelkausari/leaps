import { connect } from "react-redux";
import {
  forgotPassword,
  login,
  resetPassword,
  register,
  resetRegister,
  verifyEmail,
  fetchCountryCodes,
  loginWithGoogle,
  loginWithLinkedIn,
  loginWithCaseId,
  registerWithCaseId
} from "../redux/actions";

export default connect(
  ({ auth }) => ({ ...auth }),
  {
    login,
    forgotPassword,
    resetPassword,
    register,
    resetRegister,
    verifyEmail,
    fetchCountryCodes,
    loginWithGoogle,
    loginWithLinkedIn
  }
);
