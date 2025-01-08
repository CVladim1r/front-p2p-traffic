import { NavLink } from "react-router-dom"
import "./NavBar.css"
import telegramLogo from "../assets/telegram.svg"
import telegramLogoActive from "../assets/telegram-active.svg"
import adsLogo from "../assets/ads.svg"
import adsLogoActive from "../assets/ads-active.svg"
import chatLogo from "../assets/chat.svg"
import chatLogoActive from "../assets/chat-active.svg"
import addAdLogo from "../assets/add_ad.svg"
import addAdLogoActive from "../assets/add_ad-active.svg"
import profileLogo from "../assets/profile.svg"
import profileLogoActive from "../assets/profile-active.svg"
import infoLogo from "../assets/info.svg"
import infoLogoActive from "../assets/info-active.svg"

type LinkProps = {
    pathname: string
    img_src: string
    img_src_active: string
}

function MyNavLink ({pathname, img_src, img_src_active}: LinkProps) {
    return (
        <NavLink to={{pathname}}>
            {({ isActive }) => (
                <img src={isActive ? img_src_active : img_src} alt="" />
            )}
        </NavLink>
    )
}


function NavBar() {
    return (
        <nav className="nav">
                <div className="nav-list">
                    <MyNavLink pathname="/tg" img_src={telegramLogo} img_src_active={telegramLogoActive} />
                    <MyNavLink pathname="/ads" img_src={adsLogo} img_src_active={adsLogoActive} />
                    <MyNavLink pathname="/chat" img_src={chatLogo} img_src_active={chatLogoActive} />
                    <MyNavLink pathname="/make-ad" img_src={addAdLogo} img_src_active={addAdLogoActive} />
                    <MyNavLink pathname="/profile" img_src={profileLogo} img_src_active={profileLogoActive} />
                    <MyNavLink pathname="/info" img_src={infoLogo} img_src_active={infoLogoActive} />
                </div>
        </nav>
    )
}

export default NavBar