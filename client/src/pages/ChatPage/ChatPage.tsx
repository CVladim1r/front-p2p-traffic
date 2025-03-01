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
import starInactive from "../../shared/assets/svg/review-star_inactive.svg"
import starActive from "../../shared/assets/svg/review-star_active.svg"
import { Modal } from "../../shared/ui/Modal/Modal"


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

export default function ChatPage() {
    const { id: deal_id } = useParams<{id: string}>()
    if (!deal_id)
        return <Navigate to={{pathname: RoutePaths.chats}} replace />
        
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const authorization = useAppSelector(selectAuthorization)
    const tg_id = useAppSelector(state => state.user.data?.tg_id)

    
    const {mutate: confirmDeal, isSuccess: confirmDealSuccess} = useMutation({
        mutationFn: async () => {
            await OrdersService.confirmDealApiV1P2POrdersDealsDealUuidConfirmPost(deal_id, authorization)
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

    const [showModal, setShowModal] = useState(false)
    const [rating, setRating] = useState(5)
    const [reviewMessage, setReviewMessage] = useState("")
    const {mutate: sendReview} = useMutation({
        mutationFn: async () => {
            await OrdersService.createReviewApiV1P2POrdersDealsDealUuidReviewsPost(deal_id, authorization, {
                rating,
                comment: reviewMessage ? reviewMessage : null
            })
            setShowModal(false)
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

    
    const [text, setText] = useState("")
    
    const {mutate: sendMessage, variables: messageOptimistic, isPending: sendMessagePending} = useMutation({
        mutationFn: async (text: string) => {
            await OrdersService.sendChatMessageApiV1P2POrdersDealsDealUuidChatMessagesPost(deal_id, authorization, {text})
        },
        onMutate: () => {
            setText("")
            forceScroll.current = true
        },
        onSettled: async () => {
            return await queryClient.invalidateQueries({queryKey: ["chat"]})
        }
    })

    const containerRef = useRef<HTMLDivElement>(null)
    const atBottom = useRef(false)
    const forceScroll = useRef(true)
    useEffect(() => {
        if ((atBottom.current || forceScroll.current) && containerRef.current) {
            containerRef.current.scrollTo(0, containerRef.current.scrollHeight)
            forceScroll.current = false
        }
    }, [chat.data, messageOptimistic])
    
    if (deal.isLoading || chat.isLoading)
        return <LoadingAnimation />
    
    if (!deal.isSuccess || !chat.isSuccess)
        return <Navigate to={{pathname: RoutePaths.chats}} replace />

    return (
        <div className="chat">
            <div className="chat-top">
                <BackButton className="chat-top-back" onClick={() => navigate({pathname: RoutePaths.chats})}/>
                <Button className="chat-top-open">Открыть спор</Button>
                {deal.data.status == DealStatus.COMPLETED ?
                    <Button className="chat-top-confirm" onClick={() => setShowModal(true)}>Оставить отзыв</Button>
                : //TODO - dealData. if no review
                    <Button className="chat-top-confirm" onClick={() => confirmDeal()}>Подтвердить сделку</Button>
                }
            </div>
            <div className="chat-messages container" onScroll={e => atBottom.current = e.currentTarget.scrollHeight - e.currentTarget.scrollTop - e.currentTarget.clientHeight <= 1.0} ref={containerRef}>
                { chat.data.messages.map(val => <Message key={val.timestamp} {...val} />) }
                {sendMessagePending &&
                    <Message sender_name="" sender_tg_id={tg_id ?? 0} sender_uuid="" text={messageOptimistic} timestamp={new Date(Date.now()).toISOString()} />
                }
            </div>
            <div className="chat-input container">
                <TextField className="chat-input-text" placeholder="Введите текст" type="text" value={text}
                    onChange={e => setText(e.target.value)}
                    onKeyDown={e => {
                        if (e.key == "Enter" && text)
                            sendMessage(text)
                    }}
                />
                <Button className="chat-input-button" disabled={text == ""} onClick={() => sendMessage(text)}>
                    <img className="chat-input-button-icon" src={sendSvg} alt="" />
                </Button>
            </div>

            <Modal
                show={showModal}
                hideModal={() => setShowModal(false)}
                topText="Оставьте отзыв:"
                bodyChildren={
                    <>
                        <div className="ratingModal-stars">
                            <div className="ratingModal-stars-list">
                                {[...Array(5).keys()].map(val => <img key={val} onClick={() => setRating(val + 1)} src={val + 1 <= rating ? starActive : starInactive} />)}
                            </div>
                            <p className="ratingModal-stars-text">{ratingToText(rating)}</p>
                        </div>

                        <TextField className="ratingModal-text" type="textarea" rows={2} placeholder="Напишите отзыв" value={reviewMessage} onChange={e => setReviewMessage(e.target.value)} />
                    </>
                }
                bottomButton={{
                    text: "Отправить",
                    onClick() {
                        sendReview()
                    },
                }}
            />
        </div>
    )
}