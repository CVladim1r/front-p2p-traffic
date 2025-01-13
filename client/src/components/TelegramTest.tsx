import { user } from "../telegram"

function TelegramTest() {
  return (
    <div>
      <p>id: {user?.id ?? "undefined нихрена"}</p>
      <p>is_bot: {user?.is_bot ?? "undefined тут"}</p>
      <p>first_name: {user?.first_name ?? "undefined нету"}</p>
      <p>last_name: {user?.last_name ?? "undefined телеграм"}</p>
      <p>username: {user?.username ?? "undefined я"}</p>
      <p>is_premium: {user?.is_premium ?? "undefined тебя"}</p>
      <p>photo_url: {user?.photo_url ?? "undefined ♥♥♥♥♥♥♥♥"}</p>
      <img src={user?.photo_url} alt="" />
    </div>
  )
}

export default TelegramTest