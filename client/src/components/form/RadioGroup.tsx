import { useState } from "react"
import "./Form.css"
import RadioButton from "./RadioButton"

type RadioGroupProps = {
    name?: string
    defaultValue?: string
    buttonsProps: {
        value?: string
        label?: string
    } []
}

function RadioGroup({name, defaultValue, buttonsProps: propsArray}: RadioGroupProps) {
    let [value, setValue] = useState(defaultValue)

    return (
        <div className="form-radioGroup">
            {propsArray.map(val => (
                <RadioButton {...val} name={name} checked={value===val.value} onChange={() => setValue(val.value)} key={val.value}/>
            ))}
        </div>
    )
}

export default RadioGroup