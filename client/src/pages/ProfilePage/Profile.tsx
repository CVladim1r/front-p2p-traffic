import { PropsWithChildren } from "react";
import { user } from "../../telegram"

export default function Profile({children}: PropsWithChildren) {
    return (
      <div className="profile container">
        <div className="profile-top">
          <img src={user?.photo_url} alt="" className="profile-image"/>
          <p className="profile-name">@{user.username}</p>
        </div>
        {children}
      </div>
    )
  }