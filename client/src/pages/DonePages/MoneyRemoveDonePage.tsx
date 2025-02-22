import DonePage from "./DonePage";
import { useAppSelector } from "../../app/providers/store";
import { Navigate } from "react-router-dom";
import { RoutePaths } from "../../app/providers/router";
import { useDispatch } from "react-redux";
import { pagesActions } from "../../entities/Pages/slice/pagesSlice";

export default function MoneyRemoveDonePage() {
    const link = useAppSelector(
        state => state.pages.moneyChange.receiptLink
    )
    if (!link)
        return <Navigate to={{pathname: RoutePaths.moneyRemove}} />
    
    const dispatch = useDispatch()
    
    return <DonePage
        mainMessage="Чек для получения средств отправлен вам!"
        secondaryMessage="Перейдите в бота и используйте чек"
        button={
            <a className="done-button" href={link} onClick={() => dispatch(pagesActions.setMoneyChangeReceiptLink(""))}>Перейти в CryptoBot</a> //TODO - перехуярь
        }
    />
}