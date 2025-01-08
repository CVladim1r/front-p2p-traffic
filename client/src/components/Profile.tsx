import { Link, Outlet, useLocation } from "react-router-dom"
import settingsLogo from "../assets/settings.svg"
import arrow_info from "../assets/arrow_info.svg"
import "./Profile.css"

export function ProfileSettngs() {
    return (
        <div className="profile-settings">
            <div className="profile-settings-premium">
                <p className="profile-settings-header">Premium</p>
                <div className="profile-settings-group">
                    <div className="profile-settings-row">
                        <p className="profile-settings-key">Подписка Premium</p>
                        <p className="profile-settings-value">Active</p>
                    </div>
                </div>
            </div>

            <div className="profile-settings-settings">
                <p className="profile-settings-header">Настройки</p>
                <div className="profile-settings-group">
                    <button className="profile-settings-row">
                        <p className="profile-settings-key">Адрес кошелька</p>
                        <p className="profile-settings-value">UQAj..Wal</p>
                    </button>
                    <button className="profile-settings-row">
                        <p className="profile-settings-key-lang">Язык</p>
                        <p className="profile-settings-value-lang">Русский</p>
                    </button>
                </div>
                <div className="profile-settings-group">
                    <label className="profile-settings-row">
                        <p className="profile-settings-key">Уведомления</p>
                        <input type="checkbox" name="notifications" />
                    </label>
                </div>
            </div>

            <div className="profile-settings-info">
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

            <div className="profile-settings-group">
                <a href="#!rules" className="profile-settings-rules">Правила пользования платформой</a>
            </div>
        </div>
    )
}

export function ProfileBody() {
    return (
        <div className="profile-body">
            <div className="profile-body-vip">
                <p className="profile-body-vip-text">VIP - статус</p>
                <p className="profile-body-vip-status">Active</p>
            </div>

            <div className="profile-body-money">
                <p className="profile-body-money-text">$17 246.27</p>
                <button className="profile-body-money-add">Пополнить</button>
                <button className="profile-body-money-remove">Вывести</button>
            </div>

            <div className="profile-body-info">
                <div className="profile-body-info-deals">
                    <img src="" alt="" />
                    <p>234</p>
                </div>
                <div className="profile-body-info-money">
                    <img src="" alt="" />
                    <p>$11.031</p>
                </div>
                <div className="profile-body-info-rating">
                    <img src="" alt="" />
                    <p>4.99</p>
                </div>
            </div>

            <div className="profile-body-gacha">
                <img src="" alt="" />
                <button className="profile-body-gacha-button">Крутить</button>
            </div>
        </div>
    )
}

function Profile() {
    let location = useLocation()

    // get data from tg = window.Telegram.WebApp 

    return (
        <div className="profile container">
            <div className="profile-top">
                {location.pathname.endsWith("settings") ? <></> :
                    <Link to={{pathname: "settings"}}>
                        <img src={settingsLogo} alt="" className="profile-top-settings"/>
                    </Link>
                }

                <img src="/src/assets/profiletest.png" alt="" className="profile-image"/>
                <p className="profile-name">@someNick</p>
            </div>

            <Outlet />
        </div>
    )
}

export default Profile