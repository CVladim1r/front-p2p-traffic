import "./Form.css"

type TextFieldProps = {
    name?: string
    type: "text" | "number"
    placeholder?: string
}

function TextField(props : TextFieldProps) {
    return (
        <input  {...props} className="form-textField"/>
    )
}

export default TextField