import { ButtonHTMLAttributes, PropsWithChildren } from "react"
import "../Form.css"
import classNames from "classnames"

type ButtonProps = PropsWithChildren & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({children, className, disabled, ...otherProps}: ButtonProps) {
    return (
        <button
            className={classNames(
                "form-button",
                {"disabled": disabled},
                className
            )}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    )
}
