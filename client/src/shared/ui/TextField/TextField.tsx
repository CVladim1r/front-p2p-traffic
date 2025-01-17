import { InputHTMLAttributes, PropsWithChildren } from "react"
import "../Form.css"
import classNames from "classnames"

type TextFieldProps = PropsWithChildren & InputHTMLAttributes<HTMLInputElement> & {
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