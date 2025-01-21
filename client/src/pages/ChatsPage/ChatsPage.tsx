import { Link } from "react-router-dom"
import pic from "../../shared/assets/images/testuserchat.png"
import "./ChatsPage.css"

type ChatInfo = {
    id: number
    username: string,
    profile_picture: string,
    last_message: string,
    isPinned: boolean
    extra?: "something" | "vip",
}

function Chat({id, username, profile_picture, last_message, extra} : ChatInfo) {
    return (
        <Link to={{pathname: `/chat/${id}`}} className="chat">
            <img src={profile_picture} alt="" className="chat-image"/>
            <div className="chat-info">
                <p className= {
                    extra == "something" ?
                        "chat-info-username something" :
                        extra == "vip" ?
                            "chat-info-username vip" :
                            "chat-info-username"
                }>
                    {username}
                </p>
                <p className="chat-info-last-message">{last_message}</p>
            </div>
        </Link>
    )
}

export default function ChatsPage() {
    const testData: ChatInfo[] = [
        {id: 1, username: "Username_2", profile_picture: pic, last_message: "Привет! Жду ссылку на транзакцию где ты пе...", extra: "something", isPinned: false},
        {id: 0, username: "Username_1", profile_picture: pic, last_message: "Точно 100000 пользователей приведу тебе, пр...", extra: "vip", isPinned: true},
        {id: 2, username: "Username_3", profile_picture: pic, last_message: "Зуб даю - много подписчиков придет!", isPinned: false},
        {id: 3, username: "Username_5", profile_picture: pic, last_message: "Привет! Жду ссылку на транзакцию где ты пе...", extra: "something", isPinned: true},
        {id: 4, username: "Username_4", profile_picture: pic, last_message: "Сколько пришло?", extra: "vip", isPinned: false},
        {id: 5, username: "Username_6", profile_picture: pic, last_message: "Точно 100000 пользователей приведу тебе, пр...", isPinned: false},
        {id: 6, username: "Username_6", profile_picture: pic, last_message: "Зуб даю - много подписчиков придет!", extra: "something", isPinned: false},
        {id: 7, username: "Username_6", profile_picture: pic, last_message: "Сколько пришло?", extra: "vip", isPinned: true},
        {id: 8, username: "Username_6", profile_picture: pic, last_message: "Сообщение", isPinned: false},
        {id: 9, username: "Username_6", profile_picture: pic, last_message: "Сообщение", extra: "something", isPinned: false},
    ]

    return (
        <div className="chats container">
            <div className="chats-pinned">
                {testData.filter(value => value.isPinned).map(value => (
                    <Chat key={value.id} {...value} />
                ))}
            </div>
            {testData.filter(value => !value.isPinned).map(value => (
                <Chat key={value.id} {...value} />
            ))}
        </div>
    )
}