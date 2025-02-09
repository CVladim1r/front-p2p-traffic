import { useEffect, useState } from "react"
import arrows from "../../shared/assets/svg/filter_arrow.svg"
import { Ad, RadioGroup } from "../../shared/ui"
import "./AdsPage.css"
import { useDispatch } from "react-redux"
import { filtersActions } from "../../entities/Filters"
import { useQuery } from "@tanstack/react-query"
import { AdOut, AdStatus, CategoriesAds, OrdersService } from "../../shared/api"
import { LoadingAnimation } from "../../shared/ui/LottieAnimations"
import { useAppSelector } from "../../app/providers/store"
import { useNavigate } from "react-router-dom"
import { RoutePaths } from "../../app/providers/router"

type FilterProps = {
    name: string,
    chosen?: string
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
    const activeName = useAppSelector(
        state => state.filters.activeFilter
    )
    
    switch (activeName) {
        case "Тематика": return <ThemeContent />
        case "Оплата": return <CurrencyTypeContent />
        case "VIP": return <VipContent />
        case "Аудитория": return <GuaranteedContent />
    }
}

function ThemeContent() {
    const theme = useAppSelector(
        state => state.filters.data.theme
    )
    const additional = useAppSelector(
        state => state.additional
    )
    const dispatch = useDispatch()
    
    return (
        <RadioGroup
            className="filter-content-container"
            onChange={val => dispatch(filtersActions.setTheme(val == "undefined" ? undefined : val))}
            defaultValue={theme == undefined ? "undefined" : theme}
            buttonsProps={
                [{label: "Все", value: "undefined"}].concat(
                    additional.categories.map(val => {return {label: val, value: val}})
                )
            }
        />
    )
}

function CurrencyTypeContent() {
    const currencyType = useAppSelector(
        state => state.filters.data.currencyType
    )
    const additional = useAppSelector(
        state => state.additional
    )
    const dispatch = useDispatch()
    
    return (
        <RadioGroup
            className="filter-content-container"
            onChange={val => dispatch(filtersActions.setCurrencyType(val == "undefined" ? undefined : val))}
            defaultValue={currencyType == undefined ? "undefined" : currencyType}
            buttonsProps={
                [{label: "Все", value: "undefined"}].concat(
                    additional.currencyTypes.map(val => {return {label: val, value: val}})
                )
            }
        />
    )
}
function VipContent() {
    const isVip = useAppSelector(
        state => state.filters.data.isVip
    )
    const dispatch = useDispatch()

    return (
        <RadioGroup
            className="filter-content-container"
            onChange={val => dispatch(filtersActions.setIsVip(val == "undefined" ? undefined : val == "true"))}
            defaultValue={isVip == undefined ? "undefined" : isVip ? "true" : "false"}
            buttonsProps={[
                {label: "Все", value: "undefined"},
                {label: "Есть", value: "true"},
                {label: "Нет", value: "false"},
            ]}
        />
    )
}
function GuaranteedContent() {
    const guaranteed = useAppSelector(
        state => state.filters.data.guaranteed
    )
    const dispatch = useDispatch()

    return (
        <RadioGroup
            className="filter-content-container"
            onChange={val => {dispatch(filtersActions.setGuaranteed(val == "undefined" ? undefined : val == "true"))}}
            defaultValue={guaranteed == undefined ? "undefined" : guaranteed ? "true" : "false"}
            buttonsProps={[
                {label: "Все", value: "undefined"},
                {label: "Гарантирована", value: "true"},
                {label: "Не гарантирована", value: "false"},
            ]}
        />
    )
}

export default function AdsPage() {    
    const [ads, setAds] = useState<AdOut[]>([])

    const navigate = useNavigate()

    const filtersData = useAppSelector(
        state => state.filters.data,
    )
    const activeFilter = useAppSelector(
        state => state.filters.activeFilter
    )
    const userUuid = useAppSelector(s => s.user.data?.uuid)

    const {data, isFetching} = useQuery({
        queryKey: ['getOrders', filtersData.theme],
        queryFn: async () => {           
            return (await OrdersService.getAdsApiV1P2POrdersAdsGet(filtersData.theme as CategoriesAds)).sort((a, b) => {
                if (a.is_paid_promotion == b.is_paid_promotion)
                    return 0
        
                if (a.is_paid_promotion)
                    return -1
        
                return 1
            })
        }
    })

    useEffect(() => {
        setAds((data ?? []).filter(ad => {
            if (ad.status != AdStatus.ACTIVE) //WAIT
                return false
            
            if (filtersData.guaranteed != undefined && filtersData.guaranteed != Boolean(ad.guaranteed_traffic))
                return false
            
            if (filtersData.isVip != undefined && filtersData.isVip != ad.user_vip)
                return false
            
            if (filtersData.currencyType != undefined && filtersData.currencyType != ad.currency_type)
                return false
    
            return true
        }))
    },
        [filtersData, data]
    )
        
    
    return (
        <>
            <div className="filters container">
                <div className="filters-list">
                    <Filter name="Тематика" chosen={filtersData.theme}/>
                    <Filter name="Оплата" chosen={filtersData.currencyType} />
                    <Filter name="VIP" chosen={filtersData.isVip == undefined ? undefined : filtersData.isVip ? "Есть" : "Нет"}/>
                    <Filter name="Аудитория" chosen={filtersData.guaranteed == undefined ? undefined : filtersData.guaranteed ? "Гарантирована" : "Не гарантирована"}/>
                </div>
                {activeFilter &&
                    <div className="filters-bottom-row">
                        <div className="filters-data">
                            <FiltersContent />
                        </div>
                    </div>
                }
                
            </div>
            <div className="ads container">
                { isFetching ?
                    <LoadingAnimation />
                :
                    ads.length ?
                        ads.map(value => (
                            <Ad key={value.uuid} onClickBuy={() => navigate({pathname: `${RoutePaths.ads}/${value.uuid}`})} showButtons={import.meta.env.DEV || value.user != userUuid} showUserData={true} {...value}/>
                        ))
                    :
                        <p className="ads-message-lonely">Пока отсутствуют активные сделки по данным критериям</p>
                }
            </div>
        </>
    )
}
