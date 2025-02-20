import { useEffect, useState } from "react"
import arrows from "../../shared/assets/svg/filter_arrow.svg"
import { Ad, RadioGroup } from "../../shared/ui"
import "./AdsPage.css"
import { useDispatch } from "react-redux"
import { useQuery } from "@tanstack/react-query"
import { AdOut, AdStatus, CategoriesAds, OrdersService } from "../../shared/api"
import { LoadingAnimation } from "../../shared/ui/LottieAnimations"
import { useAppSelector } from "../../app/providers/store"
import { useNavigate } from "react-router-dom"
import { RoutePaths } from "../../app/providers/router"
import { pagesActions } from "../../entities/Pages/slice/pagesSlice"

type FilterProps = {
    name: string,
    chosen?: string
}
function Filter({name, chosen}: FilterProps) {
    const dispatch = useDispatch()
    
    return (
        <button className="filter" onClick={() => dispatch(pagesActions.toggleAdsActiveFilter(name))}>
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
        state => state.pages.ads.activeFilter
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
        state => state.pages.ads.filterData.theme
    )
    const additional = useAppSelector(
        state => state.additional
    )
    const dispatch = useDispatch()
    
    return (
        <RadioGroup
            className="filter-content-container"
            onChange={val => dispatch(pagesActions.setAdsTheme(val == "undefined" ? undefined : val))}
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
        state => state.pages.ads.filterData.currencyType
    )
    const additional = useAppSelector(
        state => state.additional
    )
    const dispatch = useDispatch()
    
    return (
        <RadioGroup
            className="filter-content-container"
            onChange={val => dispatch(pagesActions.setAdsCurrencyType(val == "undefined" ? undefined : val))}
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
        state => state.pages.ads.filterData.isVip
    )
    const dispatch = useDispatch()

    return (
        <RadioGroup
            className="filter-content-container"
            onChange={val => dispatch(pagesActions.setAdsIsVip(val == "undefined" ? undefined : val == "true"))}
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
        state => state.pages.ads.filterData.guaranteed
    )
    const dispatch = useDispatch()

    return (
        <RadioGroup
            className="filter-content-container"
            onChange={val => {dispatch(pagesActions.setAdsGuaranteed(val == "undefined" ? undefined : val == "true"))}}
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

    const {filterData, activeFilter} = useAppSelector(
        state => state.pages.ads,
    )
    const userUuid = useAppSelector(s => s.user.data?.uuid)

    const {data, isFetching} = useQuery({
        queryKey: ['getOrders', filterData.theme],
        queryFn: async () => {           
            return (await OrdersService.getAdsApiV1P2POrdersAdsGet(filterData.theme as CategoriesAds)).sort((a, b) => {
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
            
            if (filterData.guaranteed != undefined && filterData.guaranteed != Boolean(ad.guaranteed_traffic))
                return false
            
            if (filterData.isVip != undefined && filterData.isVip != ad.user_vip)
                return false
            
            if (filterData.currencyType != undefined && filterData.currencyType != ad.currency_type)
                return false
    
            return true
        }))
    },
        [filterData, data]
    )
        
    
    return (
        <>
            <div className="filters container">
                <div className="filters-list">
                    <Filter name="Тематика" chosen={filterData.theme}/>
                    <Filter name="Оплата" chosen={filterData.currencyType} />
                    <Filter name="VIP" chosen={filterData.isVip == undefined ? undefined : filterData.isVip ? "Есть" : "Нет"}/>
                    <Filter name="Аудитория" chosen={filterData.guaranteed == undefined ? undefined : filterData.guaranteed ? "Гарантирована" : "Не гарантирована"}/>
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
