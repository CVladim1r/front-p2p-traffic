import { useEffect, useRef, useState } from "react"
import arrows from "../../shared/assets/svg/filter_arrow.svg"
import { Ad, AdProps, RadioGroup } from "../../shared/ui"
import "./AdsPage.css"
import { useDispatch, useSelector } from "react-redux"
import { StateSchema } from "../../app/providers/store"
import { filtersActions } from "../../entities/Filters"

type FilterProps = {
    name: string,
    chosen: string
}
function Filter({name, chosen}: FilterProps) {
    const dispatch = useDispatch()
    
    return (
        <button className="filter" onClick={() => dispatch(filtersActions.toggleActiveFilter(name))}>
            <div className="filter-text">
                <p className="filter-name">{name}</p>
                <p className="filter-chosen">{chosen ? chosen : "Все"}</p>
            </div>
            <img src={arrows} alt="" />
        </button>
    )
}

function FiltersContent() {
    const activeName = useSelector(
        (state: StateSchema) => state.filters.activeFilter
    )
    
    switch (activeName) {
        case "Оплата": return <CurrencyTypeContent />
        case "VIP": return <VipContent />
        case "Источник": return <SourceContent />
        case "Аудитория": return <GuaranteedContent />
    }
}

function CurrencyTypeContent() {
    const currencyTypes = useSelector(
        (state: StateSchema) => state.filters.data.currencyTypes
    )
    const additional = useSelector(
        (state: StateSchema) => state.additional
    )
    const dispatch = useDispatch()
    
    return (
        <>
            {additional.currencyTypes.map(val => (
                <label key={val}>
                    {val}
                    <input
                        type="checkbox"
                        onChange={() => dispatch(filtersActions.toggleCurrencyType(val))}
                        checked={currencyTypes.includes(val)}
                    />
                </label>
            ))}
        </>
    )
}
function VipContent() {
    const isVip = useSelector(
        (state: StateSchema) => state.filters.data.isVip
    )
    const dispatch = useDispatch()

    return (
        <RadioGroup onChange={val => {dispatch(filtersActions.setIsVip(val == "undefined" ? undefined : val == "true"))}} defaultValue={isVip == undefined ? "undefined" : isVip ? "true" : "false"} buttonsProps={[
            {label: "Все", value: "undefined"},
            {label: "Есть", value: "true"},
            {label: "Нету", value: "false"},
        ]} />
    )
}
function SourceContent() {
    const availableSources = useRef([...new Set(testData.map(val => val.data.source))])
    const sources = useSelector(
        (state: StateSchema) => state.filters.data.sources
    )
    const dispatch = useDispatch()

    return (
        <>
            {availableSources.current.map(val => {
                if (val == undefined)
                    return

                return (
                    <label key={val}>
                        {val}
                        <input
                            type="checkbox"
                            onChange={() => dispatch(filtersActions.toggleSource(val))}
                            checked={sources.includes(val)}
                        />
                    </label>
                )
            })}
        </>
    )
}
function GuaranteedContent() {
    const guaranteed = useSelector(
        (state: StateSchema) => state.filters.data.guaranteed
    )
    const dispatch = useDispatch()

    return (
        <RadioGroup onChange={val => {dispatch(filtersActions.setGuaranteed(val == "undefined" ? undefined : val == "true"))}} defaultValue={guaranteed == undefined ? "undefined" : guaranteed ? "true" : "false"} buttonsProps={[
            {label: "Все", value: "undefined"},
            {label: "Гарантирован", value: "true"},
            {label: "Не гарантирован", value: "false"},
        ]} />
    )
}


const testData: (AdProps & {id: number}) [] = [
    {id: 0, user: {username: "victor_per", deals: 3, rating: 4.99, is_vip: true}, data: {source: "Тапалка",  price: 112, guaranteed: true, amount: 10000, currencyType: "USDT", placing: "free"}},
    {id: 1, user: {username: "victor_per", deals: 6, rating: 5.00, is_vip: false}, data: {source: "Телеграмм канал", price: 124, guaranteed: true, amount: 10000, currencyType: "TON", placing: "free"}},
    {id: 2, user: {username: "victor_per", deals: 134, rating: 4.87, is_vip: true}, data: {source: "Фармилка",  price: 31, guaranteed: true, amount: 10000, currencyType: "NOT", placing: "pay"}},
    {id: 3, user: {username: "victor_per", deals: 61, rating: 4.99, is_vip: false}, data: {source: "Тапалка", price: 1.4, guaranteed: true, amount: 10000, currencyType: "BITCOIN", placing: "free"}},
    {id: 4, user: {username: "victor_per", deals: 4, rating: 4.99, is_vip: false}, data: {source: "Фармилка", price: 411, guaranteed: true, amount: 10000, currencyType: "SOLANA", placing: "pay"}},
]
testData.sort((a, b) => {
    if (a.data.placing == b.data.placing)
        return 0

    if (a.data.placing == "pay")
        return -1

    return 1
})

export default function AdsPage() {    
    const [ads, setAds] = useState(testData)
    const filtersData = useSelector(
        (state: StateSchema) => state.filters.data,
    )

    useEffect(() => {
        setAds(testData.filter(ad => {
                    if (filtersData.guaranteed != undefined && filtersData.guaranteed != ad.data.guaranteed)
                        return false
                    
                    if (filtersData.isVip != undefined && filtersData.isVip != ad.user.is_vip)
                        return false
                    
                    if (filtersData.currencyTypes.length != 0)
                        if (!filtersData.currencyTypes.includes(ad.data.currencyType ?? ""))
                            return false

                    if (filtersData.sources.length != 0)
                        if (!filtersData.sources.includes(ad.data.source ?? ""))
                            return false

                    return true
                }))
        },
        [filtersData])

    return (
        <>
            <div className="filters container">
                <div className="filters-list">
                    <Filter name="Оплата" chosen={filtersData.currencyTypes.toString()} />
                    <Filter name="VIP" chosen={filtersData.isVip == undefined ? "Все" : filtersData.isVip ? "Есть" : "Нету"}/>
                    <Filter name="Источник" chosen={filtersData.sources.toString()}/>
                    <Filter name="Аудитория" chosen={filtersData.guaranteed == undefined ? "Все" : filtersData.guaranteed ? "Гарантирована" : "Не гарантирована"}/>
                </div>
                <div className="filters-bottom-row">
                    <div className="filters-data">
                        <FiltersContent />
                    </div>
                </div>
            </div>
            <div className="ads container">
                {ads.map(value => (
                    <Ad key={value.id} {...value}/>
                ))}
            </div>
        </>
    )
}
