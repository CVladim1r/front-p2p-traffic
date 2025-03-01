import { ButtonHTMLAttributes, PropsWithChildren } from "react"
import "../Form.css"
import classNames from "classnames"

type ButtonProps = PropsWithChildren & ButtonHTMLAttributes<HTMLButtonElement> & {
    useDefaultClassName?: boolean
}

export function Button({children, className, disabled, type, useDefaultClassName, ...otherProps}: ButtonProps) {
    return (
        <button
            className={classNames(
                {"form-button": useDefaultClassName ?? true},
                {"disabled": disabled},
                className
            )}
            disabled={disabled}
            type={type ?? "button"}
            {...otherProps}
        >
            {children}
        </button>
    )
}
