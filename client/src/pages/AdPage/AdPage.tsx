import { Ad, BackButton, Button, LoadingAnimation } from "../../shared/ui";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { OrdersService } from "../../shared/api";
import { RoutePaths } from "../../app/providers/router";
import { useAppSelector } from "../../app/providers/store";
import { selectAuthorization } from "../../entities/User";
import "./AdPage.css"


export default function AdPage() {
    const {id: adUuid} = useParams<{id: string}>()
    if (!adUuid)
        return <Navigate to={{pathname: RoutePaths.ads}} />

    const authorization = useAppSelector(selectAuthorization)
    const userBalance = useAppSelector(s => s.user.data?.balance ?? {})

    const {data} = useQuery({
        queryKey: ["adData"],
        queryFn: async () => {
            return await OrdersService.getAdApiV1P2POrdersAdsAdUuidGet(adUuid)
        }
    })

    const navigate = useNavigate()

    const {mutate, isPending} = useMutation({
        mutationFn: async () => {
            await OrdersService.createDealApiV1P2POrdersDealsPost(authorization, {ad_uuid: adUuid})
            navigate({pathname: RoutePaths.ads})
        }
    })

    function canBuy() {
        return data?.price && userBalance[data?.currency_type ?? ""] && userBalance[data?.currency_type ?? ""] > data.price
    }
    
    if (!data)
        return <LoadingAnimation />
    
    return (
        <div className="ad container">
            <BackButton onClick={() => navigate({pathname: RoutePaths.ads})} />

            <p className="ad-header">Подтверждение создания</p>
            <div className="ad-content">
                <Ad {...data} showInfo={true} showButtons={false}/>
                <Button disabled={isPending || !canBuy()} onClick={() => mutate()}>{canBuy() ? "Создать сделку" : "Недостаточно средств"}</Button>
            </div>
        </div>
    )
}
