import { ReactNode } from "react"
import { Button } from "../Form"
import CloseImg from "../../assets/svg/close.svg"
import "./Modal.css"

type ModalProps = {
    show: boolean
    hideModal: () => void
    topText?: string
    bodyChildren?: ReactNode
    bottomButton?: {
        text: string
        onClick: () => void
        disabled?: boolean
    }
}

export function Modal({show, bottomButton, bodyChildren, topText, hideModal}: ModalProps) {
    return (
        <>
            <div onClick={() => hideModal()} className={show ? "modal-overaly active" : "modal-overaly"} />

            <div className={show ? "modal active" : "modal"}>
                <div className={bottomButton ? "modal-main button" : "modal-main"}>
                    <div className="modal-top">
                        <p className="modal-top-text">{topText}</p>
                        
                        <Button onClick={() => hideModal()} useDefaultClassName={false} className="modal-top-close">
                            <img src={CloseImg} alt="" />
                        </Button>
                    </div>
                    <div className="modal-body">
                        {bodyChildren}
                    </div>
                </div>

                {bottomButton &&
                    <Button disabled={bottomButton.disabled} onClick={bottomButton.onClick} className="modal-button" >
                        {bottomButton.text}
                    </Button>
                }
            </div>
        </>
    )
}