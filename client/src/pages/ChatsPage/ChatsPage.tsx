import { Link } from "react-router-dom"
import "./ChatsPage.css"
import { useQuery } from "@tanstack/react-query"
import { ChatAllOut, OrdersService } from "../../shared/api"
import { useAppSelector } from "../../app/providers/store"
import { selectAuthorization } from "../../entities/User"
import { useState } from "react"
import { LoadingAnimation } from "../../shared/ui"
import { RoutePaths } from "../../app/providers/router"

function Chat({deal_uuid, counterpart_isvip, counterpart_photo, counterpart_username} : ChatAllOut) {
    return (
        <Link to={{pathname: `${RoutePaths.chats}/${deal_uuid}`}} className="chats-chat">
            <img src={counterpart_photo} alt="" className="chats-chat-image"/>
            <div className="chats-chat-info">
                <p className= {counterpart_isvip ? "chats-chat-info-username vip" : "chats-chat-info-username"}>
                    {counterpart_username}
                </p>
                {/* <p className="chats-chat-info-last-message">{last_message}</p> */}
            </div>
        </Link>
    )
}

export default function ChatsPage() {
    const authorization = useAppSelector(selectAuthorization)
    
    const [chats, setChats] = useState<ChatAllOut[]>([])

    const {isFetching} = useQuery({
        queryKey: ["chats"],
        queryFn: async () => {
            setChats(await OrdersService.getAllChatsApiV1P2POrdersChatsGet(authorization))
        }
    })
    
    return (
        <div className="chats container">
            {isFetching ? (
                <LoadingAnimation />
                ) : 
                    chats ? (
                        <>
                            {chats.some(val => val.is_pinned) &&
                                <div className="chats-pinned">
                                    {chats.filter(value => value.is_pinned).map(value => (
                                        <Chat key={value.uuid} {...value} />
                                    ))}
                                </div>
                            }
                            {chats.filter(value => !value.is_pinned).map(value => (
                                <Chat key={value.uuid} {...value} />
                            ))}
                        </> 
                    ) : (
                        <p className="chats-message-lonely" >У вас пока отсутствуют активные чаты по сделкам</p>
                    )
            }
        </div>
    )
}