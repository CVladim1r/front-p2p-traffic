import { FormEvent } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"
import Button from "../../components/form/Button"
import RadioGroup from "../../components/form/RadioGroup"
import TextField from "../../components/form/TextField"
import Select from "../../components/form/Select"
import "./AddAdPage.css"

type FormData = { 
    readonly elements: {
        guaranteed: HTMLInputElement
        source: HTMLInputElement 
        theme: HTMLSelectElement 
        amount: HTMLInputElement
        cost: HTMLInputElement
        placing: HTMLInputElement
        name: HTMLInputElement
        description: HTMLInputElement
    }
}

function formSubmit(e: FormEvent<FormData>, navigate: NavigateFunction) {
    e.preventDefault()
    const {amount, cost, description, guaranteed, name, placing, source, theme} = e.currentTarget.elements
    console.log(guaranteed.value)
    console.log(source.value)
    console.log(theme.value)
    console.log(amount.value)
    console.log(cost.value)
    console.log(placing.value)
    console.log(name.value)
    console.log(description.value)
    navigate("#preview-ad")
}

export default function AddAdPage() {
    let navigate = useNavigate()
    return (
        <div className="add-ad container">
            <p className="add-ad-header">Создайте объявление</p>
            <form onSubmit={e => formSubmit((e as any), navigate)} className="add-ad-form">
                <div className="add-ad-form-content">
                    <div className="add-ad-form-row">
                        <p className="add-ad-form-row-key">Приход</p>

                        <RadioGroup name="guaranteed" defaultValue="true" buttonsProps={[
                            {label: "Гарантирован", value: "true"},
                            {label: "Не гарантирован", value: "false"},
                        ]} />
                    </div>
                    <div className="add-ad-form-row">
                        <p className="add-ad-form-row-key">Источник</p>

                        <TextField type="text" name="source" placeholder="Введите ссылку..."/>
                    </div>
                    <div className="add-ad-form-row">
                        <p className="add-ad-form-row-key">Тематика</p>

                        <Select name="theme" optionsProps={[
                            {text: "Выбрать", value: ""},
                            {text: "Test", value: "test"},
                            {text: "Test2", value: "test2"},
                        ]}/>
                    </div>
                    <div className="add-ad-form-row">
                        <p className="add-ad-form-row-key">Кол-во пользователей</p>

                        <TextField type="number" name="amount" placeholder="Введите кол-во"/>
                    </div>
                    <div className="add-ad-form-row">
                        <p className="add-ad-form-row-key">Сумма</p>

                        <TextField type="number" name="cost" placeholder="Введите сумму"/>
                    </div>
                    <div className="add-ad-form-row">
                        <p className="add-ad-form-row-key">Размещение</p>

                        <div className="add-ad-form-row-radio">
                            <RadioGroup name="placing" defaultValue="free" buttonsProps={[
                                {label: "Бесплатное", value: "free"},
                                {label: "Платное", value: "pay"},
                            ]}/>
                        </div>
                    </div>
                    <div className="add-ad-form-row">
                        <p className="add-ad-form-row-key">Название</p>

                        <TextField type="text" name="name" placeholder="Введите название"/>
                    </div>
                    <div className="add-ad-form-row">
                        <p className="add-ad-form-row-key">Описание</p>

                        <TextField type="text" name="description" placeholder="Введите описание"/>
                    </div>
                </div>

                <Button type="submit">Далее</Button>
            </form>
        </div>
    )
}
