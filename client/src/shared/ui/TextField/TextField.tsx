import { InputHTMLAttributes, PropsWithChildren } from "react"
import "../Form.css"

type TextFieldProps = PropsWithChildren & InputHTMLAttributes<HTMLInputElement> & {
    type: "text" | "number"
}

export function TextField(props : TextFieldProps) {
    return (
        <input {...props} className="form-textField"/>
    )
}