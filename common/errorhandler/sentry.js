import * as Sentry from "@sentry/browser";

const env = process.env.REACT_APP_APP_URL;
const is_prod = process.env.NODE_ENV === "production";
const tenant = process.env.REACT_APP_TENANT;
const sentry_dns = {
  LEAPS:
    "https://9990874cfedd41dbabfad1f2a9a7c001@o379270.ingest.sentry.io/5223904",
  ATOMS:
    "https://d7bf28b31f46414491b24c965325bc2f@o379270.ingest.sentry.io/5224157"
};

const getEnvironment = env => {
  return env.split("/")[2].split(".")[0];
};

export class SentryApp {
  static init() {
    if (!is_prod && !!sentry_dns[tenant]) return;
    Sentry.init({
      dsn: sentry_dns[tenant],
      environment: getEnvironment(env),
      beforeSend(event) {
        // Modify the event here
        if (event.user) {
          // Don't send user's email address
          delete event.user.email;
        }
        return event;
      }
    });
  }

  static setUser(user_id) {
    Sentry.setUser({ user_id });
  }
}
