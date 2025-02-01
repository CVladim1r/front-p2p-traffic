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
import { FormEvent, useState } from "react"
import { Categories, TransactionCurrencyType } from "../../shared/api"
import { formatNumberTo3 } from "../../shared/lib/lib"

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

    const formSubmit = (e: FormEvent) => {
        e.preventDefault()

        dispatch(addAdActions.setData({
            guaranteed_traffic,
            link_to_channel: source,
            category,
            minimum_traffic,
            maximum_traffic,
            price,
            currency_type: currencyType,
            is_paid_promotion,
            title, 
            description,
            conditions: "pizdec", //NOTE - ??
        }))
        
        navigate(RoutePaths.previewAd)
    }

    const isValid = () => source && minimum_traffic && maximum_traffic && price && title && description && minimum_traffic <= maximum_traffic

    const [guaranteed_traffic, setGuaranteed_traffic] = useState(data?.guaranteed_traffic ?? true)
    const savedSource = useSelector(
        (state: StateSchema) => state.addAd.savedSource
    )
    const [source, setSource] = useState(savedSource ?? "")
    const [category, setCategory] = useState(data?.category ?? additional.categories[0] as Categories)
    const [minimum_traffic, setMinimum_traffic] = useState(data?.minimum_traffic ?? 0)
    const [maximum_traffic, setMaximum_traffic] = useState(data?.maximum_traffic ?? 0)
    const [price, setPrice] = useState(data?.price ?? 0)
    const [is_paid_promotion, setIs_paid_promotion] = useState(data?.is_paid_promotion ?? false)
    const [currencyType, setCurrencyType] = useState(data?.currency_type ?? additional.currencyTypes[0] as TransactionCurrencyType)
    const [title, setTitle] = useState(data?.title ?? "")
    const [description, setDescription] = useState(data?.description ?? "")    

    return (
        <div className="add-ad container">
            <p className="add-ad-header">Создайте объявление</p>
            <form onSubmit={formSubmit} className="add-ad-form">
                <div className="add-ad-form-content">

                    <div className="add-ad-form-row add-ad-form-row-content">
                        <p className="add-ad-form-row-key">Аудитория гарантирована</p>

                        <RadioGroup onChange={val => setGuaranteed_traffic(val == "true")} defaultValue={guaranteed_traffic ? "true" : "false"} buttonsProps={[
                            {label: "Да", value: "true"},
                            {label: "Нет", value: "false"},
                        ]} />
                    </div>
                    
                    <div className="add-ad-form-row add-ad-form-row-content">
                        <p className="add-ad-form-row-key">Источник</p>

                        <div className="add-ad-form-source">
                            <TextField className="add-ad-TextField" type="text" name="source" placeholder="Введите ссылку" value={source} onChange={e => setSource(e.target.value)} required/>
                            <Button type="button" onClick={() => dispatch(addAdActions.setSavedSource(source))} className={source == "" || source == savedSource ? "add-ad-form-source-button hidden" : "add-ad-form-source-button"}>Сохранить</Button>
                        </div>
                    </div>

                    <div className="add-ad-form-row add-ad-form-row-content">
                        <p className="add-ad-form-row-key">Тематика</p>

                        <Select onChange={val => setCategory(val as Categories)} defaultValue={category} optionsData={
                            additional.categories.map(val => ({value: val}))
                        }/>
                    </div>
                    
                    <div className="add-ad-form-row add-ad-form-row-content">
                        <p className="add-ad-form-row-key">Кол-во пользователей</p>
                        
                        <div className="add-ad-form-amount">
                            <div className="add-ad-form-amount-container">
                                <p className="add-ad-form-amount-key">От</p>
                                <TextField className="add-ad-TextField add-ad-form-amount-TextField" type="number" value={minimum_traffic ? minimum_traffic : ""} onChange={e => setMinimum_traffic(e.target.value ? +e.target.value : 0)} required/>
                            </div>
                            <div className="add-ad-form-amount-container">
                                <p className="add-ad-form-amount-key">До</p>
                                <TextField className="add-ad-TextField add-ad-form-amount-TextField" type="number" value={maximum_traffic ? maximum_traffic : ""} onChange={e => setMaximum_traffic(e.target.value ? +e.target.value : 0)} required/>
                            </div>
                        </div>
                    </div>

                    <div className="add-ad-form-row">
                        <div className="add-ad-form-row-content">
                            <p className="add-ad-form-row-key">Сумма</p>
                            
                            <div className="add-ad-form-sum">
                                <TextField className="add-ad-TextField add-ad-form-sum-TextField" type="number" value={price ? price : ""}  onChange={e => setPrice(e.target.value ? +e.target.value : 0)} placeholder="Введите число" required/>
                                <Select onChange={val => setCurrencyType(val as TransactionCurrencyType)} defaultValue={currencyType} optionsData={
                                    additional.currencyTypes.map(val => ({value: val}))
                                }/>
                            </div>
                        </div>
                        <div className="add-ad-form-row-content add-ad-form-row-info">
                            <p>Цена за человека ≈ {minimum_traffic && maximum_traffic && price ? formatNumberTo3(price * 2 / (maximum_traffic + minimum_traffic)) : "-"} {currencyType}</p>
                        </div>
                    </div>

                    <div className="add-ad-form-row add-ad-form-row-content">
                        <p className="add-ad-form-row-key">Платное размещение</p>

                        <div className="add-ad-form-row-radio">
                            <RadioGroup onChange={val => setIs_paid_promotion(val != "free")} defaultValue={is_paid_promotion ? "pay" : "free"} buttonsProps={[
                                {label: "Да", value: "pay"},
                                {label: "Нет", value: "free"},
                            ]}/>
                        </div>
                    </div>

                    <div className="add-ad-form-row add-ad-form-row-content">
                        <p className="add-ad-form-row-key">Название</p>

                        <TextField type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Введите название" required/>
                    </div>
                    <div className="add-ad-form-row add-ad-form-row-content">
                        <p className="add-ad-form-row-key">Описание</p>

                        <TextField type="textarea" rows={3} value={description} onChange={e => setDescription(e.target.value)} placeholder="Введите описание" required/>
                    </div>
                </div>

                <Button disabled={!isValid()} type="submit">Далее</Button>
            </form>
        </div>
    )
}
