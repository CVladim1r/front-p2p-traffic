import { InputHTMLAttributes } from "react"
import "../Form.css"

type RadioButtonProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
    label?: string
}

export function RadioButton({label, ...otherProps}: RadioButtonProps) {
    
    if (label) {
        // if (otherProps.checked === undefined)
        //     throw new Error("RadioButton with property label and without checked won't change visually");
            
        return (
            <label className={otherProps.checked ? "form-radioButton-label active" : "form-radioButton-label"}>
                {label}
                <input
                    type="radio"
                    className="form-radioButton"
                    {...otherProps}
                />
            </label>
        )
    }
    return (
        <input type="radio" {...otherProps} className="form-radioButton"/>
    )
}