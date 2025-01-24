import { useNavigate } from "react-router-dom"
import {
    Button,
    RadioGroup,
    Select,
    TextField
}
from "../../shared/ui"
import "./AddAdPage.css"
import { useDispatch, useSelector } from "react-redux"
import { addAdActions } from "../../entities/AddAd/slice/addAdSlice"
import { StateSchema } from "../../app/providers/store"
import { RoutePaths } from "../../app/providers/router"
import { InputRange } from "../../shared/ui/InputRange/InputRange"
import { FormEvent, useState } from "react"

export default function AddAdPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const additional = useSelector(
        (state: StateSchema) => state.additional
    )
    
    const data = useSelector(
        (state: StateSchema) => state.addAd.data,
        () => true
    )

    const formSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const {
            // min,
            price,
            // description,
            guaranteed,
            // name, 
            placing,
            source,
            theme,
            currencyType,
            amountType,
            amount,
        } = Object.fromEntries(formData)
        // console.log(guaranteed)
        // console.log(source)
        // console.log(theme)
        // // console.log(min)
        // console.log(amountType)
        // console.log(amount)
        // console.log(price)
        // console.log(currencyType)
        // console.log(placing)
        // console.log(name)
        // console.log(description)

        dispatch(addAdActions.setData({
            guaranteed: guaranteed == "true",
            source: source.toString(),
            theme: theme.toString(),
            // min: +min,
            amountType: amountType == "min" ? "min" : "max",
            amount: +amount,
            price: +price,
            currencyType: currencyType.toString(),
            // description: description.toString(),
            // name: name.toString(),
            placing: placing == "free" ? "free" : "pay",
        }))
        
        navigate(RoutePaths.previewAd)
    }

    const dataSource = useSelector(
        (state: StateSchema) => state.addAd.data.source
    )
    const [source, setSource] = useState(dataSource ?? "")
    const [amount, setAmount] = useState(data.amount ?? 0)
    const [valid, setValid] = useState(data.amount ? true : false)

    return (
        <div className="add-ad container">
            <p className="add-ad-header">Создайте объявление</p>
            <form onSubmit={formSubmit} onChange={e => setValid(e.currentTarget.checkValidity())} className="add-ad-form">
                <div className="add-ad-form-content">

                    <div className="add-ad-form-row">
                        <p className="add-ad-form-row-key">Аудитория</p>

                        <RadioGroup name="guaranteed" defaultValue={data.guaranteed ?? true ? "true" : "false"} buttonsProps={[
                            {label: "Гарантирована", value: "true"},
                            {label: "Не гарантирована", value: "false"},
                        ]} />
                    </div>
                    
                    <div className="add-ad-form-row">
                        <p className="add-ad-form-row-key">Источник</p>

                        <div className="add-ad-form-source">
                            <TextField className="add-ad-TextField" type="text" name="source" placeholder="Введите ссылку..." value={source} onChange={e => setSource(e.target.value)} required/>
                            <Button type="button" onClick={() => dispatch(addAdActions.setSource(source))} className={source == "" || source == dataSource ? "add-ad-form-source-button hidden" : "add-ad-form-source-button"}>Сохранить</Button>
                        </div>
                    </div>

                    <div className="add-ad-form-row">
                        <p className="add-ad-form-row-key">Тематика</p>

                        <Select name="theme" defaultValue={data.theme} optionsProps={
                            additional.categories.map(val => ({value: val.substring(0, val.length - 1)})) //FIXME: темы без скобочек будут -> убрать substring
                        }/>
                    </div>
                    
                    <div className="add-ad-form-row">
                        <div className="add-ad-form-amountType">
                            <p className="add-ad-form-row-key">Кол-во пользователей</p>
                            <RadioGroup className="add-ad-form-amountType-radioGroup" name="amountType" defaultValue={data.amountType ?? "min"} buttonsProps={[
                                {label: "Минимум", value: "min"},
                                {label: "Максимум", value: "max"},
                            ]} />
                        </div>
                        
                        <div className="add-ad-form-amount">
                            <TextField className="add-ad-TextField" type="number" name="amount" value={amount ? amount : ""} onChange={e => setAmount(e.target.value ? +e.target.value : 0)} required/>
                            <InputRange min={1} max={10000} step={1} value={amount} onChange={e => setAmount(+e.target.value)} className="add-ad-form-amount" />
                        </div>
                        {/* <TextField type="number" name="min" defaultValue={data.min} placeholder="Введите кол-во"/> */}
                    </div>

                    <div className="add-ad-form-row">
                        <p className="add-ad-form-row-key">Цена за человека</p>
                        
                        <div className="add-ad-form-sum">
                            <TextField className="add-ad-TextField add-ad-form-sum-TextField" type="number" name="price" defaultValue={data.price} placeholder="5 - 10 000" required/>
                            <Select name="currencyType" defaultValue={data.currencyType} optionsProps={
                                additional.currencyTypes.map(val => ({value: val}))
                            }/>
                        </div>
                    </div>

                    <div className="add-ad-form-row">
                        <p className="add-ad-form-row-key">Тип размещения</p>

                        <div className="add-ad-form-row-radio">
                            <RadioGroup name="placing" defaultValue={data.placing ?? "free"} buttonsProps={[
                                {label: "Бесплатное", value: "free"},
                                {label: "Платное", value: "pay"},
                            ]}/>
                        </div>
                    </div>

                    {/* <div className="add-ad-form-row">
                        <p className="add-ad-form-row-key">Название</p>

                        <TextField type="text" name="name" defaultValue={data.name} placeholder="Введите название"/>
                    </div>
                    <div className="add-ad-form-row">
                        <p className="add-ad-form-row-key">Описание</p>

                        <TextField type="text" name="description" defaultValue={data.description} placeholder="Введите описание"/>
                    </div> */}
                </div>

                <Button disabled={!valid} type="submit">Далее</Button>
            </form>
        </div>
    )
}
