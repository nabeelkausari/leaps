import { fetchLink, fetchLinkAs } from "./helpers";

export const getUnViewedNotifications = profile =>
  fetchLinkAs(profile._links.notification);
export const getAllNotifications = profile =>
  fetchLinkAs(profile._links.all_notification);
export const getNotificationsCount = profile =>
  fetchLinkAs(profile._links.notification_count);
export const setViewed = markAsViewed => fetchLink(markAsViewed);

export const notification = {
  getUnViewedNotifications,
  getNotificationsCount,
  setViewed,
  getAllNotifications
};
