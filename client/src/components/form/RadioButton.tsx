type RadioButtonProps = {
    value?: string
    label?: string
    name?: string
    checked?: boolean
    defaultChecked?: boolean
    onChange: () => void
}

function RadioButton({value, label, name, checked, defaultChecked, onChange}: RadioButtonProps) {
    
    if (label) {
        return (
            <label className={checked ? "form-radioButton-label active" : "form-radioButton-label"}>
                {label}
                <input type="radio" onChange={onChange} name={name} value={value} checked={checked} defaultChecked={defaultChecked} className="form-radioButton"/>
            </label>
        )
    }
    return (
        <input type="radio" onChange={onChange} name={name} value={value} checked={checked} defaultChecked={defaultChecked} className="form-radioButton"/>
    )
}

export default RadioButton