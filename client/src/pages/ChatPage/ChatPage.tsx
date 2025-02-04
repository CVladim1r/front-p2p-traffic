import { useParams } from "react-router-dom"
import "./ChatPage.css"
import { useMutation, useQuery } from "@tanstack/react-query"
import { ChatMessage, OrdersService } from "../../shared/api"
import { useAppSelector } from "../../app/providers/store"
import { selectAuthorization } from "../../entities/User"
import { useState } from "react"
import { Button, LoadingAnimation, TextField } from "../../shared/ui"


function Message({sender_tg_id, text}: ChatMessage) {
    const viewer_tg_id = useAppSelector(state => state.user.data?.tg_id)
    
    return (
        <div className={viewer_tg_id == sender_tg_id ? "chat-message viewer" : "chat-message"}>
            <p className={viewer_tg_id == sender_tg_id ? "chat-message-text viewer" : "chat-message-text"}>{text}</p>
            {/* <p className="chat-message-time">{new Date(timestamp).toLocaleTimeString("ru", {timeStyle:"short"})}</p> */}
        </div>
    )
}

export default function ChatPage() {
    const { id: deal_id } = useParams<{id: string}>()
    if (!deal_id)
        return <>error</>
    
    const authorization = useAppSelector(selectAuthorization)
    const userId = useAppSelector(state => state.user.data?.uuid)

    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [text, setText] = useState("")

    const {data} = useQuery({
        queryKey: ["chat"],
        queryFn: async () => {
            const response = await OrdersService.getChatApiV1P2POrdersDealsDealUuidChatGet(deal_id, authorization)
            setMessages(response.messages)
            return response
        }
    })

    const {mutate} = useMutation({
        mutationFn: async () => {
            const response = await OrdersService.sendChatMessageApiV1P2POrdersDealsDealUuidChatMessagesPost(deal_id, authorization, {text, sender_id: userId ?? "hui"})
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
                            <img src={data.} alt="" className="chat-top-avatar" />
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