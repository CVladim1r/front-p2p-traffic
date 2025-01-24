import { useDispatch, useSelector } from "react-redux";
import { Ad, Button } from "../../shared/ui";
import { StateSchema } from "../../app/providers/store";
import { useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { RoutePaths } from "../../app/providers/router";
import { addAdActions } from "../../entities/AddAd/slice/addAdSlice";
import "./PreviewAdPage.css"
import { user } from "../../telegram";


export default function PreviewAddAdPage() {
    const dispatch = useDispatch()
    
    const data = useSelector(
        (state: StateSchema) => state.addAd.data,
        () => true // prevent re-render
    )
    const userData = useSelector(
        (state: StateSchema) => state.user.data
    )
    const [isSending, setIsSending] = useState(useSelector((state: StateSchema) => state.addAd.isSending, () => true))
    const [sendDone, setSendDone] = useState(false)
    
    if (sendDone)
        return <Navigate to={{pathname: RoutePaths.addAdDone}} replace={true}/>
    
    if (!data.amount)
        return <Navigate to={{pathname: RoutePaths.addAd}} replace={true} />

    if (!userData)
        throw new Error("No user data");
    const SendData = async () => {
        const slep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
        await slep(3000) // loading

        console.log("test");
        dispatch(addAdActions.clearData())
        setSendDone(true)
    } 

    return (
        <div className="preview-ad container">
            <p className="preview-ad-header">Подтверждение создания</p>
            <div className="preview-ad-groups">
                <Ad data={data} user={{...userData, profile_picture: user.photo_url}} showButtons={false}/>
                <div className="preview-ad-info">
                    {/* <div className="preview-ad-info-elem">
                        <p className="preview-ad-info-key">Название</p>
                        <p className="preview-ad-info-value">{data.name}</p>
                    </div>
                    <div className="preview-ad-info-elem">
                        <p className="preview-ad-info-key">Описание</p>
                        <p className="preview-ad-info-value">{data.description}</p>
                    </div> */}

                    <div className="preview-ad-info-elem">
                        <p className="preview-ad-info-key">Тематика</p>
                        <p className="preview-ad-info-value">{data.theme}</p>
                    </div>

                </div>
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
            <Button disabled={isSending} onClick={() => {
                setIsSending(true)
                dispatch(addAdActions.setIsSending(true))
                SendData()
            }}>Подтвердить</Button>
        </div>
    )
}
