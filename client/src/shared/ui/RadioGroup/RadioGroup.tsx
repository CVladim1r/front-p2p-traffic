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
    } [],
    onChange?: (value?: string) => void
}

export function RadioGroup({className, name, defaultValue, buttonsProps, onChange}: RadioGroupProps) {
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
                    onChange={() => {
                        setValue(val.value)
                        if (onChange != undefined)
                            onChange(val.value)
                    }}
                    {...val}
                />
            ))}
        </div>
    )
}