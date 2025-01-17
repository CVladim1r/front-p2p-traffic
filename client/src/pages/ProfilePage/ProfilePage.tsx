import { Link } from "react-router-dom"
import { useState } from "react"
import settingsLogo from "../../shared/assets/svg/settings.svg"
import dealsImg from "../../shared/assets/svg/profile_deals.svg"
import profitImg from "../../shared/assets/svg/profile_profit.svg"
import ratingImg from "../../shared/assets/svg/profile_rating.svg"
import gacha from "../../shared/assets/svg/gacha.svg"
import Profile from "./Profile"
import { useSelector } from "react-redux"
import { StateSchema } from "../../app/providers/store"

export default function ProfilePage() {
  const [showGacha, setShowGacha] = useState(false)

  const userData = useSelector((state: StateSchema) => state.user.data)

  return (
    <Profile username={userData?.username ?? "none"} topChildren={
      <>
        <Link to={{pathname: "settings"}} className="profile-top-settings">
          <img src={settingsLogo} alt=""/>
        </Link>

        <button onClick={() => setShowGacha(!showGacha)} className="profile-top-gacha">Колесо</button>
      </>}
    >
      
      <div className="profile-body">
        <div className="profile-body-vip">
          <p className="profile-body-vip-text">VIP - статус</p>
          <p className="profile-body-vip-status">{userData?.is_vip ? "Active" : "Not active"}</p>
        </div>
        
        <div className="profile-body-money">
          <button className="profile-body-money-text">{userData?.balance ?? "none"}</button>
          <button className="profile-body-money-add">Пополнить</button>
          <button onClick={e => e.currentTarget.classList.toggle("active")} className="profile-body-money-remove">Вывести</button>
        </div>
        
        <div className="profile-body-info">
          <div className="profile-body-info-elem">
            <img src={dealsImg} alt="" />
            <p>{/*userData?.deals ??*/ "none"}</p>
          </div>
          <div className="profile-body-info-elem">
            <img src={profitImg} alt="" />
            <p>{userData?.total_sales ?? "none"}</p>
          </div>
          <div className="profile-body-info-elem">
            <img src={ratingImg} alt="" />
            <p>{userData?.rating ?? "none"}</p>
          </div>
        </div>
        
        {showGacha &&
          <div className="profile-body-gacha">
            <img src={gacha} alt="" className="profile-body-gacha-image"/>
            <button className="profile-body-gacha-button">Крутить</button>
          </div>}
          
      </div>
    </Profile>
  )
}