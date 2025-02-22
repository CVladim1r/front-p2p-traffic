import { Link } from "react-router-dom"
import dealsImg from "../../shared/assets/svg/profile_deals.svg"
import profitImg from "../../shared/assets/svg/profile_profit.svg"
import ratingImg from "../../shared/assets/svg/profile_rating.svg"
import settingsLogo from "../../shared/assets/svg/settings.svg"
import gachaFull from "../../shared/assets/svg/gacha_new.svg"
import gachaBlank from "../../shared/assets/svg/gacha_new-blank.svg"
import gachaArrow from "../../shared/assets/svg/arrow_gacha.svg"
import closeImg from "../../shared/assets/svg/close.svg"
import ProfileTop from "./Profile"
import { RoutePaths } from "../../app/providers/router"
import { Button, Select } from "../../shared/ui"
import { useEffect, useRef, useState } from "react"
import { formatNumberTo3, numberToTime } from "../../shared/lib/lib"
import { useAppSelector } from "../../app/providers/store"
import { useAdsgram } from "../../shared/lib/hooks"
import { useMutation } from "@tanstack/react-query"
import { AdsgramService, PrizeType, TransactionCurrencyType, UsersService } from "../../shared/api"
import { selectAuthorization, userActions } from "../../entities/User"
import { user } from "../.."
import { useDispatch } from "react-redux"
import { pagesActions, ProfileDialogState } from "../../entities/Pages/slice/pagesSlice"

function VipDialog() {
  const dispatch = useDispatch()
  const additional = useAppSelector(s => s.additional)
  const authorization = useAppSelector(selectAuthorization)
  const is_vip = useAppSelector(s => s.user.data?.is_vip)
  const dialogState = useAppSelector(s => s.pages.profile.dialogState)

  const [currency, setCurrency] = useState(additional.currencyTypes[0])

  const {mutate} = useMutation({
    mutationFn: async () => {
      await UsersService.updateUserVipApiV1P2PUserUpdateUserVipPost(authorization, currency as TransactionCurrencyType)
      dispatch(pagesActions.setProfileDialogState(ProfileDialogState.notVisible))
    }
  })

  return (
    <>
      <div onClick={() => dispatch(pagesActions.setProfileDialogState(ProfileDialogState.notVisible))} className={dialogState ? "profile-vipDialog-overlay active" : "profile-vipDialog-overlay"}></div>

      <div className={dialogState ? "vipDialog active" : "vipDialog"}>
        <div className="vipDialog-main">

          <div className="vipDialog-top">
            <p className="vipDialog-top-header">VIP статус:</p>
            <Button className="vipDialog-close" onClick={() => dispatch(pagesActions.setProfileDialogState(ProfileDialogState.notVisible))}>
              <img src={closeImg} alt="" className="vipDialog-close-icon" />
            </Button>
          </div>
          
          <p className="vipDialog-status">{is_vip ? "Активно" : "Не активно"}</p>

          <div className="vipDialog-body">
            {dialogState == ProfileDialogState.setCurrency ?
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
        
        {dialogState == ProfileDialogState.setCurrency ?
          <Button className="vipDialog-button" onClick={() => mutate()}>Оплатить</Button>
        :
          <Button className="vipDialog-button" disabled={is_vip} onClick={() => dispatch(pagesActions.setProfileDialogState(ProfileDialogState.setCurrency))}>Оформить</Button>
        }
      </div>
    </>
  )
}

export default function ProfilePage() {
  // const [showGacha, setShowGacha] = useState(false)
  const dispatch = useDispatch()

  const spinTimeout = 24 * 60 * 60 * 1000

  const authorization = useAppSelector(selectAuthorization)
  const userData = useAppSelector(state => state.user.data)
  const additional = useAppSelector(s => s.additional)

  const [spin, setSpin] = useState(false)
  const [currencyType, setCurrencyType] = useState(additional.currencyTypes[0])

  const gachaRef = useRef<HTMLImageElement>(null)
  const newAnimationDataRef = useRef<{animation: string, duration: number}>({animation: "", duration: 0})
  const [spinEnd, setSpinEnd] = useState(false)

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
        case PrizeType._3_DISCOUNT:
          newAnimationDataRef.current = {
            animation: "spin_end_0 3s cubic-bezier(0.33, 1, 0.68, 1) forwards",
            duration: 3200
          }
          break;
        case PrizeType._5_DISCOUNT:
          newAnimationDataRef.current = {
            animation: "spin_end_180 1.5s cubic-bezier(0.33, 1, 0.68, 1) forwards",
            duration: 1500
          }
          break;
        case PrizeType._03_DEPOSIT:
          newAnimationDataRef.current = {
            animation: "spin_end_90 2.3s cubic-bezier(0.33, 1, 0.68, 1) forwards",
            duration: 2300
          }  
          break;
        case PrizeType._7_INCREASED_REFERRAL_BONUS:
          newAnimationDataRef.current = {
            animation: "spin_end_270 3.8s cubic-bezier(0.33, 1, 0.68, 1) forwards",
            duration: 3800
          }    
          break;
      
        default:
          newAnimationDataRef.current = {
            animation: "spin_end_smth 1.9s cubic-bezier(0.33, 1, 0.68, 1) forwards",
            duration: 1900
          }    
          break;
      }
      dispatch(userActions.setUserData(await UsersService.getUserMainDataApiV1P2PUserMainDataGet(authorization)))
    },
  })

  const stopSpin = () => {
    if (!spinEnd)
      return
    setSpin(false)
    newAnimationDataRef.current.animation = ""
    if (gachaRef.current)
      gachaRef.current.style.animation = ""
  }

  function getRemainingTime() {
    return Math.floor((new Date(userData?.roulette_last_spin ?? 0).getTime() + spinTimeout - Date.now()) / 1000)
  }

  const [spinTime, setSpinTime] = useState(userData?.roulette_last_spin && getRemainingTime() > 0 ? getRemainingTime() : 0)

  const updateTimeRef = useRef<NodeJS.Timeout>(undefined)
  useEffect(() => {
    if (userData?.roulette_last_spin && getRemainingTime() > 0) {
      if (!updateTimeRef.current)
        updateTimeRef.current = setInterval(() => {
          const time = getRemainingTime()
          if (time < 0) {
            clearInterval(updateTimeRef.current)
            updateTimeRef.current = undefined
            setSpinTime(0)
          }
          else
            setSpinTime(getRemainingTime())
        }, 100)
    } else {
      setSpinTime(0)
    }
    return () => {
      clearInterval(updateTimeRef.current)
      updateTimeRef.current = undefined
    }
  }, [userData?.roulette_last_spin])

  return (
    <div className="profile container">

      <ProfileTop username={userData?.username ?? "none"}
        children={
          <Link to={{pathname: RoutePaths.profileSettings}} className="profile-top-settings">
            <img src={settingsLogo} alt=""/>
          </Link>
        }
      />
        
        <div className="profile-body">
          <Button className="profile-body-vip" onClick={() => dispatch(pagesActions.setProfileDialogState(ProfileDialogState.main))}>
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
          
          
          <div className={spin ? "profile-body-gacha-dark-overlay active" : "profile-body-gacha-dark-overlay"} />
          <div className={spin ? "profile-body-gacha-wrapper spin" : "profile-body-gacha-wrapper"}>
            <div className="profile-body-gacha-image-container">
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
                  setTimeout(() => setSpinEnd(true), newAnimationDataRef.current.duration)
                }}
                ref={gachaRef}
                src={spin ? gachaFull : gachaBlank}
                alt=""
                className={spin ? "profile-body-gacha-image spin" : "profile-body-gacha-image"}
              />
            </div>
            {spin &&
              <Button
                onClick={stopSpin}
                disabled={!spinEnd}
              >
                Забрать награду
              </Button>
            }
          </div>
          <Button
            onClick={() => {
              setSpinEnd(false)
              showAd()
            }}
            disabled={userData?.roulette_last_spin ? Date.now() - new Date(userData.roulette_last_spin).getTime() <= spinTimeout : false }
            className="profile-body-gacha-button"
          >
            {spinTime ? numberToTime(spinTime) : "Крутить"}
          </Button>
          
          <VipDialog />
        </div>
    </div>
  )
}