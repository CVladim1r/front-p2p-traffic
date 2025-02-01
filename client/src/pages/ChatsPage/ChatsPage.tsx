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
    const chats: {isPinned: boolean, id: number, smth: ChatInfo}[] = []
    
    return (
        <div className="chats container">
            {chats.length ?
                <>
                    {chats.some(val => val.isPinned) &&
                        <div className="chats-pinned">
                            {chats.filter(value => value.isPinned).map(value => (
                                <Chat key={value.id} {...value.smth} />
                            ))}
                        </div>
                    }
                    {chats.filter(value => !value.isPinned).map(value => (
                        <Chat key={value.id} {...value.smth} />
                    ))}
                </> :
                <p className="chats-message-lonely" >У вас пока отсутствуют активные чаты по сделкам</p>
            }    
        </div>
    )
}