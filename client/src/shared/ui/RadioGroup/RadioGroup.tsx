import { useState } from "react"
import { RadioButton } from "../RadioButton/RadioButton"
import "../Form.css"
import classNames from "classnames"

type RadioGroupProps = {
    className?: string
    name?: string
    defaultValue?: string
    buttonsProps: {
        value?: string
        label?: string
    } []
}

export function RadioGroup({className, name, defaultValue, buttonsProps}: RadioGroupProps) {
    const [value, setValue] = useState(defaultValue)

    return (
        <div className={classNames(
            "form-radioGroup",
            className
        )}>
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