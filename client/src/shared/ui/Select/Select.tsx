import { SelectHTMLAttributes } from "react"
import "../Form.css"

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    optionsProps: {
        value?: string
        text?: string
    } []
}

export function Select({optionsProps, ...otherProps}: SelectProps) {
    return (
        <select className="form-select" {...otherProps}>
            {optionsProps.map(val => (
                <option value={val.value} key={val.value}>{val.text}</option>
            ))}
        </select>
    )
}