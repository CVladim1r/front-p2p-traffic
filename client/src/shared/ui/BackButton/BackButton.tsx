import classNames from "classnames"
import arrowSvg from "../../assets/svg/arrow_back.svg"
import "./BackButton.css"

type BackButtonProps = {
    className?: string,
    onClick?: () => void,
}

export function BackButton({onClick, className}: BackButtonProps) {
    return (
        <button onClick={onClick} className={classNames(
            "backButton",
            className
        )} type="button">
            <img src={arrowSvg} alt="" />
        </button>
    )
}