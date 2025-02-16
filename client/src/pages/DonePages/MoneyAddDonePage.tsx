import DonePage from "./DonePage";
import { useAppSelector } from "../../app/providers/store";
import { Navigate } from "react-router-dom";
import { RoutePaths } from "../../app/providers/router";
import { useDispatch } from "react-redux";
import { moneyChangeActions } from "../../entities/MoneyChange";

export default function MoneyAddDonePage() {
    const link = useAppSelector(
        state => state.moneyChange.receiptLink
    )
    if (!link)
        return <Navigate to={{pathname: RoutePaths.moneyAdd}} />

    const dispatch = useDispatch()

    return <DonePage
        mainMessage="Чек для оплаты отправлен вам!"
        secondaryMessage="Вам осталось оплатить чек и ваш счет будет пополнен!"
        button={
            <a className="done-button" href={link} onClick={() => dispatch(moneyChangeActions.setReceiptLink(""))}>Перейти в CryptoBot</a>
        }
    />
}