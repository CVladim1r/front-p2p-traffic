import { Link } from "react-router-dom"
import { useState } from "react"
import settingsLogo from "../../shared/assets/svg/settings.svg"
import deals from "../../shared/assets/svg/profile_deals.svg"
import profit from "../../shared/assets/svg/profile_profit.svg"
import rating from "../../shared/assets/svg/profile_rating.svg"
import gacha from "../../shared/assets/svg/gacha.svg"
import Profile from "./Profile"
import { UsersService } from "../../shared/api"
import { useSelector } from "react-redux"
import { StateSchema } from "../../app/providers/store"
import "./ProfilePage.css"

export default function ProfilePage() {
  const [showGacha, setShowGacha] = useState(false)
  const { authorization } = useSelector((state: StateSchema) => state.user) //TODO: fix after auth still has old value: ""
  
  async function getUserData() {
    try {
      const response = await UsersService.getUserMainDataApiV1P2PUserMainDataGet(authorization)
      console.log(response)
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  }

  return (
    <Profile>
      <Link to={{pathname: "settings"}} className="profile-top-settings">
        <img src={settingsLogo} alt=""/>
      </Link>

      <button onClick={() => setShowGacha(!showGacha)} className="profile-top-gacha">Колесо</button>
      <button onClick={getUserData} className="profile-top-get-data">Получить данные</button>
      
      <div className="profile-body">
        <div className="profile-body-vip">
          <p className="profile-body-vip-text">VIP - статус</p>
          <p className="profile-body-vip-status">Active</p>
        </div>
        
        <div className="profile-body-money">
          <button className="profile-body-money-text">$17 246.27</button>
          <button className="profile-body-money-add">Пополнить</button>
          <button onClick={e => e.currentTarget.classList.toggle("active")} className="profile-body-money-remove">Вывести</button>
        </div>
        
        <div className="profile-body-info">
          <div className="profile-body-info-elem">
            <img src={deals} alt="" />
            <p>234</p>
          </div>
          <div className="profile-body-info-elem">
            <img src={profit} alt="" />
            <p>$11.031</p>
          </div>
          <div className="profile-body-info-elem">
            <img src={rating} alt="" />
            <p>4.99</p>
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