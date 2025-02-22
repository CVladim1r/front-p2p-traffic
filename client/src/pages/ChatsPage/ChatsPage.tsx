import { Link } from "react-router-dom"
import "./ChatsPage.css"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ChatAllOut, OrdersService } from "../../shared/api"
import { useAppSelector } from "../../app/providers/store"
import { selectAuthorization } from "../../entities/User"
import { LoadingAnimation } from "../../shared/ui"
import { RoutePaths } from "../../app/providers/router"
import { useEffect, useRef, useState } from "react"

function Chat({deal_uuid, counterpart_isvip, counterpart_photo, counterpart_username, uuid, is_pinned, last_message_text} : ChatAllOut) {
    const queryClient = useQueryClient()
    const authorization = useAppSelector(selectAuthorization)

    const timeStart = useRef<number>(0)
    const timeout = useRef<NodeJS.Timeout>(undefined)
    
    const timeoutTime = 1000

    const {mutate} = useMutation({
        mutationFn: async () => {
            await OrdersService.pinChatApiV1P2POrdersDealsChatUuidChatPinPatch(uuid, authorization, {is_pinned: !is_pinned})
        },
        onMutate: () => {
            const prevState = queryClient.getQueryData(["chats"])
            queryClient.setQueryData(["chats"], (old: ChatAllOut[]) => old.map(val => val.uuid == uuid ? {...val, is_pinned: !is_pinned} : val))
            return { prevState }
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ["chats"]})
        }
    })

    function stopPin() {
        clearTimeout(timeout.current)
        timeStart.current = 0
    }

    return (
        <Link to={{pathname: `${RoutePaths.chats}/${deal_uuid}`}} className="chats-chat"
            onMouseDown={e => {
                e.preventDefault()
                timeStart.current = Date.now()
                timeout.current = setTimeout(() => {
                    mutate()
                    timeStart.current = 0
                }, timeoutTime)
            }}
            onTouchStart={e => {
                e.preventDefault() //FIXME - on mobile dont work and opens menu to open/copy/etc link
                timeStart.current = Date.now()
                timeout.current = setTimeout(() => {
                    mutate()
                    timeStart.current = 0
                }, timeoutTime)
            }}

            onMouseLeave={stopPin}
            onTouchMove={stopPin}
            
            onTouchEnd={stopPin} //for mobile
            onMouseUp={stopPin} //for pc
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

export default function ChatsPage() {
    const authorization = useAppSelector(selectAuthorization)
    
    const chats = useQuery({
        queryKey: ["chats"],
        queryFn: async () => {
            return await OrdersService.getAllChatsApiV1P2POrdersChatsGet(authorization)
        }
    })

    if (chats.isLoading)
        return <LoadingAnimation />

    return (
        <div className="chats container">
            {!chats.isSuccess ?
                <p>Не удалось загрузить чаты</p>
            : chats.data.length != 0 ? 
                <>
                    {chats.data.some(val => val.is_pinned) &&
                        <div className="chats-pinned">
                            {chats.data.filter(value => value.is_pinned).map(value => (
                                <Chat key={value.uuid} {...value} />
                            ))}
                        </div>
                    }
                    {chats.data.filter(value => !value.is_pinned).map(value => (
                        <Chat key={value.uuid} {...value} />
                    ))}
                </> 
            :
                <p className="chats-message-lonely" >У вас пока отсутствуют активные чаты по сделкам</p>
            }
        </div>
    )
}