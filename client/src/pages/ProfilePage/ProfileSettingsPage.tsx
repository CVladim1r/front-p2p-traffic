import ProfileTop from "./Profile";
import copySvg from "../../shared/assets/svg/copy.svg"
import { useAppSelector } from "../../app/providers/store";
import { BackButton, LoadingAnimation } from "../../shared/ui";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../app/providers/router";
import { useQuery } from "@tanstack/react-query";
import { ReferralsService, ReferralUserStats } from "../../shared/api";
import { selectAuthorization } from "../../entities/User";


function Referral({username, profile_photo, completed_buys_count}: ReferralUserStats) {
  return (
    <div className="profile-settings-referral-elem">
      <div className="profile-settings-referral-elem-profile">
        <img className="profile-settings-referral-elem-image" src={profile_photo ?? undefined} alt="" />
        <p className="profile-settings-referral-elem-username">{username}</p>
      </div>

      <p className="profile-settings-referral-elem-stat">{completed_buys_count} сделок</p>
    </div>
  )
}

export default function ProfileSettings() {
  const userData = useAppSelector(state => state.user.data)
  const authorization = useAppSelector(selectAuthorization)
  const navigate = useNavigate()

  const referrals = useQuery({
    queryKey: ["referrals"],
    queryFn: async () => {
      return await ReferralsService.getReferralsStatsApiV1P2PReferralsReferralsGet(authorization)
    }
  })

 //TODO - Рефералы (Реферальная система) после уведомления и перед правилами пользования // navigator.clipboard.writeText(copyText.value);
  return (
    <div className="profile container">
      <ProfileTop username={userData?.username ?? "none"}/>
        <div className="profile-settings">
          <BackButton className="profile-settings-backButton" onClick={() => navigate(RoutePaths.profile)} />

          <div className="profile-settings-block">
            <p className="profile-settings-header">Подписка</p>

            <div className="profile-settings-group">
              <button onClick={() => console.log("click")} className="profile-settings-row">
                <p className="profile-settings-key">VIP - статус</p>
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
          
          <div className="profile-settings-block">
            <p className="profile-settings-header">Реферальная система</p>

            <div className="profile-settings-group">
              <div className="profile-settings-row">
                <p className="profile-settings-key">Реферальная ссылка</p>
                <button className="profile-settings-copy" onClick={() => navigator.clipboard.writeText(`https://t.me/justad_bot?start=ref_${userData?.tg_id}`)}>
                  <img className="profile-settings-copy-img" src={copySvg} alt="" />
                </button>
              </div>

              <div className="profile-settings-referral-list">
                {referrals.isLoading ?
                  <LoadingAnimation height={150} width={150} />
                : !referrals.isSuccess ?
                  <p>Не удалось получить данные</p>
                : referrals.data.referrals.length ?
                  referrals.data.referrals.map(val => <Referral {...val}/>)
                :
                  <p className="profile-settings-referral-lonely">У вас пока нет рефералов</p>
                }
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