import { useEffect, useRef, useState } from "react"
import "../Form.css"
import { getTextWidth } from "../../lib"

type SelectProps = {
    fontSize?: number,
    backgroundColor?: string,
    defaultValue?: string,
    optionsData: {
        value: string
        text?: string
        icon?: string
    } [],
    onChange?: (value: string) => void
}

// 
export function Select({optionsData, defaultValue, fontSize, backgroundColor="#2B2B2B", onChange}: SelectProps) {
    const [index, setIndex] = useState(defaultValue != undefined ? optionsData.findIndex(val => val.value == defaultValue) : 0)
    const [isOpen, setIsOpen] = useState(false)
    const [maxWidth, setMaxWidth] = useState(0)
    const [hasIcons, setHasIcons] = useState(false)

    const getWidth = (ind: number) =>
        getTextWidth(optionsData[ind].text ?? optionsData[ind].value, `600 ${fontSize ?? 13}px Inter`) + // Text size
        (optionsData[ind].icon ? 20 + 6 : 0) + // Icon size + spacing if any
        24 + 6 + 12 // arrow icon + spacing + paddings

    useEffect(() => {
        setMaxWidth(optionsData.reduce((maxWidth, elem, i) => {
            if (!hasIcons && elem.icon)
                setHasIcons(true)
            
            const elemWidth = getWidth(i)
            return elemWidth > maxWidth ? elemWidth : maxWidth
        }, 0))
    }, [])

    return (
        <div
            className={isOpen ? "form-select open" : "form-select"}
            style={{
                width: maxWidth,
                backgroundColor,
                fontSize
            }}
            onClick={() => setIsOpen(!isOpen)}
        >
            {optionsData[index].icon != undefined &&
                <img className="form-select-icon" src={optionsData[index].icon} alt="" />
            }

            <p className="form-select-text">{optionsData[index].text ?? optionsData[index].value}</p> 

            {isOpen &&
                <div className="form-select-options-container"
                    style={{
                        width: maxWidth,
                        backgroundColor,
                        fontSize,
                        textAlign: hasIcons ? "end" : "start"
                    }}
                >
                    {
                        optionsData.map((val, i) => 
                            <div key={i} className="form-select-option"
                                onClick={() => {
                                    setIndex(i)
                                    if (onChange)
                                        onChange(val.value)
                                }}
                            >
                                {val.icon != undefined &&
                                    <img className="form-select-icon" src={val.icon} alt="" />
                                }

                                <p className="form-select-option-text">{val.text ?? val.value}</p> 
                            </div>
                        )
                    }
                </div>
            }
        </div>
    )
}