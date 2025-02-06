import { ReactNode } from "react";
import "./Profile.css"
import { useAppSelector } from "../../app/providers/store";

type ProfileProps = {
  children: ReactNode,
  topChildren?: ReactNode,
  username: string
}

export default function Profile({username, children, topChildren}: ProfileProps) {
  const photo = useAppSelector(s => s.user.data?.profile_photo)  
  
  return (
    <div className="profile container">
      <div className="profile-top">
        <img src={photo ?? ""} alt="" className="profile-image"/>
        <p className="profile-name">@{username}</p>

        {topChildren}
      </div>
      {children}
    </div>
  )
  }