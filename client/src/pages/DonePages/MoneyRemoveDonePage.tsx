import { useSelector } from "react-redux";
import { Button } from "../../shared/ui";
import DonePage from "./DonePage";
import { StateSchema } from "../../app/providers/store";

export default function MoneyRemoveDonePage() {
    const link = useSelector(
        (state: StateSchema) => state.moneyChange.receiptLink
    )
    return <DonePage
        mainMessage="Чек для получения средств отправлен вам!"
        secondaryMessage="Перейдите в бота и используйте чек"
        button={
            <Button><a href={link}>Перейти в CryptoBot</a></Button> //TODO - перехуярь
        }
    />
}