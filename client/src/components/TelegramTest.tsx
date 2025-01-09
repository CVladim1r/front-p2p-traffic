import { tg } from "../telegram"

function TelegramTest() {
    return (
        <div>
            <p>id: {tg?.initDataUnsafe.user?.id ?? "undefined нихрена"}</p>
            <p>is_bot: {tg?.initDataUnsafe.user?.is_bot ?? "undefined тут"}</p>
            <p>first_name: {tg?.initDataUnsafe.user?.first_name ?? "undefined нету"}</p>
            <p>last_name: {tg?.initDataUnsafe.user?.last_name ?? "undefined телеграм"}</p>
            <p>username: {tg?.initDataUnsafe.user?.username ?? "undefined я"}</p>
            <p>is_premium: {tg?.initDataUnsafe.user?.is_premium ?? "undefined тебя"}</p>
            <p>photo_url: {tg?.initDataUnsafe.user?.photo_url ?? "undefined ♥♥♥♥♥♥♥♥"}</p>
            <img src={tg?.initDataUnsafe.user?.photo_url} alt="" />
        </div>
    )
}

export default TelegramTest