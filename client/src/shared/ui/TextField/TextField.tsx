import { InputHTMLAttributes } from "react"
import "../Form.css"
import classNames from "classnames"

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    type: "text" | "number"
}

export function TextField({className, ...otherProps} : TextFieldProps) {
    return (
        <input
            className={classNames(
                "form-textField",
                className
            )}
            {...otherProps}
        />
    )
}