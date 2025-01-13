import { useState } from "react"
import { RadioButton } from "../RadioButton/RadioButton"
import "../Form.css"

type RadioGroupProps = {
    name?: string
    defaultValue?: string
    buttonsProps: {
        value?: string
        label?: string
    } []
}

export function RadioGroup({name, defaultValue, buttonsProps}: RadioGroupProps) {
    let [value, setValue] = useState(defaultValue)

    return (
        <div className="form-radioGroup">
            {buttonsProps.map(val => (
                <RadioButton
                    key={val.value}
                    name={name}
                    checked={value===val.value}
                    onChange={() => setValue(val.value)}
                    {...val}
                />
            ))}
        </div>
    )
}