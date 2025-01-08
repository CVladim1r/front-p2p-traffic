import { tg } from "../telegram"

function TelegramTest() {
    return (
        <div>
            <p>{tg?.initDataUnsafe.user?.id ?? "нихрена"}</p>
            <p>{tg?.initDataUnsafe.user?.is_bot ?? "тут"}</p>
            <p>{tg?.initDataUnsafe.user?.first_name ?? "нету"}</p>
            <p>{tg?.initDataUnsafe.user?.last_name ?? "телеграм"}</p>
            <p>{tg?.initDataUnsafe.user?.username ?? "я"}</p>
            <p>{tg?.initDataUnsafe.user?.is_premium ?? "тебя"}</p>
            <p>{tg?.initDataUnsafe.user?.photo_url ?? "♥♥♥♥♥♥♥♥"}</p>
        </div>
    )
}

export default TelegramTest