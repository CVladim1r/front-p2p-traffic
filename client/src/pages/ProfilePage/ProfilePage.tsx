import { Link } from "react-router-dom"
import dealsImg from "../../shared/assets/svg/profile_deals.svg"
import profitImg from "../../shared/assets/svg/profile_profit.svg"
import ratingImg from "../../shared/assets/svg/profile_rating.svg"
import gacha from "../../shared/assets/svg/gacha_noshadow.svg"
import closeImg from "../../shared/assets/svg/close.svg"
import Profile from "./Profile"
import { RoutePaths } from "../../app/providers/router"
import { Button, Select } from "../../shared/ui"
import { useState } from "react"
import { formatNumberTo3 } from "../../shared/lib/lib"
import { useAppSelector } from "../../app/providers/store"
import { useAdsgram } from "../../shared/lib/hooks"
import { useMutation } from "@tanstack/react-query"
import { TransactionCurrencyType, UsersService } from "../../shared/api"
import { selectAuthorization } from "../../entities/User"

export default function ProfilePage() {
  // const [showGacha, setShowGacha] = useState(false)

  const userData = useAppSelector(state => state.user.data)
  const additional = useAppSelector(s => s.additional)

  const [spin, setSpin] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [currencyType, setCurrencyType] = useState(additional.currencyTypes[0])

  const showAd = useAdsgram({
    blockId: "8165",
    debug: true,
    onError(result) {
      console.log(`error: ${result.description}`);
    },
    onReward: async () => {
      const slep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
      await slep(1000) // loading
      setSpin(true)

      
    },
  })


  function VipDialog() {
    const additional = useAppSelector(s => s.additional)
    const authorization = useAppSelector(selectAuthorization)

    const [currencySelect, setCurrencySelect] = useState(false)
    const [currency, setCurrency] = useState(additional.currencyTypes[0])

    const {mutate} = useMutation({
      mutationFn: async () => {
        await UsersService.updateUserVipApiV1P2PUserUpdateUserVipPost(authorization, currency as TransactionCurrencyType)
        setShowModal(false)
      }
    })

    return (
      <>
        <div onClick={() => setShowModal(false)} className={showModal ? "profile-vipDialog-overlay active" : "profile-vipDialog-overlay"}></div>

        <div className={showModal ? "vipDialog active" : "vipDialog"}>
          <div className="vipDialog-main">

            <div className="vipDialog-top">
              <p className="vipDialog-top-header">VIP статус:</p>
              <Button className="vipDialog-close" onClick={() => setShowModal(false)}>
                <img src={closeImg} alt="" className="vipDialog-close-icon" />
              </Button>
            </div>
            
            <p className="vipDialog-status">{userData?.is_vip ? "Активно" : "Не активно"}</p>

            <div className="vipDialog-body">
              {currencySelect ?
                <div className="vipDialog-body-row">
                  <p className="vipDialog-body-header">Выберите валюту для оплаты: </p>
                  <Select className="vipDialog-body-currency" onChange={val => setCurrency(val)} defaultValue={currency} optionsData={
                    additional.currencyTypes.map(val => ({value: val}))
                  } />
                </div>
                :
                  <>
                    <p className="vipDialog-body-header">Для vip-продавцов становятся доступны:</p>
                    <ol className="vipDialog-body-list">
                      <li>Мгновенный вывод средств.</li>
                      <li>Сниженные комиссии.</li>
                      <li>Специальная отметка профиля.</li>
                      <li>Приоритетные объявления.</li>
                    </ol>
                  </>
              }
            </div>

          </div>
          
          {currencySelect ?
            <Button className="vipDialog-button" onClick={() => mutate()}>Оплатить</Button>
          :
            <Button className="vipDialog-button" disabled={userData?.is_vip} onClick={() => setCurrencySelect(true)}>Оформить</Button>
          }
        </div>
      </>
    )
  }

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
        <Button className="profile-body-vip" onClick={() => setShowModal(true)}>
          <p className="profile-body-vip-text">VIP - статус</p>
          <p className="profile-body-vip-status">{userData?.is_vip ? "Активно" : "Не активно"}</p>
        </Button>
        
        <div className="profile-body-money">
          <Select
            className={userData?.balance ? "profile-body-money-text" : "profile-body-money-text null"}
            classNameContainer="profile-body-money-text-container"
            onChange={val => setCurrencyType(val)}
            defaultValue={currencyType}
            manualWidth={true}
            filterChosen={true}
            optionsData={
              additional.currencyTypes.map(val => (
                {
                  value: val,
                  text: (userData?.balance && userData.balance[val] ? formatNumberTo3(userData.balance[val]) : "0.000") + " " + val 
                }
              ))
            }
          />
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
            <p>{userData?.rating.toFixed(2) ?? "none"}</p>
          </div>
        </div>
        
         
        <div onClick={() => setSpin(false)} className={spin ? "profile-body-gacha-dark-overlay active" : "profile-body-gacha-dark-overlay"}></div>
        <img src={gacha} alt="" className= {spin ? "profile-body-gacha-image spin" : "profile-body-gacha-image"}/>
        <Button onClick={() => showAd()} className="profile-body-gacha-button">Крутить</Button>
          
        <VipDialog />
      </div>
    </Profile>
  )
}