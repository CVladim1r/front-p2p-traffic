import arrows from "../../shared/assets/svg/filter_arrow.svg"
import { Ad, AdProps } from "../../shared/ui"
import "./AdsPage.css"

type FilterProps = {
    name: string,
    filter_function?: (ad: AdProps) => boolean
}

function Filter({name}: FilterProps) {
    return (
        <button className="filter">
            <div className="filter-text">
                <p className="filter-name">{name}</p>
                <p className="filter-chosen">Все</p>
            </div>
            <img src={arrows} alt="" />
        </button>
    )
}


export default function AdsPage() {
    const testData: (AdProps & {id: number})[] = [
        {id: 0, user: {username: "victor_per", rating: 4.99, is_vip: true}, data: {source: "Тапалка",  price: 1, type: "за пользователя", guaranteed: true, min: 10000, pay: "USDT (TON)"}},
        {id: 1, user: {username: "victor_per", rating: 5.00, is_vip: false}, data: {source: "Тапалка", price: 1, type: "за пользователя", guaranteed: true, min: 10000, pay: "USDT (TON)"}},
        {id: 2, user: {username: "victor_per", rating: 4.87, is_vip: true}, data: {source: "Тапалка",  price: 1, type: "за пользователя", guaranteed: true, min: 10000, pay: "USDT (TON)"}},
        {id: 3, user: {username: "victor_per", rating: 4.99, is_vip: false}, data: {source: "Тапалка", price: 1, type: "за пользователя", guaranteed: true, min: 10000, pay: "USDT (TON)"}},
        {id: 4, user: {username: "victor_per", rating: 4.99, is_vip: false}, data: {source: "Тапалка", price: 1, type: "за пользователя", guaranteed: true, min: 10000, pay: "USDT (TON)"}},
    ]

    return (
        <>
            <div className="filters container">
                <Filter name="Оплата"/>
                <Filter name="VIP"/>
                <Filter name="Источник"/>
                <Filter name="Приход"/>
                <Filter name="Формат"/>
            </div>
            <div className="ads container">
                {testData.map(value => (
                    <Ad key={value.id} {...value}/>
                ))}
            </div>
        </>
    )
}
