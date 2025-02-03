import { Link } from "react-router-dom"
import "./ChatsPage.css"
import { useQuery } from "@tanstack/react-query"
import { DealOut, OrdersService } from "../../shared/api"
import { useAppSelector } from "../../app/providers/store"
import { selectAuthorization } from "../../entities/User"
import { useState } from "react"
import { LoadingAnimation } from "../../shared/ui"

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
    const authorization = useAppSelector(selectAuthorization)
    
    const [chats, setChats] = useState<DealOut[]>([])

    const {isFetching} = useQuery({
        queryKey: ["chats"],
        queryFn: async () => {
            setChats(await OrdersService.getUserDealsApiV1P2POrdersDealsGet(authorization))
        }
    })
    
    return (
        <div className="chats container">
            {isFetching ? (
                <LoadingAnimation />
                ) : 
                    chats ? (
                        <>
                            {chats.some(val => val.) &&
                                <div className="chats-pinned">
                                    {chats.filter(value => value.isPinned).map(value => (
                                        <Chat key={value.uuid} {...value.smth} />
                                    ))}
                                </div>
                            }
                            {chats.filter(value => !value.isPinned).map(value => (
                                <Chat key={value.uuid} {...value.smth} />
                            ))}
                        </> 
                    ) : (
                        <p className="chats-message-lonely" >У вас пока отсутствуют активные чаты по сделкам</p>
                    )
            }
        </div>
    )
}