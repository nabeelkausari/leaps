import * as React from "react";

export const UsersListSkeleton = props => {
  return (
    <div className="user-list-skeleton">
      {[0, 1, 2, 3, 4, 5].map(u => (
        <div className="user-list-skeleton__user" key={u}>
          <div className="user-list-skeleton__user--image"></div>
          <span className="user-list-skeleton__user--name"></span>
        </div>
      ))}
    </div>
  );
};
