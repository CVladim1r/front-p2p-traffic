import { InputHTMLAttributes, TextareaHTMLAttributes } from "react"
import "../Form.css"
import classNames from "classnames"

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & TextareaHTMLAttributes<HTMLTextAreaElement> & {
    type: "text" | "number" | "textarea"
}

export function TextField({className, ...otherProps} : TextFieldProps) {
    if (otherProps.type == "textarea")
        return (
            <textarea
                className={classNames(
                    "form-textField",
                    className
                )}
                {...otherProps}
            />
        )
    
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