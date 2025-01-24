import { InputHTMLAttributes } from "react"
import "../Form.css"
import classNames from "classnames"

type InputRangeProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">

export function InputRange({className, ...otherProps} : InputRangeProps) {
    return (
        <input
            type="range"
            className={classNames(
                "form-range",
                className
            )}
            {...otherProps}
        />
    )
}