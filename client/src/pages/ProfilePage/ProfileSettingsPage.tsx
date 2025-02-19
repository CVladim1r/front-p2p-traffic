import ProfileTop from "./Profile";
import { useAppSelector } from "../../app/providers/store";
import { BackButton } from "../../shared/ui";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../app/providers/router";

export default function ProfileSettings() {
  const userData = useAppSelector(state => state.user.data)
  const navigate = useNavigate()

  return (
    <div className="profile container">
      <ProfileTop username={userData?.username ?? "none"}/>
        <div className="profile-settings">
          <BackButton className="profile-settings-backButton" onClick={() => navigate(RoutePaths.profile)} />

          <div className="profile-settings-block">
            <p className="profile-settings-header">Premium</p>
            <div className="profile-settings-group">
              <button onClick={() => console.log("click")} className="profile-settings-row">
                <p className="profile-settings-key">Подписка Premium</p>
                <p className="profile-settings-value">{userData?.is_vip ? "Активно" : "Не активно"}</p>
              </button>
            </div>
          </div>
        
          <div className="profile-settings-block">
            <p className="profile-settings-header">Настройки</p>
            <div className="profile-settings-group">
              <button className="profile-settings-row">
                <p className="profile-settings-key non-active">Язык</p>
                <p className="profile-settings-value non-active">Русский</p>
              </button>
              <div className="profile-settings-row">
                <p className="profile-settings-key">Уведомления</p>
                <input type="checkbox" name="notifications" className="profile-settings-checkbox" />
              </div>
            </div>
          </div>
          
          <a href="#!rules" className="profile-settings-group profile-settings-row">
            <p className="profile-settings-rules">Правила пользования платформой</p>
          </a>
        </div>
    </div>
  )
}