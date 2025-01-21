import { FormEvent } from "react"
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

export default function AddAdPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const additional = useSelector(
        (state: StateSchema) => state.additional
    )
    
    const data = useSelector(
        (state: StateSchema) => state.addAd.data,
        () => true
    ) ?? {
        guaranteed: true,
        pay: "",
        source: "",
        type: "",
        description: "",
        name: "",
        placing: "free",
        theme: "",
    }

    const formSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const {min, price, description, guaranteed, name, placing, source, theme} = Object.fromEntries(formData)
        console.log(guaranteed)
        console.log(source)
        console.log(theme)
        console.log(min)
        console.log(price)
        console.log(placing)
        console.log(name)
        console.log(description)
        dispatch(addAdActions.setData({
            guaranteed: guaranteed=="true",
            min: +min,
            pay: "TON",
            price: +price,
            source: source.toString(),
            type: "За пользователя",
            description: description.toString(),
            name: name.toString(),
            placing: placing == "free" ? "free" : "pay",
            theme: theme.toString()
        }))
        navigate(RoutePaths.previewAd)
    }

    return (
        <div className="add-ad container">
            <p className="add-ad-header">Создайте объявление</p>
            <form onSubmit={formSubmit} className="add-ad-form">
                <div className="add-ad-form-content">
                    <div className="add-ad-form-row">
                        <p className="add-ad-form-row-key">Приход</p>

                        <RadioGroup name="guaranteed" defaultValue={data.guaranteed ? "true" : "false"} buttonsProps={[
                            {label: "Гарантирован", value: "true"},
                            {label: "Не гарантирован", value: "false"},
                        ]} />
                    </div>
                    <div className="add-ad-form-row">
                        <p className="add-ad-form-row-key">Источник</p>

                        <TextField className="add-ad-TextField" type="text" name="source" placeholder="Введите ссылку..." defaultValue={data.source}/>
                    </div>
                    <div className="add-ad-form-row">
                        <p className="add-ad-form-row-key">Тематика</p>

                        <Select name="theme" defaultValue={data.theme} optionsProps={
                            additional.categories.map(val => ({value: val.substring(0, val.length - 1)})) //FIXME: темы без скобочек будут -> убрать substring
                        }/>
                    </div>
                    <div className="add-ad-form-row">
                        <div className="add-ad-form-amount">
                            <p className="add-ad-form-row-key">Кол-во пользователей</p>
                            <RadioGroup className="add-ad-form-amount-radioGroup" buttonsProps={[
                                {label: "Минимум", value: "min"},
                                {label: "Максимум", value: "max"},
                            ]} />
                        </div>

                        {/* <TextField type="number" name="min" defaultValue={data.min} placeholder="Введите кол-во"/> */}
                    </div>
                    <div className="add-ad-form-row">
                        <p className="add-ad-form-row-key">Сумма</p>
                        
                        <div className="add-ad-form-sum">
                            <TextField className="add-ad-TextField" type="number" name="price" defaultValue={data.price} placeholder="5 - 10 000"/>
                            <Select name="money-type" defaultValue="USDT" optionsProps={
                                additional.currencyTypes.map(val => ({value: val}))
                            }/>
                        </div>
                    </div>
                    <div className="add-ad-form-row">
                        <p className="add-ad-form-row-key">Приход</p>

                        <div className="add-ad-form-row-radio">
                            <RadioGroup name="placing" defaultValue={data.placing} buttonsProps={[
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

                <Button disabled={true} type="submit">Далее</Button>
            </form>
        </div>
    )
}
