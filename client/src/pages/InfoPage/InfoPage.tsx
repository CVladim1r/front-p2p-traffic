import "./InfoPage.css"
import { TextField } from "../../shared/ui"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../app/providers/store"

export default function InfoPage() {
  const userPhoto = useAppSelector(s => s.user.data?.profile_photo ?? "")
  
  return (
    <div className="info container">
      <img src={userPhoto} alt="" className="info-avatar" />
      <div className="info-group">
        <div className="info-row">
          <p className="info-row-key">Канал</p>
          <TextField className="info-textField" type="text" defaultValue="@username" />
        </div>
        <div className="info-row">
          <p className="info-row-key">Чат</p>
          <TextField className="info-textField" type="text" defaultValue="@username" />
        </div>
        <div className="info-row">
          <p className="info-row-key">Сайт</p>
          <TextField className="info-textField" type="text" defaultValue="https://website.com" />
        </div>
      </div>

      <div className="info-help-container">
        <Link to={{hash:"help"}} className="info-help">Поддержка/сотрудничество</Link>
      </div>

      <div className="info-links">
        <div className="info-link-container">
          <Link to={{hash: "FAQ"}} className="info-link">FAQ</Link>
        </div>
        <div className="info-link-container">
          <Link to={{hash: "mail"}} className="info-link">Почта</Link>
        </div>
        <div className="info-link-container">
          <Link to={{hash: "question"}} className="info-link">Вопрос</Link>
        </div>
      </div>
    </div>
  )
}
