import { useEffect, useState } from "react";
import { BackButton, Button, Select, TextField } from "../../shared/ui";
import "./MoneyChangePage.css"
import { useDispatch } from "react-redux";
import { getTextWidth } from "../../shared/lib";
import { useMutation } from "@tanstack/react-query";
import { BalanceService, TransactionCurrencyType } from "../../shared/api";
import { Navigate, useNavigate } from "react-router-dom";
import { RoutePaths } from "../../app/providers/router";
import TON from "../../shared/assets/svg/TON.svg"
import USDT from "../../shared/assets/svg/USDT.svg"
import BTC from "../../shared/assets/svg/BTC.svg"
import ETH from "../../shared/assets/svg/ETH.svg"
import { formatNumberTo3 } from "../../shared/lib/lib";
import { selectAuthorization } from "../../entities/User";
import { useAppSelector } from "../../app/providers/store";
import { pagesActions } from "../../entities/Pages/slice/pagesSlice";

type MoneyChangeProps = {
    type: "add" | "remove"
}

const currencyIcons: {[key: string]: string} = {
    TON,
    USDT,
    BTC,
    ETH,
}


export default function MoneyChange({type}: MoneyChangeProps) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const currencyTypes = useAppSelector(
        state => state.additional.currencyTypes
    )
    const [moneyType, setMoneyType] = useState(currencyTypes[0])
    const [money, setMoney] = useState("")

    const authorization = useAppSelector(selectAuthorization)

    const balance = useAppSelector(
        state => state.user.data?.balance ?? {}
    )
    
    const maxMoney = +formatNumberTo3((balance[moneyType] ?? 1) - 1, 10)
    const minMoney = 5
    
    const {mutate, error, reset} = useMutation({
        mutationFn: async () => {
            if (type == "add") {
                const response = await BalanceService.createDepositApiV1P2PBalanceDepositPost(moneyType as TransactionCurrencyType, +money, authorization)
                dispatch(pagesActions.setMoneyChangeReceiptLink(response.balance))
            } else {
                const response = await BalanceService.withdrawFundsApiV1P2PBalanceWithdrawPost(+money, moneyType as TransactionCurrencyType, authorization)
                dispatch(pagesActions.setMoneyChangeReceiptLink(response.balance)) 
            }
            setRedirect(true)
        }
    })
    useEffect(() => {
        if (error)
            alert("Произошла ошибка, попробуйте позже")
    }, [error])

    const [redirect, setRedirect] = useState(false)

    if (redirect)
        return <Navigate to={{pathname: type == "add" ? RoutePaths.moneyAddDone : RoutePaths.moneyRemoveDone}} />

    return (
        <div className="moneychange container">
            <BackButton onClick={() => navigate({pathname: RoutePaths.profile})} />

            <p className="moneychange-header">{type == "add" ? "Пополнение" : "Снятие"} Средств</p>
            <form
                onSubmit={e => {
                    e.preventDefault()
                    reset()
                    mutate()
                }}
                className="moneychange-form"
            >
                <div className="moneychange-block">
                    <Select fontSize={24} backgroundColor="#3D3D3D" onChange={val => setMoneyType(val)} optionsData={
                        currencyTypes.map(val => ({value: val, icon: currencyIcons[val]}))
                    }
                    />
                    <div className={money != "" && type == "remove" && (+money > maxMoney || +money < minMoney) ? "moneychange-block-money error " : "moneychange-block-money"}>
                        <TextField
                            style={{
                                width: Math.min(getTextWidth(money ? money : moneyType, "600 40px Inter"), 280)
                            }}
                            type="text"
                            inputMode="decimal"
                            placeholder={moneyType}
                            className="moneychange-textfield"
                            onChange={e => {
                                if (e.target.value.length > 10)
                                    setMoney(money)
                                else
                                    setMoney(e.target.value)
                            }}
                            value={money}
                            min={minMoney}
                            max={maxMoney}
                            step={0.01}
                        />
                    </div>
                    
                    <div className="moneychange-comission">
                        {type == "remove" &&
                        <>
                            <p>Комиссия:</p>
                            {/* <p>≈{formatNumberTo3(Number(money) * 0.02)} {moneyType}</p> */}
                            <p>≈1 TON</p>
                        </>
                        }
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
                        <p className="moneychange-available">Доступно: {balance[moneyType] ?? 0} {moneyType}</p>
                    </div>
                }
                
                
                <Button
                    type="submit"
                    disabled={Number.isNaN(Number(money)) || +money <= 0 || (type == "remove" && (+money > maxMoney || +money < minMoney))}
                >
                    Получить чек
                </Button>
            </form>
        </div>
    )
}