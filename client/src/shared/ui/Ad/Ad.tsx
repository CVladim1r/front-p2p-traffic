import { AdOut } from "../../api"
import share from "../../assets/svg/ad_send.svg"
import testuser from "../../assets/images/testuser1.png"
import "./Ad.css"
import classNames from "classnames"

export type AdProps = Omit<AdOut, "uuid" | "user" | "status"> & {
    showButtons?: boolean,
    showUserData?: boolean,
    showInfo?: boolean,
    onClickBuy?: () => void,
    onClickShare?: () => void,
}

export function Ad({showButtons, showUserData, showInfo, onClickBuy, onClickShare, ...data}: AdProps) {
    function AdMain() {
        return (
            <div className="adMain">
                <div className={showButtons ?? true ? "adMain-top-row" : "adMain-top-row no-buttons"}>
                    <div className="adMain-top-row-info">
                        <p className="adMain-top-row-price">{data.price} {data.currency_type}</p>
                        <p className="adMain-top-row-type">за пост</p>
                    </div>
                    
                    { (showButtons ?? true) &&
                        <div className="adMain-top-row-buttons">
                            <button className="adMain-top-row-buttons-share"
                                onClick={onClickShare}
                            >
                                <img src={share} alt="" />
                            </button>
                            <button className="adMain-top-row-buttons-buy"
                                onClick={onClickBuy}
                            >
                                Купить
                            </button>
                        </div>
                    }
                </div>
                <div className="adMain-content">
                    <div className={showUserData ? "adMain-content-user full" : "adMain-content-user"}>
                        <img src={data.user_photo_url ?? testuser} alt="" className="adMain-content-user-img"/> 
                        <p className={classNames(
                            "adMain-content-user-name",
                            {"vip": data.user_vip},
                            {"full": showUserData}
                        )}
                        >
                            {data.user_name}
                        </p>
                        {showUserData && <p className="adMain-content-user-info">сделок: {data.user_deals} • {data.user_rating.toFixed(2)}</p>}
                    </div>
                    <div className="adMain-content-info-elem">
                        <p className="adMain-content-info-elem-key">Тематика</p>
                        <p className="adMain-content-info-elem-value">{data.category}</p>
                    </div>
                    <div className="adMain-content-info-elem">
                        <p className="adMain-content-info-elem-key">Аудитория</p>
                        <p className="adMain-content-info-elem-value">{data.guaranteed_traffic ? "Гарантирован" : "Не гарантирован"} (минимум {data.minimum_traffic}) </p>
                    </div>
                    <div className="adMain-content-info-elem">
                        <p className="adMain-content-info-elem-key">Оплата</p>
                        <p className="adMain-content-info-elem-value">{data.currency_type}</p>
                    </div>
                </div>
            </div>
        )
    }
    
    if (!showInfo)
        return <AdMain />

    return (
        <div className="adFull">
            <AdMain />
            <div className="adFull-info">
                <div className="adFull-info-elem">
                    <p className="adFull-info-key">Название</p>
                    <p className="adFull-info-value">{data.title}</p>
                </div>
                <div className="adFull-info-elem">
                    <p className="adFull-info-key">Описание</p>
                    <p className="adFull-info-value">{data.description}</p>
                </div>
                <div className="adFull-info-elem">
                    <p className="adFull-info-key">Источник</p>
                    <p className="adFull-info-value">{data.link_to_channel}</p>
                </div>
                <div className="adFull-info-elem">
                    <p className="adFull-info-key">Условия</p>
                    <p className="adFull-info-value">{data.conditions}</p>
                </div>
                <div className="adFull-info-elem">
                    <p className="adFull-info-key">Тип байта</p>
                    <p className="adFull-info-value">{data.ad_type}</p>
                </div>
            </div>
        </div>
    )
}