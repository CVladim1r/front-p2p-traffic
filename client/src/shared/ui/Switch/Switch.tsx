import { InputHTMLAttributes } from "react"
import "../Form.css"
import classNames from "classnames"

type SwitchProps = InputHTMLAttributes<HTMLInputElement> & {
    className?: string
}

// 
export function Switch({className, checked, ...otherProps}: SwitchProps) {
    return (
        <input
            className={classNames(
                "form-switch",
                {"active": checked},
                className
            )}
            type="checkbox"
            {...otherProps}
        />
    )
}