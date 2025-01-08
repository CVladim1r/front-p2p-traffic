import "./Ads.css"
import testuser from "../assets/testuser1.png"
import share from "../assets/share.svg"
import { useState } from "react"

type FilterProps = {
    name: string,
    filter_function?: (ad: AdProps) => boolean
}

function Filter({name}: FilterProps) {
    //
    return (
        <div className="filter">
            <p className="filter-name">{name}</p>
            <p className="filter-chosen">Все</p>
        </div>
    )
}


type UserInfo = {
    username: string,
    profile_picture: string,
    deals: number,
    rating: number
}

type AdProps = {
    id: number,
    price: string,
    type: string,
    user: UserInfo,
    source: string,
    income_guaranteed: boolean,
    income_min: number,
    pay: string,
}

function Ad({price, type, user, source, income_guaranteed, income_min, pay}: AdProps) {


    return (
        <div className="ad">
            <div className="ad-top-row">
                <div>
                    <p className="ad-top-row-price">{price}</p>
                    <p className="ad-top-row-type">{type}</p>
                </div>
                <div className="ad-top-row-buttons">
                    <button className="ad-top-row-buttons-share"
                        onClick={() => 
                            console.log("share button")
                        }
                    >
                        <img src={share} alt="" />
                    </button>
                    <button className="ad-top-row-buttons-buy"
                        onClick={() => 
                            console.log("buy button")
                        }
                    >
                        BUY
                    </button>
                </div>
            </div>
            <div className="ad-content">
                <div className="ad-content-user">
                    <img src={user.profile_picture} alt="" className="ad-content-user-img"/>
                    <p className="ad-content-user-name">{user.username}</p>
                    <p className="ad-content-user-info">сделок: {user.deals} • {user.rating}</p>
                </div>
                <div className="ad-content-info-elem">
                    <p className="ad-content-info-elem-key">Источник</p>
                    <p className="ad-content-info-elem-value">{source}</p>
                </div>
                <div className="ad-content-info-elem">
                    <p className="ad-content-info-elem-key">Приход</p>
                    <p className="ad-content-info-elem-value">{income_guaranteed ? "Гарантирован" : "Не гарантирован"} (минимум {income_min}) </p>
                </div>
                <div className="ad-content-info-elem">
                    <p className="ad-content-info-elem-key">Оплата</p>
                    <p className="ad-content-info-elem-value">{pay}</p>
                </div>
            </div>
        </div>
    )
}

let testData: AdProps[] = [
    {id: 0, price: "1 USDT", type: "за пользователя", user: {username: "victor_per", profile_picture: testuser, deals: 356, rating: 4.99}, source: "Тапалка", income_guaranteed: true, income_min: 10000, pay: "USDT (TON)"},
    {id: 1, price: "1 USDT", type: "за пользователя", user: {username: "victor_per", profile_picture: testuser, deals: 36, rating: 5.00}, source: "Тапалка", income_guaranteed: true, income_min: 10000, pay: "USDT (TON)"},
    {id: 2, price: "1 USDT", type: "за пользователя", user: {username: "victor_per", profile_picture: testuser, deals: 6, rating: 4.87}, source: "Тапалка", income_guaranteed: true, income_min: 10000, pay: "USDT (TON)"},
    {id: 3, price: "1 USDT", type: "за пользователя", user: {username: "victor_per", profile_picture: testuser, deals: 36, rating: 4.99}, source: "Тапалка", income_guaranteed: true, income_min: 10000, pay: "USDT (TON)"},
    {id: 4, price: "1 USDT", type: "за пользователя", user: {username: "victor_per", profile_picture: testuser, deals: 36, rating: 4.99}, source: "Тапалка", income_guaranteed: true, income_min: 10000, pay: "USDT (TON)"},
]

function Ads() {
    let [ads] =  useState(testData);

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
                {ads.map(value => (
                    <Ad key={value.id} {...value}/>
                ))}
            </div>
        </>
    )
}

export default Ads