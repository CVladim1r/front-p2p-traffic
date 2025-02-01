import { ReactElement } from "react"
import "./DonePage.css"
import { DoneAnimation } from "../../shared/ui/LottieAnimations"

type DonePageProps = {
    mainMessage: string,
    secondaryMessage: string,
    button: ReactElement
}

export default function DonePage({mainMessage, secondaryMessage, button} : DonePageProps) {
    return (
        <div className="done container">
            <div className="done-top">
                {/* <img src={checkmark} alt="" className="done-image" /> */}
                <div className="done-image">
                    <DoneAnimation />
                </div>
                <div className="done-message">
                    <p className="done-message-main">{mainMessage}</p>
                    <p className="done-message-secondary">{secondaryMessage}</p>
                </div>
            </div>
            {button}
        </div>
    )
}