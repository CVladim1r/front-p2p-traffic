import { useNavigate } from "react-router-dom"
import {
    Button,
    Select,
    TextField
}
from "../../shared/ui"
import "./AddAdPage.css"
import { useDispatch } from "react-redux"
import { addAdActions } from "../../entities/AddAd/slice/addAdSlice"
import { RoutePaths } from "../../app/providers/router"
import { FormEvent, ReactNode, useState } from "react"
import { CategoriesAds, TransactionCurrencyType, TypeUserAcquisition } from "../../shared/api"
import { formatNumberTo3 } from "../../shared/lib/lib"
import { Switch } from "../../shared/ui/Form/Switch/Switch"
import { useAppSelector } from "../../app/providers/store"
import infoSvg from "../../shared/assets/svg/info.svg"
import closeImg from "../../shared/assets/svg/close.svg"

const paid_cost: {[key: string]: number} = {
    "TON": 1.4,
    "USDT": 5,
}

type FormRowProps = {
    name: string,
    contentChildren?: ReactNode,
    description?: string
    infoChildren?: ReactNode,
}

function FormRow({name, contentChildren, infoChildren, description}: FormRowProps) {
    const [showDescription, setShowDescription] = useState(false)
    
    return (
        <div className="add-ad-form-row">
            <div className="add-ad-form-row-content">
                <div className="add-ad-form-row-field">
                    {description != undefined &&
                        <Button className="add-ad-form-row-field-button" onClick={() => setShowDescription(!showDescription)}>
                            <img src={infoSvg} alt="" />
                        </Button>
                    }
                    <p className="add-ad-form-row-key">{name}</p>
                </div>

                {contentChildren}
            </div>

            {showDescription && 
                <p className="add-ad-form-row-content add-ad-form-row-description">
                    {description}
                </p>
            }

            {infoChildren != undefined && 
                <div className="add-ad-form-row-content add-ad-form-row-info">
                    {infoChildren}
                </div>
            }
        </div>
    )
}

export default function AddAdPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const additional = useAppSelector(
        state => state.additional
    )

    const balance = useAppSelector(s => s.user.data?.balance ?? {})
    
    const data = useAppSelector(
    state => state.addAd.data,
        () => true
    )

    const formSubmit = (e: FormEvent) => {
        e.preventDefault()

        dispatch(addAdActions.setData({
            guaranteed_traffic: ad_type == TypeUserAcquisition.MOTIVE ? 0 : guaranteed_traffic,
            link_to_channel: source,
            category,
            ad_type,
            minimum_traffic,
            maximum_traffic,
            price,
            currency_type: currencyType,
            is_paid_promotion,
            title, 
            description,
            conditions,
            user_currency_for_payment: userPayCurrencyType,
        }))
        
        navigate(RoutePaths.previewAd)
    }

    const isValid = () => source && conditions && title && description && price > 0 && minimum_traffic > 0 &&
        (ad_type == TypeUserAcquisition.MOTIVE || guaranteed_traffic > 0) &&
        (ad_type != TypeUserAcquisition.MOTIVE || maximum_traffic > 0 && minimum_traffic <= maximum_traffic) &&
        (!is_paid_promotion || (balance[userPayCurrencyType] ?? 0) >= paid_cost[userPayCurrencyType])

    const [guaranteed_traffic, setGuaranteed_traffic] = useState(data?.guaranteed_traffic ?? 0)
    const savedSource = useAppSelector(
        state => state.addAd.savedSource
    )
    const [source, setSource] = useState(savedSource ?? "")
    const [category, setCategory] = useState(data?.category ?? additional.categories[0] as CategoriesAds)
    const [ad_type, setAd_type] = useState(data?.ad_type ?? additional.userAcquisitionType[0] as TypeUserAcquisition)
    const [minimum_traffic, setMinimum_traffic] = useState(data?.minimum_traffic ?? 0)
    const [maximum_traffic, setMaximum_traffic] = useState(data?.maximum_traffic ?? 0)
    const [price, setPrice] = useState(data?.price ?? 0)
    const [currencyType, setCurrencyType] = useState(data?.currency_type ?? additional.currencyTypes[0] as TransactionCurrencyType)
    const [is_paid_promotion, setIs_paid_promotion] = useState(data?.is_paid_promotion ?? false)
    const [userPayCurrencyType, setUserPayCurrencyType] = useState(data?.user_currency_for_payment ?? additional.currencyTypes[0] as TransactionCurrencyType)
    const [conditions, setConditions] = useState(data?.conditions ?? "")
    const [title, setTitle] = useState(data?.title ?? "")
    const [description, setDescription] = useState(data?.description ?? "")    

    const [showModal, setShowModal] = useState(false)

    return (
        <div className="add-ad container">
            <div className="add-ad-header">
                <p className="add-ad-header-text">Создайте объявление</p>
                <Button className="add-ad-header-info-button" onClick={() => setShowModal(true)}>
                    <img src={infoSvg} alt="" />
                </Button>
            </div>

            <div className={showModal ? "modalInfo-dark-background active" : "modalInfo-dark-background"} onClick={() => setShowModal(false)} />
            <div className={showModal ? "modalInfo active" : "modalInfo"}>
                <div className="modalInfo-main">
                    <Button className="modalInfo-close" onClick={() => setShowModal(false)}>
                        <img src={closeImg} alt="" />
                    </Button>

                    <ul className="modalInfo-list">
                        <li className="modalInfo-list-elem">Источник - оставьте ссылку на источник где будет выложена реклама</li>
                        <li className="modalInfo-list-elem">Тематика - выбери тематику вашего проекта</li>
                        <li className="modalInfo-list-elem">Сумма - цена рекламы вашем ресурсе</li>
                        <li className="modalInfo-list-elem">Гарантированно зайдет - минимальная отдача в виде переходов от вашего проекта</li>
                        <li className="modalInfo-list-elem">Условия - какие продукты вы рекламируете</li>
                        <li className="modalInfo-list-elem">Название - вкратце о вашем проекте</li>
                        <li className="modalInfo-list-elem">Описание - более подробно о вашем проекте</li>
                    </ul>
                </div>
            </div>

            <form onSubmit={formSubmit} className="add-ad-form">
                <div className="add-ad-form-content">

                    <FormRow 
                        name="Источник"
                        contentChildren={
                            <div className="add-ad-form-source">
                                <TextField className="add-ad-TextField" type="text" name="source" placeholder="Введите ссылку" value={source} onChange={e => setSource(e.target.value)} required/>
                                <Button type="button" onClick={() => dispatch(addAdActions.setSavedSource(source))} className={source == "" || source == savedSource ? "add-ad-form-source-button hidden" : "add-ad-form-source-button"}>Сохранить</Button>
                            </div>
                        }
                        // description="Оставьте ссылку на источник где будет выложена реклама"
                    />

                    <FormRow 
                        name="Тематика"
                        contentChildren={
                            <Select onChange={val => setCategory(val as CategoriesAds)} defaultValue={category} optionsData={
                                additional.categories.map(val => ({value: val}))
                            }/>
                        }
                        // description="Выбери тематику вашего проекта"
                    />

                    <FormRow
                        name="Тип байта"
                        contentChildren={
                            <Select onChange={val => setAd_type(val as TypeUserAcquisition)} defaultValue={ad_type} optionsData={
                                additional.userAcquisitionType.map(val => ({value: val}))
                            }/>
                        }
                    />

                   <FormRow
                        name="Кол-во пользователей"
                        contentChildren={
                            <div className="add-ad-form-amount">
                                <div className="add-ad-form-amount-container">
                                    {ad_type == TypeUserAcquisition.MOTIVE && <p className="add-ad-form-amount-key">От</p> }
                                    <TextField className="add-ad-TextField add-ad-form-amount-TextField" placeholder={ad_type != TypeUserAcquisition.MOTIVE ? "Введите число" : ""} type="number" value={minimum_traffic ? minimum_traffic : ""} onChange={e => setMinimum_traffic(e.target.value ? +e.target.value : 0)} required/>
                                </div>
                                {ad_type == TypeUserAcquisition.MOTIVE &&
                                    <div className="add-ad-form-amount-container">
                                        <p className="add-ad-form-amount-key">До</p>
                                        <TextField className="add-ad-TextField add-ad-form-amount-TextField" type="number" value={maximum_traffic ? maximum_traffic : ""} onChange={e => setMaximum_traffic(e.target.value ? +e.target.value : 0)} required/>
                                    </div>
                                }
                            </div>
                        }
                   />

                    {ad_type != TypeUserAcquisition.MOTIVE &&
                        <FormRow
                            name="Гарантированно зайдет"
                            contentChildren={
                                <TextField className="add-ad-TextField" placeholder="Введите число" type="number" value={guaranteed_traffic ? guaranteed_traffic : ""} onChange={e => setGuaranteed_traffic(e.target.value ? +e.target.value : 0)} required />
                            }
                            // description="Минимальная отдача в виде переходов от вашего проекта"
                        />
                    }   

                    <FormRow 
                        name="Сумма"
                        contentChildren={
                            <div className="add-ad-form-sum">
                                <TextField className="add-ad-TextField add-ad-form-sum-TextField" type="number" value={price ? price : ""}  onChange={e => setPrice(e.target.value ? +e.target.value : 0)} placeholder="Введите число" required/>
                                <Select onChange={val => setCurrencyType(val as TransactionCurrencyType)} defaultValue={currencyType} optionsData={
                                    additional.currencyTypes.map(val => ({value: val}))
                                }/>
                            </div>
                        }
                        infoChildren={
                            ad_type != TypeUserAcquisition.MOTIVE ?
                                undefined
                            :
                                <p>Цена за человека ≈ {minimum_traffic && maximum_traffic && price ? formatNumberTo3(price * 2 / (maximum_traffic + minimum_traffic)) : "0"} {currencyType}</p>
                        }
                        // description="Цена рекламы Вашем ресурсе"
                    />

                    <FormRow
                        name="Платное размещение"
                        contentChildren={
                            <Switch onChange={e => setIs_paid_promotion(e.target.checked)} checked={is_paid_promotion}/>
                        }
                        infoChildren={
                            <>
                                <p>Стоимость ≈ {is_paid_promotion ? `${paid_cost[userPayCurrencyType]} ${userPayCurrencyType}` : "5 $"}</p>
                                <Select className={is_paid_promotion ? "add-ad-form-userpay-currency show" : "add-ad-form-userpay-currency"} fontSize={12} onChange={val => setUserPayCurrencyType(val as TransactionCurrencyType)} defaultValue={userPayCurrencyType} optionsData={
                                    additional.currencyTypes.map(val => ({value: val}))
                                } />
                            </>
                        }
                    />

                    <FormRow 
                        name="Условия"
                        contentChildren={
                            <TextField type="text" value={conditions} onChange={e => setConditions(e.target.value)} placeholder="Введите условия" required/>
                        }
                        // description="Какие продукты вы рекламируете"
                    />

                    <FormRow
                        name="Название"
                        contentChildren={
                            <TextField type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Введите название" required/>
                        }
                        // description="Вкратце о вашем проекте"
                    />

                    <FormRow
                        name="Описание"
                        contentChildren={
                            <TextField className="add-ad-textarea" type="textarea" rows={3} value={description}  onChange={e => setDescription(e.target.value)} placeholder="Введите описание" required/>
                        }
                        // description="Более подробно о вашем проекте"
                    />

                </div>

                <Button disabled={!isValid()} type="submit">Далее</Button>
            </form>
        </div>
    )
}
