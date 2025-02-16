import { Navigate, useNavigate, useParams } from "react-router-dom"
import "./ChatPage.css"
import { useMutation, useQuery } from "@tanstack/react-query"
import { ChatMessage, OrdersService } from "../../shared/api"
import { useAppSelector } from "../../app/providers/store"
import { selectAuthorization } from "../../entities/User"
import { useEffect, useRef, useState } from "react"
import { BackButton, Button, LoadingAnimation, TextField } from "../../shared/ui"
import classNames from "classnames"
import { RoutePaths } from "../../app/providers/router"
import sendSvg from "../../shared/assets/svg/ad_send.svg"


function Message({sender_tg_id, text, timestamp, sender_name}: ChatMessage) {
    const viewer_tg_id = useAppSelector(state => state.user.data?.tg_id)
    
    return (
        <div className={
            classNames(
                "chat-message",
                {"viewer": viewer_tg_id == sender_tg_id},
                {"admin": sender_name == "admin"})
            }
        >
            <p className={
                classNames(
                    "chat-message-text",
                    {"viewer": viewer_tg_id == sender_tg_id},
                    {"admin": sender_name == "admin"})
            }>{text}</p>
            <p className="chat-message-time">{new Date(timestamp).toLocaleTimeString("ru", {timeStyle:"short"})}</p>
        </div>
    )
}

export default function ChatPage() {
    const navigate = useNavigate()

    const { id: deal_id } = useParams<{id: string}>()
    if (!deal_id)
        return <Navigate to={{pathname: RoutePaths.chats}} replace />
    
    const authorization = useAppSelector(selectAuthorization)

    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [text, setText] = useState("")

    const {data, isLoading} = useQuery({
        queryKey: ["chat"],
        queryFn: async () => {
            return await OrdersService.getChatApiV1P2POrdersDealsDealUuidChatGet(deal_id, authorization)
        },
        refetchInterval: 1000
    })
    useEffect(() => {
        if (data)
            setMessages(data.messages)
    }, [data])

    const {mutate: sendMessage} = useMutation({
        mutationFn: async () => {
            const response = await OrdersService.sendChatMessageApiV1P2POrdersDealsDealUuidChatMessagesPost(deal_id, authorization, {text})
            setMessages([...messages, response])
            setText("")
            toScroll.current = true
        }
    })

    const {mutate: confirmDeal} = useMutation({
        mutationFn: async () => {
            await OrdersService.confirmDealApiV1P2POrdersDealsDealUuidConfirmPost(deal_id, authorization)
            toScroll.current = true
        }
    })

    const containerRef = useRef<HTMLDivElement>(null)
    const toScroll = useRef(false)

    useEffect(() => {
        if (toScroll.current) {
            containerRef.current?.scrollTo(0, containerRef.current.scrollHeight)
            toScroll.current = false
        }
    }, [messages])

    return (
        <div className="chat">
            {isLoading ? (
                    <LoadingAnimation />
                ) : (
                    <>
                        <div className="chat-top">
                            <BackButton className="chat-top-back" onClick={() => navigate({pathname: RoutePaths.chats})}/>
                            <Button className="chat-top-open">Открыть спор</Button>
                            <Button className="chat-top-confirm" onClick={() => confirmDeal()}>Подтвердить сделку</Button>
                        </div>
                        <div className="chat-messages container" ref={containerRef}>
                            {messages.map(val => <Message key={val.timestamp} {...val} />)}
                        </div>
                        <div className="chat-input container">
                            <TextField className="chat-input-text" placeholder="Введите текст" type="text" value={text}
                                onChange={e => setText(e.target.value)}
                                onKeyDown={e => {
                                    console.log(e);
                                    
                                    if (e.key == "Enter")
                                        sendMessage()
                                }}
                            />
                            <Button className="chat-input-button" disabled={text == ""} onClick={() => sendMessage()}>
                                <img className="chat-input-button-icon" src={sendSvg} alt="" />
                            </Button>
                        </div>
                    </>
                )
            }
        </div>
    )
}