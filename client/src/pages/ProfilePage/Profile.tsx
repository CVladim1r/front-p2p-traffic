import { ReactNode } from "react";
import { user } from "../../telegram"
import "./Profile.css"

type ProfileProps = {
  children: ReactNode,
  topChildren?: ReactNode,
  username: string
}

export default function Profile({username, children, topChildren}: ProfileProps) {
    return (
      <div className="profile container">
        <div className="profile-top">
          <img src={user?.photo_url} alt="" className="profile-image"/> {/* change user -> window.Telegram.WebApp.initDataUnsafe.user */}
          <p className="profile-name">@{username}</p>

          {topChildren}
        </div>
        {children}
      </div>
    )
  }