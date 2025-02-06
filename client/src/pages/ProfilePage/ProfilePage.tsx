import { Link } from "react-router-dom"
import dealsImg from "../../shared/assets/svg/profile_deals.svg"
import profitImg from "../../shared/assets/svg/profile_profit.svg"
import ratingImg from "../../shared/assets/svg/profile_rating.svg"
import gacha from "../../shared/assets/svg/gacha_noshadow.svg"
import Profile from "./Profile"
import { RoutePaths } from "../../app/providers/router"
import { Button } from "../../shared/ui"
import { useState } from "react"
import { formatNumberTo3 } from "../../shared/lib/lib"
import { useAppSelector } from "../../app/providers/store"
import { useAdsgram } from "../../shared/lib/hooks"

export default function ProfilePage() {
  // const [showGacha, setShowGacha] = useState(false)

  const userData = useAppSelector(state => state.user.data)
  const [spin, setSpin] = useState(false)

  const showAd = useAdsgram({
    blockId: "7693", 
    onError(result) {
      console.log(`error: ${result.description}`);
    },
    onReward() {
      setSpin(true)
    },
  })

  return (
    <Profile username={userData?.username ?? "none"}
    // topChildren={
    //   <>
    //     {/* <Link to={{pathname: RoutePaths.profileSettings}} className="profile-top-settings">
    //       <img src={settingsLogo} alt=""/>
    //     </Link>

    //     <button onClick={() => setShowGacha(!showGacha)} className="profile-top-gacha">Колесо</button> */}
    //   </>}
    >
      
      <div className="profile-body">
        <div className="profile-body-vip">
          <p className="profile-body-vip-text">VIP - статус</p>
          <p className="profile-body-vip-status">{userData?.is_vip ? "Активно" : "Не активно"}</p>
        </div>
        
        <div className="profile-body-money">
          <button className={userData?.balance && userData.balance["TON"] ? "profile-body-money-text" : "profile-body-money-text null"}>{userData?.balance && userData.balance["TON"] ? formatNumberTo3(userData.balance["TON"]) + " TON" : "0"}</button>
          <Link
            to={{pathname: RoutePaths.moneyAdd}}
            className="profile-body-money-add"
          >
            Пополнить
          </Link>
          <Link
            to={{pathname: RoutePaths.moneyRemove}}
            className={
              // userData?.balance != 0 ?
              // userData?.balance != -1 ?
                "profile-body-money-remove active" 
                // :
                // "profile-body-money-remove"
            }
          >
            Вывести
          </Link>
        </div>
        
        <div className="profile-body-info">
          <div className="profile-body-info-elem">
            <img src={dealsImg} alt="" />
            <p>{userData?.deals}</p>
          </div>
          <div className="profile-body-info-elem">
            <img src={profitImg} alt="" />
            <p>${userData?.total_sales ?? "none"}</p>
          </div>
          <div className="profile-body-info-elem">
            <img src={ratingImg} alt="" />
            <p>{userData?.rating ?? "none"}</p>
          </div>
        </div>
        
         
        <div onClick={() => setSpin(false)} className={spin ? "profile-body-gacha-dark-overlay active" : "profile-body-gacha-dark-overlay"}></div>
        <img src={gacha} alt="" className= {spin ? "profile-body-gacha-image spin" : "profile-body-gacha-image"}/>
        <Button onClick={() => showAd()} className="profile-body-gacha-button">Крутить</Button>
          
      </div>
    </Profile>
  )
}