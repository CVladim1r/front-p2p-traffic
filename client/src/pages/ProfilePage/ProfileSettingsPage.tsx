import Profile from "./Profile";
import arrow_info from "../../shared/assets/svg/arrow_info.svg"
import { useSelector } from "react-redux";
import { StateSchema } from "../../app/providers/store";

export default function ProfileSettngs() {
  const userData = useSelector((state: StateSchema) => state.user.data)

  return (
    <Profile username={userData?.username ?? "none"}>
      <div className="profile-settings">
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
              <p className="profile-settings-key">Адрес кошелька</p>
              <p className="profile-settings-value">UQAj..Wal</p>
            </button>
            <button className="profile-settings-row">
              <p className="profile-settings-key non-active">Язык</p>
              <p className="profile-settings-value non-active">Русский</p>
            </button>
          </div>
          <div className="profile-settings-group">
            <div className="profile-settings-row">
              <p className="profile-settings-key">Уведомления</p>
              <input type="checkbox" name="notifications" className="profile-settings-checkbox" />
            </div>
          </div>
        </div>
        
        <div className="profile-settings-block">
          <p className="profile-settings-header">Информация</p>
          <div className="profile-settings-group">
            <button className="profile-settings-row">
              <p className="profile-settings-key">FAQ платформы</p>
              <img src={arrow_info} alt="" />
            </button>
            <button className="profile-settings-row">
              <p className="profile-settings-key">Канал платформы</p>
              <img src={arrow_info} alt="" />
            </button>
            <button className="profile-settings-row">
              <p className="profile-settings-key">Поддержка</p>
              <img src={arrow_info} alt="" />
            </button>
          </div>
        </div>
        
        <a href="#!rules" className="profile-settings-group profile-settings-row">
          <p className="profile-settings-rules">Правила пользования платформой</p>
        </a>
      </div>
    </Profile>
  )
}