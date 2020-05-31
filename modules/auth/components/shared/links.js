import { APP_URL } from "../../../../common/api/constants";
import { useRouter } from "next/router";

export const goToRegistration = () => {
  const router = useRouter();
  return router.push("/auth/registration");
}
export const goToLogin = () => {
  const router = useRouter();
  return router.push("/auth/login");
}

export const gmailLogin = () => {
  window.location.href =
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    "client_id=401056997324-7mt0tkaj9lgonnm9c9vascqgv0gjmgsv.apps.googleusercontent.com&" +
    `redirect_uri=${APP_URL}/login/social/callback?provider=google&` +
    "response_type=code&" +
    "scope=profile email";
};

export const linkedInLogin = () => {
  window.location.href =
    "https://www.linkedin.com/oauth/v2/authorization?" +
    "client_id=86frobdugiud6z&" +
    "response_type=code&" +
    "scope=r_liteprofile r_emailaddress&" +
    `redirect_uri=${APP_URL}/login/social/callback?provider=linkedin`;
};
