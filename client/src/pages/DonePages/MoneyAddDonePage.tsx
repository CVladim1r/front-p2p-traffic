import { useSelector } from "react-redux";
import { Button } from "../../shared/ui";
import DonePage from "./DonePage";
import { StateSchema } from "../../app/providers/store";

export default function MoneyAddDonePage() {
    const link = useSelector(
        (state: StateSchema) => state.moneyChange.receiptLink
    )
    return <DonePage
        mainMessage="Чек для оплаты отправлен вам!"
        secondaryMessage="Вам осталось оплатить чек и ваш счет будет пополнен!"
        button={
            <Button><a href={link}>Перейти в CryptoBot</a></Button>
        }
    />
}