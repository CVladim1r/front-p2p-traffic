import { FormEvent } from "react"
import "./AddAd.css"
import { NavigateFunction, useNavigate } from "react-router-dom"

function formSubmit(e: FormEvent, navigate: NavigateFunction) {
    e.preventDefault()
    navigate("#preview-ad")
}

function AddAd() {
    let navigate = useNavigate()
    return (
        <div className="add-ad container">
            <p className="add-ad-header">Создайте объявление</p>
            <form onSubmit={e => formSubmit(e, navigate)} className="add-ad-form">
                <div className="add-ad-form-content">
                    <div className="add-ad-form-row">
                        <p className="add-ad-form-row-key">Приход</p>

                        <div className="add-ad-form-row-radio">
                            <label className="add-ad-form-row-radio-text">
                                Гарантирован
                                <input type="radio" name="guaranteed" value="true" className="add-ad-form-row-radiobutton" defaultChecked={true}/>
                            </label>
                            <label className="add-ad-form-row-radio-text">
                                Не гарантирован
                                <input type="radio" name="guaranteed" value="false" className="add-ad-form-row-radiobutton" />
                            </label>
                        </div>
                    </div>
                    <div className="add-ad-form-row">
                        <p className="add-ad-form-row-key">Источник</p>

                        <input type="text" name="source" placeholder="Введите ссылку..." className="add-ad-form-row-text" />
                    </div>
                    <div className="add-ad-form-row">
                        <p className="add-ad-form-row-key">Тематика</p>

                        <select name="theme" className="add-ad-form-row-dropdown">
                            <option value="">Выбрать</option>
                            <option value="test">test</option>
                            <option value="test1">test1</option>
                        </select>
                    </div>
                    <div className="add-ad-form-row">
                        <p className="add-ad-form-row-key">Кол-во пользователей</p>

                        <input type="number" name="amount" placeholder="Введите кол-во" className="add-ad-form-row-text"/>
                    </div>
                    <div className="add-ad-form-row">
                        <p className="add-ad-form-row-key">Сумма</p>

                        <input type="number" name="cost" placeholder="Введите сумму" className="add-ad-form-row-text"/>
                    </div>
                    <div className="add-ad-form-row">
                        <p className="add-ad-form-row-key">Размещение</p>

                        <div className="add-ad-form-row-radio">
                            <label className="add-ad-form-row-radio-text">
                                Бесплатное
                                <input type="radio" name="placing" value="free" className="add-ad-form-row-radiobutton" defaultChecked={true}/>
                            </label>
                            <label className="add-ad-form-row-radio-text">
                                Платное
                                <input type="radio" name="placing" value="pay" className="add-ad-form-row-radiobutton" />
                            </label>
                        </div>
                    </div>
                    <div className="add-ad-form-row">
                        <p className="add-ad-form-row-key">Название</p>

                        <input type="text" name="name" placeholder="Введите название" className="add-ad-form-row-text" />
                    </div>
                    <div className="add-ad-form-row">
                        <p className="add-ad-form-row-key">Описание</p>

                        <input type="text" name="description" placeholder="Введите описание" className="add-ad-form-row-text" />
                    </div>
                </div>

                <button type="submit" className="add-ad-form-button">Далее</button>
            </form>
        </div>
    )
}

export default AddAd