import { Ad, Button, LoadingAnimation } from "../../shared/ui";
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

    if (!data)
        return <LoadingAnimation />

    return (
        <div className="ad container">
            <p className="ad-header">Подтверждение создания</p>
            <div className="ad-content">
                <Ad {...data} showInfo={true} showButtons={false}/>
                <Button disabled={isPending} onClick={() => mutate()}>Создать сделку</Button>
            </div>
        </div>
    )
}
