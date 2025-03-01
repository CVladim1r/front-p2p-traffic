import { Navigate, useNavigate, useParams } from "react-router-dom"
import "./ChatPage.css"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ChatMessage, DealStatus, OrdersService } from "../../shared/api"
import { useAppSelector } from "../../app/providers/store"
import { selectAuthorization } from "../../entities/User"
import { useEffect, useRef, useState } from "react"
import { BackButton, Button, LoadingAnimation, TextField } from "../../shared/ui"
import classNames from "classnames"
import { RoutePaths } from "../../app/providers/router"
import sendSvg from "../../shared/assets/svg/ad_send.svg"
import closeImg from "../../shared/assets/svg/close.svg"
import starInactive from "../../shared/assets/svg/review-star_inactive.svg"
import starActive from "../../shared/assets/svg/review-star_active.svg"
import { useDispatch } from "react-redux"
import { pagesActions } from "../../entities/Pages/slice/pagesSlice"


function Message({sender_tg_id, text, timestamp, sender_name}: ChatMessage) {
    const viewer_tg_id = useAppSelector(state => state.user.data?.tg_id)
    
    return (
        <div className={
            classNames(
                "chat-message",
                {"opponent": viewer_tg_id != sender_tg_id},
                {"admin": sender_name == "admin"},
                {"admin": sender_name == "system"},
            )
            }
        >
            <p className={
                classNames(
                    "chat-message-text",
                    {"opponent": viewer_tg_id != sender_tg_id},
                    {"admin": sender_name == "admin"},
                    {"admin": sender_name == "system"},
                )
            }>{text}</p>
            <p className="chat-message-time">{new Date(timestamp).toLocaleTimeString("ru", {timeStyle:"short"})}</p>
        </div>
    )
}

function RatingDialog({dealUuid}: {dealUuid: string}) {
    const [rating, setRating] = useState(5)
    const [message, setMessage] = useState("")

    const dispatch = useDispatch()
    const showDialog = useAppSelector(s => s.pages.chat.showDialog)
    const authorization = useAppSelector(selectAuthorization)

    const {mutate} = useMutation({
        mutationFn: async () => {
            await OrdersService.createReviewApiV1P2POrdersDealsDealUuidReviewsPost(dealUuid, authorization, {
                rating,
                comment: message ? message : null
            })
            dispatch(pagesActions.setChatShowDialog(false))
        }
    })

    function ratingToText(num: number) {
        switch (num) {
            case 1: return "Очень плохо"
            case 2: return "Плохо"
            case 3: return "Нормально"
            case 4: return "Очень хорошо"
            case 5: return "Хорошо"
            default: return ""
        }
    }

    return (
        <>
            <div onClick={() => dispatch(pagesActions.setChatShowDialog(false))} className={showDialog ? "chat-ratingDialog-background active" : "chat-ratingDialog-background"} />
            
            <div className={showDialog ? "ratingDialog active" : "ratingDialog"}>
                <div className="ratingDialog-main">
                    <div className="ratingDialog-top">
                        <p className="ratingDialog-top-header">Оставьте отзыв:</p>
                        <Button className="ratingDialog-close" onClick={() => dispatch(pagesActions.setChatShowDialog(false))}>
                            <img src={closeImg} alt="" className="ratingDialog-close-icon" />
                        </Button>
                    </div>

                    <div className="ratingDialog-stars">
                        <div className="ratingDialog-stars-list">
                            {[...Array(5).keys()].map(val => <img key={val} onClick={() => setRating(val + 1)} src={val + 1 <= rating ? starActive : starInactive} />)}
                        </div>
                        <p className="ratingDialog-stars-text">{ratingToText(rating)}</p>
                    </div>

                    <TextField className="ratingDialog-text" type="textarea" rows={2} placeholder="Напишите отзыв" value={message} onChange={e => setMessage(e.target.value)} />
                </div>

                <Button className="ratingDialog-button" onClick={() => mutate()}>Отправить</Button>
            </div>
        </>
    )
}

export default function ChatPage() {
    const { id: deal_id } = useParams<{id: string}>()
    if (!deal_id)
        return <Navigate to={{pathname: RoutePaths.chats}} replace />
        
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const queryClient = useQueryClient()
    const authorization = useAppSelector(selectAuthorization)
    
    const {mutate: confirmDeal, isSuccess: confirmDealSuccess} = useMutation({
        mutationFn: async () => {
            await OrdersService.confirmDealApiV1P2POrdersDealsDealUuidConfirmPost(deal_id, authorization)
            toScroll.current = true
        }
    })

    const chat = useQuery({
        queryKey: ["chat"],
        queryFn: async () => {
            return await OrdersService.getChatApiV1P2POrdersDealsDealUuidChatGet(deal_id, authorization)
        },
        refetchInterval: 1000
    })
    const deal = useQuery({
        queryKey: ["deal", confirmDealSuccess],
        queryFn: async () => {
            return await OrdersService.getDealApiV1P2POrdersDealsDealUuidGet(deal_id)
        }
    })

    
    const [text, setText] = useState("")
    
    const {mutate: sendMessage, variables: messageOptimistic, isPending: sendMessagePending} = useMutation({
        mutationFn: async (text: string) => {
            await OrdersService.sendChatMessageApiV1P2POrdersDealsDealUuidChatMessagesPost(deal_id, authorization, {text})
        },
        onMutate: () => {
            setText("")
            toScroll.current = true
        },
        onSettled: async () => {
            return await queryClient.invalidateQueries({queryKey: ["chat"]})
        }
    })
    const containerRef = useRef<HTMLDivElement>(null)
    const toScroll = useRef(false)
    useEffect(() => {
        if (toScroll.current) {
            containerRef.current?.scrollTo(0, containerRef.current.scrollHeight)
            toScroll.current = false
        }
    }, [chat.data])
    
    if (deal.isLoading || chat.isLoading)
        return <LoadingAnimation />
    
    if (!deal.isSuccess || !chat.isSuccess)
        return <Navigate to={{pathname: RoutePaths.chats}} replace />

    return (
        <div className="chat">
            <RatingDialog dealUuid={deal_id} />

            <div className="chat-top">
                <BackButton className="chat-top-back" onClick={() => navigate({pathname: RoutePaths.chats})}/>
                <Button className="chat-top-open">Открыть спор</Button>
                {deal.data.status == DealStatus.COMPLETED ?
                    <Button className="chat-top-confirm" onClick={() => dispatch(pagesActions.setChatShowDialog(true))}>Оставить отзыв</Button>
                : //TODO - dealData. if no review
                    <Button className="chat-top-confirm" onClick={() => confirmDeal()}>Подтвердить сделку</Button>
                }
            </div>
            <div className="chat-messages container" ref={containerRef}>
                { chat.data.messages.map(val => <Message key={val.timestamp} {...val} />) }
                {sendMessagePending &&
                    <Message sender_name="" sender_tg_id={0} sender_uuid="" text={messageOptimistic} timestamp={new Date(Date.now()).toLocaleTimeString("ru", {timeStyle:"short"})} />
                }
            </div>
            <div className="chat-input container">
                <TextField className="chat-input-text" placeholder="Введите текст" type="text" value={text}
                    onChange={e => setText(e.target.value)}
                    onKeyDown={e => {
                        if (e.key == "Enter")
                            sendMessage(text)
                    }}
                />
                <Button className="chat-input-button" disabled={text == ""} onClick={() => sendMessage(text)}>
                    <img className="chat-input-button-icon" src={sendSvg} alt="" />
                </Button>
            </div>
        </div>
    )
}