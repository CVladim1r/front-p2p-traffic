import { useState } from "react";
import { Button, Select, TextField } from "../../shared/ui";
// import { useSelector } from "react-redux";
// import { StateSchema } from "../../app/providers/store";
import "./MoneyChangePage.css"
import { useDispatch, useSelector } from "react-redux";
import { StateSchema } from "../../app/providers/store";
import { getTextWidth } from "../../shared/lib";
import { useMutation } from "@tanstack/react-query";
import { BalanceService } from "../../shared/api";
import { moneyChangeActions } from "../../entities/MoneyChange";
import { Navigate } from "react-router-dom";
import { RoutePaths } from "../../app/providers/router";

type MoneyChangeProps = {
    type: "add" | "remove"
}

export default function MoneyChange({type}: MoneyChangeProps) {
    const dispatch = useDispatch()
    
    const [moneyType, setMoneyType] = useState("TON")
    const [money, setMoney] = useState("")

    const currencyTypes = useSelector(
        (state: StateSchema) => state.additional.currencyTypes
    )
    const authorization = useSelector(
        (state: StateSchema) => state.user.authorization
    )

    // const balance = useSelector(
    //     (state: StateSchema) => state.user.data?.balance
    // )
    const balance = 100;
    function Floor2(x: number) {
        return Math.floor((x + Number.EPSILON) * 100) / 100
    }
    const maxMoney = Floor2(balance / (1.02))

    const {mutate} = useMutation({
        mutationFn: async () => {
            if (type == "add") {
                const response = await BalanceService.createDepositApiV1P2PBalanceDepositPost(+money, authorization)
                dispatch(moneyChangeActions.setReceiptLink(response.url))
            } else {
                const response = await BalanceService.withdrawFundsApiV1P2PBalanceWithdrawPost(+money, authorization)
                dispatch(moneyChangeActions.setReceiptLink(response.url)) 
            }
            setRedirect(true)
        }
    })

    const [redirect, setRedirect] = useState(false)

    if (redirect)
        return <Navigate to={{pathname: type == "add" ? RoutePaths.moneyAddDone : RoutePaths.moneyRemoveDone}} />

    return (
        <div className="moneychange container">
            <p className="moneychange-header">{type == "add" ? "Пополнение" : "Снятие"} Средств</p>
            <form
                onSubmit={e => {
                    e.preventDefault()
                    mutate()
                }}
                className="moneychange-form"
            >
                <div className="moneychange-block">
                    <Select onChange={e => setMoneyType(e.target.value)} className="moneychange-select" optionsProps={ //TODO Remove Ton when add
                        currencyTypes.map(val => ({value: val}))
                    }
                    />
                    <div className={type != "add" && +money > maxMoney ? "moneychange-block-money error " : "moneychange-block-money"}>
                        <TextField
                        style={{
                            width: Math.min(getTextWidth(money ? money : moneyType, "600 40px Inter"), 280)
                        }}
                            type="text"
                            placeholder={moneyType}
                            className="moneychange-textfield"
                            onChange={e => {
                                console.log("change");
                                
                                if (e.target.value.length > 10)
                                    setMoney(money)
                                else
                                    setMoney(e.target.value)
                            }}
                            value={money}
                            min={0}
                            max={Floor2(balance / (1.02))}
                            step={0.01}
                        />
                    </div>
                    
                    <div className="moneychange-comission">
                        <p>Комиссия:</p>
                        <p>≈{Floor2(Number(money) * 0.02)} {moneyType}</p>
                    </div>
                </div>
                {type == "remove" &&
                    <div className="moneychange-info">
                        <Button
                            type="button"
                            className={+money==maxMoney ? "moneychange-max" : "moneychange-max active"}
                            onClick={() => {
                                setMoney(maxMoney.toString())}
                            }
                            disabled={+money==maxMoney}
                        >
                            MAX
                        </Button>
                        <p className="moneychange-available">Доступно: {balance} {moneyType}</p>
                    </div>
                }
                
                
                <Button
                    type="submit"
                    disabled={Number.isNaN(Number(money)) || +money == 0 || +money > maxMoney}
                >
                    Получить чек
                </Button>
            </form>
        </div>
    )
}