import { AdOut } from "../../api"
import share from "../../assets/svg/ad_send.svg"
import testuser from "../../assets/images/testuser1.png"
import "./Ad.css"

export type AdProps = Omit<AdOut, "uuid" | "user" | "created_at" | "updated_at" | "status"> & {
    showButtons?: boolean,
    onClickBuy?: () => void,
    onClickShare?: () => void,
}

export function Ad({showButtons, onClickBuy, onClickShare, ...data}: AdProps) {
    return (
        <div className="ad">
            <div className={showButtons ?? true ? "ad-top-row" : "ad-top-row no-buttons"}>
                <div className="ad-top-row-info">
                    <p className="ad-top-row-price">{data.price} {data.currency_type}</p>
                    <p className="ad-top-row-type">за пост</p>
                </div>
                
                { (showButtons ?? true) &&
                    <div className="ad-top-row-buttons">
                        <button className="ad-top-row-buttons-share"
                            onClick={onClickShare}
                        >
                            <img src={share} alt="" />
                        </button>
                        <button className="ad-top-row-buttons-buy"
                            onClick={onClickBuy}
                        >
                            Купить
                        </button>
                    </div>
                }
            </div>
            <div className="ad-content">
                <div className="ad-content-user">
                    <img src={data.user_photo_url ?? testuser} alt="" className="ad-content-user-img"/> 
                    <p className={data.user_vip ? "ad-content-user-name vip" : "ad-content-user-name"}>{data.user_name}</p>
                    {/* <p className="ad-content-user-info">сделок: {data.user_deals} • {data.user_rating}</p> */}
                </div>
                <div className="ad-content-info-elem">
                    <p className="ad-content-info-elem-key">Тематика</p>
                    <p className="ad-content-info-elem-value">{data.category}</p>
                </div>
                <div className="ad-content-info-elem">
                    <p className="ad-content-info-elem-key">Аудитория</p>
                    <p className="ad-content-info-elem-value">{data.guaranteed_traffic ? "Гарантирован" : "Не гарантирован"} (минимум {data.minimum_traffic}) </p>
                </div>
                <div className="ad-content-info-elem">
                    <p className="ad-content-info-elem-key">Оплата</p>
                    <p className="ad-content-info-elem-value">{data.currency_type}</p>
                </div>
            </div>
        </div>
    )
}