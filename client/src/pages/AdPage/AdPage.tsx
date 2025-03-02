import { Ad, BackButton, Button, LoadingAnimation, Select } from "../../shared/ui";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { OrdersService, PrizeOutAddUUID, PrizeService, PrizeType } from "../../shared/api";
import { RoutePaths } from "../../app/providers/router";
import { useAppSelector } from "../../app/providers/store";
import { selectAuthorization } from "../../entities/User";
import "./AdPage.css"
import { Switch } from "../../shared/ui/Form/Switch/Switch";
import { useEffect, useRef, useState } from "react";

type PrizeInfo = {
    uuid: string,
    name: string
}

export default function AdPage() {
    const {id: adUuid} = useParams<{id: string}>()
    if (!adUuid)
        return <Navigate to={{pathname: RoutePaths.ads}} />

    const navigate = useNavigate()
    const authorization = useAppSelector(selectAuthorization)
    const userBalance = useAppSelector(s => s.user.data?.balance ?? {})

    const adInfo = useQuery({
        queryKey: ["adData"],
        queryFn: async () => {
            return await OrdersService.getAdApiV1P2POrdersAdsAdUuidGet(adUuid)
        }
    })

    const [useBonus, setUseBonus] = useState(false)
    const chosenPrizeUuid = useRef<string | null>(null)
    const [availablePrizes, setAvailablePrizes] = useState<PrizeInfo[]>([])
    const prize = useQuery({
        queryKey: ["prize"],
        queryFn: async () => {
            return await PrizeService.getActiveBonusesApiV1P2PPrizeActiveBonusesGet(authorization)
        },
        select(data) {
            return data.filter(val => val.prize_type == PrizeType._3_DISCOUNT || val.prize_type == PrizeType._5_DISCOUNT)
        },
    })
    useEffect(() => {
        if (prize.data) {
            const tmp: {[key in PrizeType]?: PrizeOutAddUUID} = {}
            prize.data.forEach(val => {
                if (!(val.prize_type in tmp) || new Date(tmp[val.prize_type]?.expires_at ?? 0) > new Date(val.expires_at ?? 0))
                    tmp[val.prize_type] = val
            })

            const res: PrizeInfo[] = []
            if (tmp["3%_discount"])
                res.push({uuid: tmp["3%_discount"].prize_uuid, name: "3%"})
            if (tmp["5%_discount"])
                res.push({uuid: tmp["5%_discount"].prize_uuid, name: "5%"})

            setAvailablePrizes(res)
            if (res.length)
                chosenPrizeUuid.current = res[0].uuid
        }
    }, [prize.data])
    
    
    const {mutate, isPending} = useMutation({
        mutationFn: async () => {
            await OrdersService.createDealApiV1P2POrdersDealsPost(authorization, {ad_uuid: adUuid}, useBonus ? chosenPrizeUuid.current : null)
            navigate({pathname: RoutePaths.ads})
        }
    })

    function canBuy() {
        return adInfo.data?.price && userBalance[adInfo.data?.currency_type ?? ""] && userBalance[adInfo.data?.currency_type ?? ""] > adInfo.data.price
    }

    if (adInfo.isLoading)
        return <LoadingAnimation />
    
    if (!adInfo.isSuccess)
        return <Navigate to={{pathname: RoutePaths.ads}}/>

    if (prize.isLoading)
        return <LoadingAnimation />
    
    return (
        <div className="ad container">
            <BackButton onClick={() => navigate({pathname: RoutePaths.ads})} />

            <p className="ad-header">Подтверждение создания</p>
            <div className="ad-content">
                <Ad {...adInfo.data} showInfo={true} showButtons={false}/>
                {availablePrizes.length != 0 &&
                    <div className="ad-bonus">
                        <p className={availablePrizes.length ? "ad-bonus-text" : "ad-bonus-text disabled"}>Использовать бонус?</p>
                        <div className="ad-bonus-info">
                            <Switch
                                checked={useBonus}
                                onChange={e => setUseBonus(e.target.checked)}
                            />
                            <Select
                                optionsData={availablePrizes.map(val => ({
                                    value: val.uuid,
                                    text: val.name
                                }))}
                                onChange={val => chosenPrizeUuid.current = val}
                            />
                        </div>
                    </div>
                }
                <Button disabled={isPending || !canBuy()} onClick={() => mutate()}>{canBuy() ? "Создать сделку" : "Недостаточно средств"}</Button>
            </div>
        </div>
    )
}
