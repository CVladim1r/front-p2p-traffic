import { useEffect, useState } from "react"
import "../Form.css"
import { getTextWidth } from "../../../lib"
import classNames from "classnames"

type SelectProps = {
    fontSize?: number,
    backgroundColor?: string,
    className?: string
    classNameContainer?: string
    defaultValue?: string,
    manualWidth?: boolean,
    filterChosen?: boolean
    optionsData: {
        value: string
        text?: string
        icon?: string
    } [],
    onChange?: (value: string) => void
}

// 
export function Select({optionsData, defaultValue, fontSize, backgroundColor="#2B2B2B", onChange, className, classNameContainer, manualWidth, filterChosen}: SelectProps) {
    const [index, setIndex] = useState(defaultValue != undefined && optionsData.some(val => val.value == defaultValue) ? optionsData.findIndex(val => val.value == defaultValue) : 0)
    const [isOpen, setIsOpen] = useState(false)
    const [maxWidth, setMaxWidth] = useState(0)
    const [hasIcons, setHasIcons] = useState(false)

    const getWidth = (ind: number) =>
        getTextWidth(optionsData[ind].text ?? optionsData[ind].value, `600 ${fontSize ?? 13}px Inter`) + // Text size
        (optionsData[ind].icon ? 20 + 6 : 0) + // Icon size + spacing if any
        24 + 6 + 12 // arrow icon + spacing + paddings

    if (!manualWidth)
        useEffect(() => {
            setMaxWidth(optionsData.reduce((maxWidth, elem, i) => {
                if (!hasIcons && elem.icon)
                    setHasIcons(true)
                
                const elemWidth = getWidth(i)
                return elemWidth > maxWidth ? elemWidth : maxWidth
            }, 0))
        }, [])

    return (
        <button
            type="button"
            className={classNames(
                "form-select",
                {"open": isOpen},
                className
            )}
            style={{
                width: manualWidth ? undefined : maxWidth,
                backgroundColor,
                fontSize
            }}
            onClick={() => setIsOpen(!isOpen)}
            // onBlur={() => setIsOpen(false)}
        >
            {optionsData[index].icon != undefined &&
                <img className="form-select-icon" src={optionsData[index].icon} alt="" />
            }

            <p className="form-select-text">{optionsData[index].text ?? optionsData[index].value}</p> 

            {isOpen &&
                <div 
                    className={classNames(
                        "form-select-options-container",
                        classNameContainer
                    )}
                    style={classNameContainer ? {} : {
                        width: manualWidth ? undefined : maxWidth,
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
                        ).filter((val, i) => !filterChosen || i != index ? val : undefined)
                    }
                </div>
            }
        </button>
    )
}