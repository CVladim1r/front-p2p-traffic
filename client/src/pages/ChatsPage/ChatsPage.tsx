import { Link } from "react-router-dom"
import "./ChatsPage.css"
import { useMutation, useQuery } from "@tanstack/react-query"
import { ChatAllOut, OrdersService } from "../../shared/api"
import { useAppSelector } from "../../app/providers/store"
import { selectAuthorization } from "../../entities/User"
import { LoadingAnimation } from "../../shared/ui"
import { RoutePaths } from "../../app/providers/router"
import { useRef, useState } from "react"

export default function ChatsPage() {
    const authorization = useAppSelector(selectAuthorization)
    
    const [messages, setMessages] = useState<ChatAllOut[]>([])

    const {isLoading} = useQuery({
        queryKey: ["chats"],
        queryFn: async () => {
            setMessages(await OrdersService.getAllChatsApiV1P2POrdersChatsGet(authorization))
            return {}
        }
    })
    

    function Chat({deal_uuid, counterpart_isvip, counterpart_photo, counterpart_username, uuid, is_pinned, last_message_text} : ChatAllOut) {
        const timeStart = useRef<number>(0)
        const timeout = useRef<NodeJS.Timeout>(undefined)
        
        const timeoutTime = 1000

        const {mutate} = useMutation({
            mutationFn: async () => {
                const response = await OrdersService.pinChatApiV1P2POrdersDealsChatUuidChatPinPatch(uuid, authorization, {is_pinned: !is_pinned})
                setMessages(messages.map(val => val.uuid == uuid ? {...val, is_pinned: response.is_pinned} : val))
            }
        })
    
        return (
            <Link to={{pathname: `${RoutePaths.chats}/${deal_uuid}`}} className="chats-chat"
                onMouseDown={() => {
                    timeStart.current = Date.now()
                    timeout.current = setTimeout(() => {
                        mutate()
                        timeStart.current = 0
                    }, timeoutTime)
                }}
                onMouseUp={() => {
                    if (timeStart.current && Date.now() - timeStart.current > timeoutTime)
                        mutate()
                    clearTimeout(timeout.current)
                }}
                onClick={e => {
                    if (timeStart.current && Date.now() - timeStart.current > timeoutTime)
                        e.preventDefault()
                }}
            >
                <img src={counterpart_photo} alt="" className="chats-chat-image"/>
                <div className="chats-chat-info">
                    <p className= {counterpart_isvip ? "chats-chat-info-username vip" : "chats-chat-info-username"}>
                        {counterpart_username}
                    </p>
                    <p className="chats-chat-info-last-message">{last_message_text}</p>
                </div>
            </Link>
        )
    }

    return (
        <div className="chats container">
            {isLoading ? (
                <LoadingAnimation />
                ) : 
                    messages.length != 0 ? (
                        <>
                            {messages.some(val => val.is_pinned) &&
                                <div className="chats-pinned">
                                    {messages.filter(value => value.is_pinned).map(value => (
                                        <Chat key={value.uuid} {...value} />
                                    ))}
                                </div>
                            }
                            {messages.filter(value => !value.is_pinned).map(value => (
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