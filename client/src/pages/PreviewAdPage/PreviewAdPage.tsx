import { useDispatch, useSelector } from "react-redux";
import { Ad, Button } from "../../shared/ui";
import { StateSchema } from "../../app/providers/store";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../app/providers/router";
import { addAdActions } from "../../entities/AddAd/slice/addAdSlice";
import "./PreviewAdPage.css"


export default function PreviewAddAdPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const data = useSelector(
        (state: StateSchema) => state.addAd.data,
        () => true // prevent re-render
    )
    const userData = useSelector(
        (state: StateSchema) => state.user.data
    )
    const isSending = useRef(useSelector((state: StateSchema) => state.addAd.isSending, () => true))
    
    if (!data) {
        navigate(RoutePaths.addAd, {replace: true})
        return
    }
    if (!userData)
        throw new Error("No user data");
    const SendData = async () => {
        const slep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
        await slep(3000) // loading

        console.log("test");
        dispatch(addAdActions.clearData())
        navigate(RoutePaths.addAdDone)
    } 

    return (
        <div className="preview-ad container">
            <p className="preview-ad-header">Подтверждение создания</p>
            <div className="preview-ad-groups">
                <Ad data={data} user={{...userData}} showButtons={false}/>
                <div className="preview-ad-info">
                    <div className="preview-ad-info-elem">
                        <p className="preview-ad-info-key">Название</p>
                        <p className="preview-ad-info-value">{data.name}</p>
                    </div>
                    <div className="preview-ad-info-elem">
                        <p className="preview-ad-info-key">Описание</p>
                        <p className="preview-ad-info-value">{data.description}</p>
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
            <Button onClick={() => {
                if (!isSending.current) {
                    isSending.current = true
                    dispatch(addAdActions.setIsSending(true))
                    SendData()
                }
            }}>Подтвердить</Button>
        </div>
    )
}
