import { useState } from "react";
import { Button, Select, TextField } from "../../shared/ui";
// import { useSelector } from "react-redux";
// import { StateSchema } from "../../app/providers/store";
import "./MoneyChangePage.css"
import { useNavigate } from "react-router-dom";

type MoneyChangeProps = {
    type: "add" | "remove"
}

export default function MoneyChange({type}: MoneyChangeProps) {
    const [moneyType, setMoneyType] = useState("TON")
    const [money, setMoney] = useState("")
    const navigate = useNavigate()

    // const balance = useSelector(
    //     (state: StateSchema) => state.user.data?.balance
    // )
    const balance = 100;
    function Floor2(x: number) {
        return Math.floor((x + Number.EPSILON) * 100) / 100
    }
    const maxMoney = Floor2(balance / (1.02))

    return (
        <div className="moneychange container">
            <p className="moneychange-header">{type == "add" ? "Пополнение" : "Снятие"} Средств</p>
            <form action="" className="moneychange-form">
                <div className="moneychange-block">
                    <Select onChange={e => setMoneyType(e.target.value)} className="moneychange-select" optionsProps={[
                            {text: "TON", value: "TON"},
                            {text: "USDT", value: "USDT"},
                        ]}
                    />
                    <div className={+money > maxMoney ? "moneychange-block-money error " : "moneychange-block-money"}>
                        <TextField
                            type="number"
                            placeholder={moneyType}
                            className="moneychange-textfield"
                            onChange={e => {
                                if (e.target.validity.badInput) {
                                    e.target.value = money                              
                                    return
                                }

                                const num = Floor2(Number(e.target.value.replace(/[^0-9.]+/g, "")))
                                setMoney(num == 0 ? "" : num.toString())
                            }}
                            value={money}
                            min={0}
                            max={Floor2(balance / (1.02))}
                            step={0.01}
                        />
                        <p>{money ? moneyType : ""}</p>
                    </div>
                    
                    <div className="moneychange-comission">
                        <p>Комиссия:</p>
                        <p>≈{Floor2(Number(money) * 0.02)} {moneyType}</p>
                    </div>
                </div>
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
                
                <Button
                    type="submit"
                    disabled={money==""}
                    onClick={e => {
                        e.preventDefault()
                        navigate("#money-receipt")
                    }}
                >
                    Получить чек
                </Button>
            </form>
        </div>
    )
}