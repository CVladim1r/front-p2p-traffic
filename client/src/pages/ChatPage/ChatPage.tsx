import { useParams } from "react-router-dom"
import "./ChatPage.css"
import { useMutation, useQuery } from "@tanstack/react-query"
import { ChatMessage, OrdersService } from "../../shared/api"
import { useAppSelector } from "../../app/providers/store"
import { selectAuthorization } from "../../entities/User"
import { useState } from "react"
import { Button, LoadingAnimation, TextField } from "../../shared/ui"
import classNames from "classnames"


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
    const { id: deal_id } = useParams<{id: string}>()
    if (!deal_id)
        return <>error</>
    
    const authorization = useAppSelector(selectAuthorization)

    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [text, setText] = useState("")

    const {data} = useQuery({ //TODO - update every second
        queryKey: ["chat"],
        queryFn: async () => {
            const response = await OrdersService.getChatApiV1P2POrdersDealsDealUuidChatGet(deal_id, authorization)
            setMessages(response.messages)
            return response 
        },
        refetchInterval: 1000
    })

    const {mutate} = useMutation({
        mutationFn: async () => {
            const response = await OrdersService.sendChatMessageApiV1P2POrdersDealsDealUuidChatMessagesPost(deal_id, authorization, {text})
            setMessages([...messages, response])
            setText("")
        }
    })

    // const lastMessage = useRef<JSX.Element>(undefined)

    return (
        <div className="chat">
            {!data ? (
                    <LoadingAnimation />
                ) : (
                    <>
                        {/* <div className="chat-top">
                            <img src={data.} alt="" className="chat-top-avatar" /> //TODO - кнопки открыть спор, подтверждение ордера
                            <p className="chat-top-username">{}</p>
                        </div> */}
                        <div className="chat-messages container">
                            {messages.map(val => <Message key={val.timestamp} {...val} />)}
                        </div>
                        <div className="chat-input container">
                            <TextField className="chat-input-text" placeholder="Введите текст" type="text" value={text} onChange={e => setText(e.target.value)} />
                            <Button className="chat-input-button" disabled={text == ""} onClick={() => mutate()}/>
                        </div>
                    </>
                )
            }
        </div>
    )
}