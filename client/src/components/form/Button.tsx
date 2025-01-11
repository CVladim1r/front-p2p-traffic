import { ReactNode } from "react"
import "./Form.css"

type ButtonProps = {
    children?: ReactNode
    value?: string
    type?: "submit" | "reset" | "button"
    onClick?: () => void
}

function Button({children, value, onClick, type}: ButtonProps) {
    return (
        <button className="form-button" onClick={onClick} value={value} type={type}>
            {children}
        </button>
    )
}

export default Button