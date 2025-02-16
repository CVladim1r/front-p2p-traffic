import { useDispatch } from "react-redux";
import { Ad, BackButton, Button } from "../../shared/ui";
import { Navigate, useNavigate } from "react-router-dom";
import { RoutePaths } from "../../app/providers/router";
import { addAdActions } from "../../entities/AddAd/slice/addAdSlice";
import "./PreviewAdPage.css"
import { useMutation } from "@tanstack/react-query";
import { OrdersService, UsersService } from "../../shared/api";
import { selectAuthorization, userActions } from "../../entities/User";
import { useAppSelector } from "../../app/providers/store";


export default function PreviewAddAdPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {mutate, isSuccess, isPending} = useMutation({
        mutationFn: async () => {
            const slep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
            await slep(1000) // loading
            if (!data)
                throw new Error("No data");
                
            try {
                await OrdersService.createAdApiV1P2POrdersNewAdPost(authorization, data)
            } catch (e) {
                console.error(e)
                return
            }
            dispatch(userActions.setUserData(await UsersService.getUserMainDataApiV1P2PUserMainDataGet(authorization)))
            dispatch(addAdActions.clearData())
        }
    })
    
    const authorization = useAppSelector(selectAuthorization)
    const data = useAppSelector(
        state => state.addAd.data,
        () => true // prevent re-render
    )
    const userData = useAppSelector(
        state => state.user.data
    )
    
    if (isSuccess)
        return <Navigate to={{pathname: RoutePaths.addAdDone}} replace={true}/>
    
    if (!data)
        return <Navigate to={{pathname: RoutePaths.addAd}} replace={true} />

    if (!userData)
        throw new Error("No user data");

    return (
        <div className="preview-ad container">
            <BackButton onClick={() => navigate({pathname: RoutePaths.addAd})} />

            <p className="preview-ad-header">Подтверждение создания</p>
            <div className="preview-ad-groups">
                <Ad {...data} showInfo={true} user_deals={userData.deals} user_name={userData.username ?? "Anonym"} user_photo_url={userData.profile_photo ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTSDZkJpfJZuBUtCO2O5POp69VoIKklbXpFg&s"} user_rating={userData.rating} user_vip={userData.is_vip} showButtons={false}/>
                <div className="preview-ad-warning">
                    <p className="preview-ad-warning-header">Создавая сделку вы подтверждаете, что:</p>
                    <ol className="preview-ad-warning-list">
                        <li>Вы указали достоверную информацию</li>
                        <li>Вы не будете общаться с покупателем за пределами платформы</li>
                        <li>Вы не будете продвигать в чате продажу нелегальных товаров</li>
                        <li>Вы выполните условия, указанные в вашем объявлении</li>
                    </ol>
                </div>
            </div>
            <Button disabled={isPending} onClick={() => mutate()}>Подтвердить</Button>
        </div>
    )
}
