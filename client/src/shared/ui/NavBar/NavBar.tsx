import { NavLink } from "react-router-dom"
import { RoutePaths } from "../../../app/providers/router"
import adsLogo from "../../assets/svg/ads.svg"
import adsLogoActive from "../../assets/svg/ads-active.svg"
import chatLogo from "../../assets/svg/chat.svg"
import chatLogoActive from "../../assets/svg/chat-active.svg"
import addAdLogo from "../../assets/svg/add_ad.svg"
import addAdLogoActive from "../../assets/svg/add_ad-active.svg"
import profileLogo from "../../assets/svg/profile.svg"
import profileLogoActive from "../../assets/svg/profile-active.svg"
import infoLogo from "../../assets/svg/info.svg"
import infoLogoActive from "../../assets/svg/info-active.svg"
import "./NavBar.css"

type LinkProps = {
  pathname: string
  img_src: string
  img_src_active: string
}

function MyNavLink ({pathname, img_src, img_src_active}: LinkProps) {
  return (
    <NavLink to={{pathname}} className="nav-list-link">
      {({ isActive }) => (
        <div className="nav-list-link-img-container">
          <img src={isActive ? img_src_active : img_src} alt="" className="nav-list-link-img"/>
        </div>
      )}
    </NavLink>
  )
}

export function NavBar() {
  return (
    <nav className="nav">
      <div className="nav-list">
        <MyNavLink pathname={RoutePaths.ads} img_src={adsLogo} img_src_active={adsLogoActive} />
        <MyNavLink pathname={RoutePaths.chats} img_src={chatLogo} img_src_active={chatLogoActive} />
        <MyNavLink pathname={RoutePaths.addad} img_src={addAdLogo} img_src_active={addAdLogoActive} />
        <MyNavLink pathname={RoutePaths.profile} img_src={profileLogo} img_src_active={profileLogoActive} />
        <MyNavLink pathname={RoutePaths.info} img_src={infoLogo} img_src_active={infoLogoActive} />
      </div>
    </nav>
  )
}