import { Link } from "react-router-dom"
import dealsImg from "../../shared/assets/svg/profile_deals.svg"
import profitImg from "../../shared/assets/svg/profile_profit.svg"
import ratingImg from "../../shared/assets/svg/profile_rating.svg"
import settingsLogo from "../../shared/assets/svg/settings.svg"
import gachaFull from "../../shared/assets/svg/gacha_new.svg"
import gachaBlank from "../../shared/assets/svg/gacha_new-blank.svg"
import gachaArrow from "../../shared/assets/svg/arrow_gacha.svg"
import closeImg from "../../shared/assets/svg/close.svg"
import Profile from "./Profile"
import { RoutePaths } from "../../app/providers/router"
import { Button, Select } from "../../shared/ui"
import { useEffect, useRef, useState } from "react"
import { formatNumberTo3, numberToTime } from "../../shared/lib/lib"
import { useAppSelector } from "../../app/providers/store"
import { useAdsgram } from "../../shared/lib/hooks"
import { useMutation } from "@tanstack/react-query"
import { AdsgramService, TransactionCurrencyType, UsersService } from "../../shared/api"
import { selectAuthorization, userActions } from "../../entities/User"
import { user } from "../.."
import { useDispatch } from "react-redux"

enum ModalState {
   notVisible,
   main,
   setCurrency
}

export default function ProfilePage() {
  // const [showGacha, setShowGacha] = useState(false)
  const dispatch = useDispatch()

  const spinTimeout = 24 * 60 * 60 * 1000

  const authorization = useAppSelector(selectAuthorization)
  const userData = useAppSelector(state => state.user.data)
  const additional = useAppSelector(s => s.additional)

  const [spin, setSpin] = useState(false)
  const [modalState, setModalState] = useState(ModalState.notVisible)
  const [currencyType, setCurrencyType] = useState(additional.currencyTypes[0])

  const gachaRef = useRef<HTMLImageElement>(null)
  const newAnimationDataRef = useRef<{animation: string, duration: number}>({animation: "", duration: 0})
  const spinEndRef = useRef(true)

  const showAd = useAdsgram({
    blockId: "8165",
    debug: false,
    onError(result) {
      console.log(`error: ${result.description}`);
    },
    onReward: async () => {
      if (!user)
        throw new Error("no user data")
      
      setSpin(true)
      const response = await AdsgramService.spinRouletteApiV1P2PAdsgramSpinRouletteGet(user.id)
      console.log(response);
      
      const slep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
      await slep(2500) // loading

      switch (response.prize_type) {
        case "10%_discount":
          newAnimationDataRef.current = {
            animation: "spin_end_10 3s cubic-bezier(0.33, 1, 0.68, 1) forwards",
            duration: 3200
          }
          break;
        case "5%_discount":
          newAnimationDataRef.current = {
            animation: "spin_end_5 1.5s cubic-bezier(0.33, 1, 0.68, 1) forwards",
            duration: 1500
          }
          break;
        case "3%_deposit":
          newAnimationDataRef.current = {
            animation: "spin_end_3 2.3s cubic-bezier(0.33, 1, 0.68, 1) forwards",
            duration: 2300
          }  
          break;
        case "lower_commission_20%":
          newAnimationDataRef.current = {
            animation: "spin_end_20 3.8s cubic-bezier(0.33, 1, 0.68, 1) forwards",
            duration: 3800
          }    
          break;
      
        default:
          newAnimationDataRef.current = {
            animation: "spin_end_smth 1.9s cubic-bezier(0.33, 1, 0.68, 1) forwards",
            duration: 3800
          }    
          break;
      }
      dispatch(userActions.setUserData(await UsersService.getUserMainDataApiV1P2PUserMainDataGet(authorization)))
    },
  })

  const stopSpin = () => {
    if (!spinEndRef.current)
      return
    setSpin(false)
    newAnimationDataRef.current.animation = ""
    if (gachaRef.current)
      gachaRef.current.style.animation = ""
  }

  function getTime() {
    return Math.floor((new Date(userData?.roulette_last_spin ?? 0).getTime() + spinTimeout - Date.now()) / 1000)
  }

  const [spinTime, setSpinTime] = useState(userData?.roulette_last_spin ? getTime() : 0)

  const updateTimeRef = useRef<NodeJS.Timeout>(undefined)
  useEffect(() => {
    if (userData?.roulette_last_spin) {
      if (!updateTimeRef.current)
        updateTimeRef.current = setInterval(() => {
          setSpinTime(getTime())
        }, 100)
    } else {
      setSpinTime(0)
    }
    return () => {
      clearInterval(updateTimeRef.current)
      updateTimeRef.current = undefined
    }
  }, [userData?.roulette_last_spin])

  function VipDialog() {
    const additional = useAppSelector(s => s.additional)
    const authorization = useAppSelector(selectAuthorization)

    const [currency, setCurrency] = useState(additional.currencyTypes[0])

    const {mutate} = useMutation({
      mutationFn: async () => {
        await UsersService.updateUserVipApiV1P2PUserUpdateUserVipPost(authorization, currency as TransactionCurrencyType)
        setModalState(ModalState.notVisible)
      }
    })

    return (
      <>
        <div onClick={() => setModalState(ModalState.notVisible)} className={modalState ? "profile-vipDialog-overlay active" : "profile-vipDialog-overlay"}></div>

        <div className={modalState ? "vipDialog active" : "vipDialog"}>
          <div className="vipDialog-main">

            <div className="vipDialog-top">
              <p className="vipDialog-top-header">VIP статус:</p>
              <Button className="vipDialog-close" onClick={() => setModalState(ModalState.notVisible)}>
                <img src={closeImg} alt="" className="vipDialog-close-icon" />
              </Button>
            </div>
            
            <p className="vipDialog-status">{userData?.is_vip ? "Активно" : "Не активно"}</p>

            <div className="vipDialog-body">
              {modalState == ModalState.setCurrency ?
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
          
          {modalState == ModalState.setCurrency ?
            <Button className="vipDialog-button" onClick={() => mutate()}>Оплатить</Button>
          :
            <Button className="vipDialog-button" disabled={userData?.is_vip} onClick={() => setModalState(ModalState.setCurrency)}>Оформить</Button>
          }
        </div>
      </>
    )
  }

  return (
    <Profile username={userData?.username ?? "none"}
      topChildren={
        <Link to={{pathname: RoutePaths.profileSettings}} className="profile-top-settings">
          <img src={settingsLogo} alt=""/>
        </Link>
      }
    >
      
      <div className="profile-body">
        <Button className="profile-body-vip" onClick={() => setModalState(ModalState.main)}>
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
        
         
        <div
          onClick={stopSpin}
          className={spin ? "profile-body-gacha-dark-overlay active" : "profile-body-gacha-dark-overlay"}
        />
        <div onClick={spin ? stopSpin : undefined} className={spin ? "profile-body-gacha-wrapper spin" : "profile-body-gacha-wrapper"}>
          <img
            className="profile-body-gacha-arrow"
            src={gachaArrow}
            alt=""
          />
          <img
            onAnimationIteration={() => {
              if (!newAnimationDataRef.current.animation || !gachaRef.current)
                return

              gachaRef.current.style.animation = newAnimationDataRef.current.animation
              setTimeout(() => spinEndRef.current = true, newAnimationDataRef.current.duration)
            }}
            ref={gachaRef}
            src={spin ? gachaFull : gachaBlank}
            alt=""
            className={spin ? "profile-body-gacha-image spin" : "profile-body-gacha-image"}
          />
        </div>
        <Button
          onClick={() => {
            spinEndRef.current = false
            showAd()
          }}
          disabled={userData?.roulette_last_spin ? Date.now() - new Date(userData.roulette_last_spin).getTime() <= spinTimeout : false }
          className="profile-body-gacha-button"
        >
          {spinTime ? numberToTime(spinTime) : "Крутить"}
        </Button>
        
        <VipDialog />
      </div>
    </Profile>
  )
}