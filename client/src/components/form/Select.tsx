import "./Form.css"

type SelectProps = {
    name?: string
    optionsProps: {
        value?: string
        text?: string
    } []
}

function Select({name, optionsProps}: SelectProps) {
    return (
        <select name={name} className="form-select">
            {optionsProps.map(val => (
                <option value={val.value} key={val.value}>{val.text}</option>
            ))}
        </select>
    )
}

export default Select