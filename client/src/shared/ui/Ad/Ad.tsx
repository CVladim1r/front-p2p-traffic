import { AdData } from "../../../entities/AddAd/slice/addAdSlice"
import { UserMainPageOut } from "../../api"
import share from "../../assets/svg/ad_send.svg"
import testuser from "../../assets/images/testuser1.png"
import "./Ad.css"

export type AdProps = {
    // price: number,
    // type: string,
    // user: PersonInfo,
    // source: string,
    // income_guaranteed: boolean,
    // income_min: number,
    // pay: string,
    data: AdData
    user: Omit<UserMainPageOut, "uuid" | "tg_id" | "balance" | "total_sales" | "created_at" | "updated_at" | "referral_id"> & {profile_picture?: string}

    showButtons?: boolean
}

export function Ad({data, user, showButtons}: AdProps) {
    return (
        <div className="ad">
            <div className={showButtons ?? true ? "ad-top-row" : "ad-top-row no-buttons"}>
                <div>
                    <p className="ad-top-row-price">{data.price} {data.currencyType}</p>
                    <p className="ad-top-row-type">за человека</p>
                </div>
                
                { (showButtons ?? true) &&
                    <div className="ad-top-row-buttons">
                        <button className="ad-top-row-buttons-share"
                            onClick={() => 
                                console.log("share button")
                            }
                        >
                            <img src={share} alt="" />
                        </button>
                        <button className="ad-top-row-buttons-buy"
                            onClick={() => 
                                console.log("buy button")
                            }
                        >
                            Купить
                        </button>
                    </div>
                }
            </div>
            <div className="ad-content">
                <div className="ad-content-user">
                    <img src={user.profile_picture ?? testuser} alt="" className="ad-content-user-img"/> 
                    <p className={user.is_vip ? "ad-content-user-name vip" : "ad-content-user-name"}>{user.username}</p>
                    <p className="ad-content-user-info">сделок: {user.deals} • {user.rating}</p>
                </div>
                <div className="ad-content-info-elem">
                    <p className="ad-content-info-elem-key">Источник</p>
                    <p className="ad-content-info-elem-value">{data.source}</p>
                </div>
                <div className="ad-content-info-elem">
                    <p className="ad-content-info-elem-key">Аудитория</p>
                    <p className="ad-content-info-elem-value">{data.guaranteed ? "Гарантирован" : "Не гарантирован"} ({data.amountType == "min" ? "минимум" : "максимум"} {data.amount}) </p>
                </div>
                <div className="ad-content-info-elem">
                    <p className="ad-content-info-elem-key">Оплата</p>
                    <p className="ad-content-info-elem-value">{data.currencyType}</p>
                </div>
            </div>
        </div>
    )
}